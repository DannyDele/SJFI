import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, TextField, ButtonGroup, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DatePicker from 'react-datepicker';
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
Alert.displayName = 'CustomAlert';



const Applications = () => {
    const [token, setToken] = useState('');

const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [open, setOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    email: '',
    date: '',
    time: '',
    userid: '',
    program: '',
    meeting_link: 'http://',
  });

  const [openScheduleModal, setOpenScheduleModal] = useState(false);
    const [openPreviewModal, setOpenPreviewModal] = useState(false);
     const [datePickerValue, setDatePickerValue] = useState(new Date());
    const [timePickerValue, setTimePickerValue] = useState(new Date());
    
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
    const [isDenyMessageVisible, setDenyMessageVisible] = useState(false);
  const [openDenyDialog, setOpenDenyDialog] = useState(false);
  const [rows, setRows] = useState([]);
    // const [rowCounter, setRowCounter] = useState(1); // Initialize rowCounter as a state variable




    



// State to store fetched student applications
    const [studentApplications, setStudentApplications] = useState([]);


  

  // Fetch student applications when the component mounts
  useEffect(() => {
  const authToken = Cookies.get('authToken');

     if (authToken) {
      setToken(authToken);
      console.log('Token:', authToken)
    }
    const fetchData = async (authToken) => {
        try {
            setIsLoading(true);

            const response = await fetch(`${API_ENDPOINT}/api/enroll`, {
                headers: {
                    "Authorization": `bearer ${authToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            
            // Filtering students without a schedule property
            const studentsWithoutSchedule = data.filter(student => !student.schedule);
            console.log('Students without schedule:', studentsWithoutSchedule);
            
          setStudentApplications(studentsWithoutSchedule);
                setRows(studentsWithoutSchedule);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData(authToken);
}, []);




    

    // Function to handle preview button click
    const handlePreview = (application) => {
    setSelectedApplication(application);
    setOpenPreviewModal(true); // Open the preview modal
  };


    
      const handleDateChange = (date) => {
    setDatePickerValue(date);
  };

  const handleTimeChange = (time) => {
    setTimePickerValue(time);
  };
    
    
    // Function to handle accept button click
  const handleAccept = (data) => {
  setSelectedApplication(data);
  setScheduleData({
    email: data.student_application.email,
    userid: data.student,
      program: data.program._id,
    studying: data._id,
    meeting_link: 'http://',
     date: datePickerValue.toLocaleDateString(),
    time: timePickerValue.toLocaleTimeString(),
    programName: data.program.title
  });
  setOpenScheduleModal(true);
};



    const handleOpenDialog = () => {
  setOpenDialog(true);
};

    // Function to handle form submission
    const handleSubmit = () => {
        // Implement form submission logic here
        console.log("Submitted!");
        setOpen(false); // Close the dialog after submission
        setAcceptFormOpen(false); // Close the accept form
        // Store the accepted application data
        setAcceptedApplication({
            ...selectedApplication,
            interviewDate,
            interviewTime,
            interviewLink
        });
    };

    // Function to handle printing
    const handlePrint = () => {
        window.print();
    };


// Function to Schedule Interview
const handleScheduleInterview = async () => {
  try {
    setIsLoading(true);

    // Prepare schedule data
    const formattedScheduleData = {
      ...scheduleData,
      // Ensure proper formatting of date and time
      date: formatDate(datePickerValue),
      time: formatTime(timePickerValue)
    };

       // Create a new object without the program property
    const dataToSend = Object.keys(formattedScheduleData).reduce((acc, key) => {
      if (key !== 'programName') {
        acc[key] = formattedScheduleData[key];
      }
      return acc;
    }, {});

    // Function to schedule interview
    const response = await fetch(`${API_ENDPOINT}/api/schedule-interview`, {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend),
    });

    console.log('Schedule Data:', dataToSend);

    if (!response.ok) {
      throw new Error('Failed to schedule interview');
    }

    // Parse JSON response
    const responseData = await response.json();
    console.log('Interview Scheduled:', responseData);
    setSuccessMessageVisible(true);

    // Remove the student from the table
    const updatedInterviews = studentApplications.filter(student => student._id !== scheduleData.studying);
    setStudentApplications(updatedInterviews);

    // Handle success or close the modal
    setOpenScheduleModal(false);
  } catch (error) {
    console.error('Error scheduling interview:', error);
    // Handle error if needed
  } finally {
    setIsLoading(false);
  }
};


    

// Helper function to format date (you may need to adjust the format)
const formatDate = (date) => {
  return date.toLocaleDateString('en-US'); // Example: 'MM/dd/yyyy'
};

// Helper function to format time (you may need to adjust the format)
const formatTime = (time) => {
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); // Example: 'hh:mm AM/PM'
};






   const handleDeny = (data) => {
  setSelectedApplication(data);
  setOpenDenyDialog(true);
    };
    
    // Function to handle deny confirmation dialog close
  const handleCloseDenyDialog = () => {
    setOpenDenyDialog(false);
    };
    

     // Function to handle deny confirmation and make the request
const handleConfirmDeny = async () => {
  try {
    setIsLoadingDelete(true);

    const response = await fetch(`${API_ENDPOINT}/api/enroll/${selectedApplication._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to deny application');
    }

    // Close the deny confirmation dialog
    setOpenDenyDialog(false);

    // Verify if the application is removed from the table
    console.log('Before removal:', studentApplications);

    // Remove the denied application from the table
    const updatedApplications = studentApplications.filter(student => student._id !== selectedApplication._id);
    setStudentApplications(updatedApplications);

    console.log('After removal:', updatedApplications);

    // Optionally, you can show a success message or perform additional logic

  } catch (error) {
    console.error('Error denying application:', error);
    // Handle error if needed
  } finally {
    setIsLoadingDelete(false);
  }
};



    

   const DenyConfirmationDialog = ({ open, onClose, onDeny }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Deny Confirmation</DialogTitle>
      <DialogContent>
        <p style={{color:'red'}}>Are you sure you want to deny this application?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" style={{ backgroundColor:'green', color: 'white'}}>
          Cancel
        </Button>
              <Button onClick={onDeny} color="primary" style={{ backgroundColor: 'red', color: 'white' }}>
                  
                        <Box display='flex' justifyContent= 'center' alignItems= 'center'>
                    {isLoadingDelete && <CircularProgress size={20} color="inherit" />}
                      Deny
                      </Box>
        </Button>
      </DialogActions>
    </Dialog>
  );
};


     const handleCloseDialog = () => {
    setOpenDialog(false);
    };
    

  let rowCounter = 1; // Initialize rowCounter variable outside of state

const columns = [
    {
    headerName: 'S/N',
    flex: 0.5,
    renderCell: (params) => {
      const rowIndex = studentApplications.findIndex(row => row === params.row) + 1;
      return <span>{rowIndex}</span>;
    },
  },
    {
    field: 'student_application.name',
    headerName: 'Name',
    flex: 0.5,
    renderCell: (params) => (
      <span>{`${params.row.student_application.frist_name} ${params.row.student_application.sur_name}`}</span>
    ),
  },
  {
    field: 'student_application.email',
    headerName: 'Email',
    flex: 1,
    renderCell: (params) => (
      <span>{params.row.student_application.email}</span>
    ),
    },
  {
    field: '_id',
    headerName: 'Program',
    flex: 0.5,
    renderCell: (params) => (
      <span>{params.row.program.title}</span>
    ),
    },

  // ... other columns


  {
    field: 'action',
    headerName: 'Action',
    flex: 1.5,
renderCell: (params) => (
  <ButtonGroup size="small">
    <Button      style={{ backgroundColor: '#1976D2', color: '#ffffff', marginRight:'.3rem' }}
onClick={() => handlePreview(params.row)}>Preview</Button>
    <Button      style={{ backgroundColor: 'green', color: '#ffffff', marginRight:'.3rem' }}
  onClick={() => handleAccept(params.row)}>Accept</Button>
    <Button    variant="contained"
          color="error"
 onClick={() => handleDeny(params.row)}>Deny</Button>
  </ButtonGroup>
),

  },
    ];   
    
    
//   console.log('Columns:', columns);
//   console.log('Student Applications:', studentApplications);
    
    
    
    
    
    // Recursive function to render form fields
const renderFormFields = (data, parentKey = '') => {
  // Mapping object for custom labels
  const customLabels = {
    sur_name: 'Last Name',
    email: 'Email Address',
    other_name: 'Other name',
    frist_name: 'First name',
    marital_status: 'Marital Status',
    dob: 'Date of birth',
    pob: 'Place of birth',
    state: 'State',
    nationality: 'Nationality',
    address: 'Address',
    phone_number: 'Phone Number',
    office_number: 'Office Number',
    mailing_address: 'Mailing Address',
    institution: 'Institution',
    level: 'Level',
    subject: 'Subject',
    grade: 'Grade',
    date: 'Date',
    name: 'Name',
    nature: 'Nature',
    position: 'Position',
    rank: 'Rank',
    phone: 'Phone Number',
    explaination: 'What are you looking to achieve taking this Program',
    // Add more custom labels as needed
  };

 
  return Object.keys(data).map((property) => (
    <div key={parentKey + property} style={{ display: 'inline-block', marginRight: '1px' }}> {/* Adjust margin as needed */}
      {Array.isArray(data[property]) ? (
        <>
          <Typography style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'grey' }} variant="subtitle1">{property.charAt(0).toUpperCase() + property.slice(1)} Info</Typography>
          {data[property].map((item) => (
            <div key={item._id}>
              {renderFormFields(item, parentKey + property)}
            </div>
          ))}
        </>
      ) : typeof data[property] === 'object' ? (
        property.includes('_id') ? null : renderFormFields(data[property], parentKey + property)
      ) : (
        property.includes('_id') ? null : (
          <TextField
            label={customLabels[property] || property.charAt(0).toUpperCase() + property.slice(1)}
            value={data[property]}
            fullWidth
            margin="normal"
            key={parentKey + property}
          />
        )
      )}
    </div>
  ));
};


    
    
    
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
            User interview scheduled successfully! 
          </Alert>
            </Snackbar>
            
   <Snackbar
          open={isDenyMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDenyMessageVisible(false)}
        >
          <Alert onClose={() => setDenyMessageVisible(false)} severity="success">
            User admission denied successfully! 
          </Alert>
        </Snackbar>


    {isLoading ? (
  <Box display="flex" justifyContent="center" marginTop="2rem">
    <CircularProgress />
  </Box>
) : (
  studentApplications.length > 0 ? (
    <DataGrid
      rows={studentApplications}
      columns={columns}
      pageSize={10}
      style={{ cursor: 'pointer' }}
      onRowClick={(params) => {
        setSelectedStudent(params.row);
        handleOpenDialog();
      }}
      components={{
        Toolbar: GridToolbar,
      }}
      getRowId={getRowId}
    />
  ) : (
    <Typography variant="body1">No data available</Typography>
  )
)}

        

{/* // Modify the layout of the form rendering section in your Dialog component */}
<Dialog open={openPreviewModal} onClose={() => setOpenPreviewModal(false)} maxWidth="lg">
  <Box p={2} style={{ minWidth: '800px' }}> {/* Adjust minWidth to accommodate both forms */}
    <Typography style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'grey' }} variant="h6">Student Details</Typography>
    {selectedStudent && (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}> {/* Use flex-wrap to wrap content */}
        {renderFormFields(selectedStudent.student_application)}
              </div>
            )}
            
              {selectedStudent && selectedStudent.program && (
      <div style={{ marginTop: '1rem' }}> {/* Separate div for the program section */}
        <Typography style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'grey' }} variant="subtitle1">Chosen Program</Typography>
        <TextField
          label="Program"
          value={selectedStudent.program.title}
          margin="normal"
        />
      </div>
        )}
    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <Button className='no-print' variant="contained" color="primary" onClick={handlePrint}>Print</Button>
    </div>
  </Box>
  <style>
    {
      `@media print {
        .no-print {
          display: none;
        }
      }
    `}
  </style>
</Dialog>

            {/* Schedule Interview Modal */}

      
      <Dialog open={openScheduleModal} onClose={() => setOpenScheduleModal(false)}>
        <DialogTitle>Schedule Interview</DialogTitle>
        <DialogContent>
          <form>
            <TextField label="Email" value={scheduleData.email} fullWidth margin="normal"  />
            <DatePicker
              selected={datePickerValue}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Select Date"
              className="form-control"
            />
            <DatePicker
              selected={timePickerValue}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              placeholderText="Select Time"
              className="form-control"
            />
            {/* <TextField label="User ID" value={scheduleData.userid} fullWidth margin="normal"  /> */}
            {/* <TextField label="Program" value={scheduleData.program} fullWidth margin="normal"  /> */}
            <TextField label="program" value={scheduleData.programName} fullWidth margin="normal"  />
            <TextField
              label="Meeting Link"
              value={scheduleData.meeting_link}
              fullWidth
              margin="normal"
              onChange={(e) => setScheduleData({ ...scheduleData, meeting_link: e.target.value })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScheduleModal(false)}>Cancel</Button>
          <Button onClick={handleScheduleInterview} color="primary">
                        <Box display='flex' justifyContent= 'center' alignItems= 'center'>
                    {isLoading && <CircularProgress size={20} color="inherit" />}
           
                            Schedule Interview
                             </Box>
          </Button>
        </DialogActions>
            </Dialog>
            
            {/* Modal Prompt to deny an application */}

           <DenyConfirmationDialog
  open={openDenyDialog}
  onClose={handleCloseDenyDialog}
  onDeny={handleConfirmDeny}
/>



    </Box>
    );
};

export default Applications;