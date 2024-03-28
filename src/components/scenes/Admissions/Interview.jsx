import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Menu, MenuItem, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import 'react-datepicker/dist/react-datepicker.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';





// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";


// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));


const Interviews = () => {
    const [token, setToken] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [acceptFormOpen, setAcceptFormOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const [isDenyMessageVisible, setDenyMessageVisible] = useState(false);
  const [admittingInterviewId, setAdmittingInterviewId] = useState(null); // Add this line
  
// Define a state variable to hold the ID of the interview being denied
  const [denyingInterviewId, setDenyingInterviewId] = useState(null);
  

  
// State variables for admission and denial confirmation dialogs
const [admitConfirmationDialogOpen, setAdmitConfirmationDialogOpen] = useState(false);
const [denyConfirmationDialogOpen, setDenyConfirmationDialogOpen] = useState(false);







  useEffect(() => {
    const authToken = Cookies.get('authToken');

  
     if (authToken) {
      setToken(authToken);
      console.log('Token:', token)
    }
    // Fetch data from the API
    const fetchData = async (authToken) => {
      try {
        setIsLoading(true)
        const response = await fetch( `${API_ENDPOINT}/api/enroll`, {
          headers: {
              "Authorization": `bearer ${authToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch interviews');
        }
        const data = await response.json();
        
        // Filter out students with a schedule and admission is false
        const filteredInterviews = data.filter(item => item.schedule && !item.admitted);
        console.log('Filtered Interviews:', filteredInterviews)
        
        setInterviews(filteredInterviews);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching interviews:', error);
        setIsLoading(false);
      } finally {
        setIsLoading(false)
      }
    };

    fetchData(authToken);
}, []);
  


  const handleAccept = (interview) => {
    // Set the selected interview for displaying in the dialog
    setSelectedInterview(interview);
    setAcceptFormOpen(true);
  };

  const handleCloseAcceptForm = () => {
    setAcceptFormOpen(false);
  };

// Function to handle confirming admission
const handleAdmitConfirmation = (interviewId) => {
  setAdmittingInterviewId(interviewId);
  setAdmitConfirmationDialogOpen(true);
  };
  



// Function to admit Student
  

  // Function to handle admitting a student
// Function to handle admitting a student
const handleAdmit = async () => {
  try {
    setIsLoading(true);
    // Retrieve the selected interview details
    const selectedInterview = interviews.find(interview => interview._id === admittingInterviewId);
    // Prepare the body data using the selected interview details
    const bodyData = {
      userid: selectedInterview.student,
      program: selectedInterview.program._id,
      studying: selectedInterview._id // Assuming this is the correct field for the program ID
    };

    console.log('Body Data:', bodyData)
    const response = await fetch(`${API_ENDPOINT}/api/admission-accepted`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData) // Use the dynamically generated body data here
    });
    if (!response.ok) {
      throw new Error('Failed to admit');
    }
    // Remove the admitted interview from the state
    setInterviews(prevInterviews => prevInterviews.filter(interview => interview._id !== admittingInterviewId));
    setSuccessMessageVisible(true);
    // Close the confirmation dialog
    setAdmitConfirmationDialogOpen(false);
  } catch (error) {
    console.error('Error admitting:', error);
  } finally {
    setIsLoading(false);
  }
};




  // Function to handle confirming denial
const handleDenyConfirmation = (interviewId) => {
  setDenyingInterviewId(interviewId);
  setDenyConfirmationDialogOpen(true);
};


  // Function to deny an application

  
// Function to deny an interview
const handleDeny = async () => {
  try {
    setIsLoading(true);
    const response = await fetch(`${API_ENDPOINT}/api/enroll/${denyingInterviewId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to deny');
    }
    // Remove the denied interview from the state
    setInterviews(prevInterviews => prevInterviews.filter(interview => interview._id !== denyingInterviewId));
    setDeleteMessageVisible(true);
    setDenyConfirmationDialogOpen(false)
  } catch (error) {
    console.error('Error denying:', error);
  } finally {
    setIsLoading(false);
  }
};


  let counter = 1;



const columns = [
  {
    headerName: 'S/N',
    flex: 0.5,
    renderCell: (params) => {
      const rowIndex = interviews.findIndex(row => row === params.row) + 1;
      return <span>{rowIndex}</span>;
    },
  },
  {
    field: 'studentName', headerName: 'Name', flex: 1,
   renderCell: (params) => <span>{`${params.row.student_application.first_name} ${params.row.student_application.sur_name}`}</span> },
  { field: 'programTitle', headerName: 'Program', flex: 1, renderCell: (params) => <span>{params.row.program.title}</span> },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => (


<ButtonGroup size="small">
   
      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: '10px' }}
        onClick={() => handleAccept(params.row)}
      >
        View
        </Button>

<Button style={{ backgroundColor: 'green', color: '#ffffff', marginRight: '.3rem' }} onClick={() => handleAdmitConfirmation(params.row._id)}>Admit</Button>
       
          <Button
          variant="contained"
          color="error"
      onClick={() => handleDenyConfirmation(params.row._id)} // Use handleDenyConfirmation instead of handleDeny
        >
          Deny
        </Button>
  </ButtonGroup>



    ),
  },
];

  
  
  
  
  
  
    // Specify a custom getRowId function
    const getRowId = (row) => row._id;


  return (
        <Box sx={{ marginTop: 4, paddingLeft: 0, paddingRight: 0 }}>

         <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            User admitted successfully! 
          </Alert>
        </Snackbar>
        

{/* 
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            INTERVIEWS
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Menu
              id="bulk-action-menu"
              anchorEl={null}
              open={false} // Set to true to open the menu
              onClose={() => {}}
              MenuListProps={{
                'aria-labelledby': 'bulk-action-button',
              }}
            >
              <MenuItem onClick={() => {}}>Action 1</MenuItem>
              <MenuItem onClick={() => {}}>Action 2</MenuItem>
            </Menu>
            <Button
              id="bulk-action-button"
              variant="outlined"
              endIcon={<ArrowDropDownIcon />}
              sx={{ mr: 2 }}
            >
              Bulk Action
            </Button>
            <Button variant="contained" onClick={() => console.log("Apply clicked")}>Apply</Button>
          </Box>
        </Box> */}
       

          {isLoading ? (
                        <Box display="flex" justifyContent="center" marginTop="2rem">
    <CircularProgress />
  </Box>
      ) : (
            interviews.length > 0 ? (
          <DataGrid
            rows={interviews}
            columns={columns}
            pageSize={10}
            loading={isLoading}
            // checkboxSelection
             components={{
        Toolbar: GridToolbar,
      }}
      getRowId={getRowId}
            />
            ): (
    <Typography variant="body1">No applications for interview</Typography>
  )
              )
   }

     
      {/* Accept Form Dialog */}
      <Dialog open={acceptFormOpen} onClose={handleCloseAcceptForm}>
        <DialogTitle>Accept Application</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              label="Interview Date"
              variant="outlined"
              fullWidth
              value={selectedInterview?.schedule?.date || ''}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Interview Time"
              variant="outlined"
              fullWidth
              value={selectedInterview?.schedule?.time || ''}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Meeting Link"
              variant="outlined"
              fullWidth
              value={selectedInterview?.schedule?.meeting_link || ''}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog to admit student */}
      

{/* Dialog to confirm admission */}
<Dialog open={admitConfirmationDialogOpen} onClose={() => setAdmitConfirmationDialogOpen(false)}>
  <DialogTitle>Confirm Admission</DialogTitle>
  <DialogContent>
    <Typography variant="body1">Are you sure you want to admit this student?</Typography>
  </DialogContent>
  <DialogActions>
    <Button variant='container' style={{backgroundColor: 'red', color: 'white'}} onClick={() => setAdmitConfirmationDialogOpen(false)}>No</Button>
    <Button onClick={handleAdmit} autoFocus variant='contained' color='success'>
      <Box display='flex' justifyContent= 'center' alignItems= 'center'>
        {isLoading && <CircularProgress size={20} color="inherit" />}
        Yes
      </Box>
    </Button>
  </DialogActions>
</Dialog>

{/* Dialog to confirm denial */}
<Dialog open={denyConfirmationDialogOpen} onClose={() => setDenyConfirmationDialogOpen(false)}>
  <DialogTitle>Confirm Denial</DialogTitle>
  <DialogContent>
    <Typography variant="body1">Are you sure you want to deny this Application?</Typography>
  </DialogContent>
  <DialogActions>
    <Button variant='container' style={{backgroundColor: 'red', color: 'white'}} onClick={() => setDenyConfirmationDialogOpen(false)}>No</Button>
    <Button onClick={handleDeny} autoFocus variant='contained' color='success'>
      <Box display='flex' justifyContent= 'center' alignItems= 'center'>
        {isLoading && <CircularProgress size={20} color="inherit" />}
        Yes
      </Box>
    </Button>
  </DialogActions>
</Dialog>
 </Box>
  );
};
      

export default Interviews;
