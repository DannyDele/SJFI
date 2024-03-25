import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Box, DialogActions, Typography, IconButton} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';






function WhatsNew() {
    const [open, setOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', });
  const [imageFile, setImageFile] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [loadingUpdate, setLoadingUpdate] = useState(false); // State to track delete loading
  const [loadingDelete, setLoadingDelete] = useState(false); // State to track delete loading
     const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const [isUpdateMessageVisible, setUpdateMessageVisible] = useState(false);
    const [messsageSuccessText, setSuccessMessageText] = useState('')



  const [submitting, setSubmitting] = useState(false); // Added submitting state
  const [defaultFileName, setDefaultFileName] = useState('default_file_name.txt'); // Set your default file name
  

// Add a new state variable to manage the dialog title
  const [openTitle, setOpenTitle] = useState('Add Announcement');
  const [formValid, setFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Added formSubmitted state


  
useEffect(() => {
  // Check form validity whenever programData changes
  if(formSubmitted){
  const isValid = Object.entries(formData).every(([key, value]) => {
    // If value is a string, trim and check for empty string
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    // // If value is a number (like price), check for non-zero
    // if (typeof value === 'number') {
    //   return value !== 0;
    // }
    // For other types of values, consider them valid
    return true;
  });
    setFormValid(isValid);
    }
  }, [formData, formSubmitted]);








  
  // Fetch announcements when the component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://api.stj-fertilityinstitute.com/api/announcements');
        if (!response.ok) {
          throw new Error('Error fetching announcements');
        }

        const data = await response.json();
        setAnnouncementsData(data);
                setLoading(false); // Set loading to false once data is fetched

      } catch (error) {
        console.error('Error fetching announcements:', error);
                setLoading(false); // Set loading to false once data is fetched

      }
    };

    fetchAnnouncements();
  }, []); // Empty dependency array ensures that this effect runs only once when the component mounts

  
// Modify the handleClickOpen function
const handleClickOpen = (announcement) => {
  if (announcement) {
    // If announcement is present, set the form data and update the title
    setFormData({
      title: announcement.title || '',
      description: announcement.description || '',
    });

    // Update the title to "Edit Announcement"
    setOpenTitle('Edit Announcement');
  } else {
    // If no announcement is passed, reset the form data and update the title to "Add Announcement"
    setFormData({
      title: '',
      description: '',
    });
    setOpenTitle('Add Announcement');
  }

  setSelectedAnnouncement(announcement || null);
  setOpen(true);
};


  const handleClose = () => {
    setSelectedAnnouncement(null);
    setOpen(false);
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Function to submit announcement

async function handleFormSubmit() {
  try {
    // Set submitting to true when the form is being submitted
    setSubmitting(true);

    let apiUrl = 'https://api.stj-fertilityinstitute.com/api/announcements';

    // Determine whether to send a POST or PUT request based on whether selectedAnnouncement is present
    let method = 'POST';
    let operationMessage = 'created'

    if (selectedAnnouncement) {
      apiUrl += `/${selectedAnnouncement._id}`;
      method = 'PUT';
      operationMessage = 'updated'
    }

    // Step 1: Create or update the announcement
    const response = await fetch(apiUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${method === 'POST' ? 'creating' : 'updating'} announcement`);
    }

    const updatedAnnouncement = await response.json();
    console.log('Updated Announcement:', updatedAnnouncement)
    setSuccessMessageVisible(true)

    // Show a dynamic success message based on whether the operation was an addition or update
    setSuccessMessageText(`Announcement ${operationMessage} successfully!`);

   

    // Step 4: Update state with the new announcement
    setAnnouncementsData((prevData) =>
      selectedAnnouncement
        ? prevData.map((announcement) =>
            announcement._id === selectedAnnouncement._id ? updatedAnnouncement : announcement
          )
        : [...prevData, updatedAnnouncement]
    );

    // Reset the form data and image
    setFormData({ title: '', description: '', });

    // Close the popup
    setOpen(false);


  } catch (error) {
    console.error(`Error ${selectedAnnouncement ? 'updating' : 'creating'} announcement:`, error);
    // Handle the error appropriately (e.g., show an error message to the user)
  } finally {
    // Set submitting back to false whether the submission was successful or not
    setSubmitting(false);
  }
}

  
    const handleSubmit = () => {
    // Set formSubmitted to true when attempting to submit the form
    setFormSubmitted(true);
    // If form is valid, proceed with adding new program
    if (formValid) {
      handleFormSubmit();
    }
  };



  const handleDelete = async () => {
     
    try {
    // Set submitting to true when the form is being submitted
      setLoadingDelete(true);
    if (!selectedAnnouncement) {
      // If no announcement is selected, do nothing
      return;
    }

    const apiUrl = `https://api.stj-fertilityinstitute.com/api/announcements/${selectedAnnouncement._id}`;

    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting announcement');
    }

    // Remove the selected announcement from announcementsData
    const updatedAnnouncements = announcementsData.filter(
      (announcement) => announcement._id !== selectedAnnouncement._id
    );
      setAnnouncementsData(updatedAnnouncements);
      setDeleteMessageVisible(true)

    // Reset the form data
    setFormData({ title: '', description: '' });

    // Close the popup
    setOpen(false);
  } catch (error) {
    console.error('Error deleting announcement:', error);
    // Handle the error appropriately (e.g., show an error message to the user)
  } finally {
      // Set submitting back to false whether the submission was successful or not
      setLoadingDelete(false);
    }
};



 // Function to get Row ID
const getRowId = (row) => row._id;


  return (
    <div>

      <Typography style={{marginLeft:'2rem'}} variant="h4" className="mb-4 font-bold text-gray-500">Announcement</Typography>

      

   {/* Snackbar for Success Message */}
        <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            {messsageSuccessText} 
          </Alert>
      </Snackbar>
      
   {/* Snackbar for Delete Message */}
        <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setDeleteMessageVisible(false)} severity="success">
            Announcement deleted successfully! 
          </Alert>
        </Snackbar>

   {/* Snackbar for Update Message */}
        <Snackbar
          open={isUpdateMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setUpdateMessageVisible(false)}
        >
          <Alert onClose={() => setUpdateMessageVisible(false)} severity="success">
            Announcement Updated Successfully! 
          </Alert>
        </Snackbar>

      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (

        <Box>
          <Box marginTop='1rem' padding='2rem' width='80vw' height='100vh'>
            <Button variant="contained"
              color="primary"
              style={{ marginBottom: '10px', display: 'flex', justifyContent: 'end' }} onClick={() => handleClickOpen()}>
                What&apos;s New
              </Button>

          <DataGrid
        rows={announcementsData}
        columns={[
          { field: 'title', headerName: 'Title', flex: 1 },
          { field: 'description', headerName: 'Description', flex: 1 },
        ]}
        pageSize={10}
        components={{
          Toolbar: GridToolbar,
        }}
        className="custom-hover-rows"
  onRowClick={(params) => {
    const clickedRowId = params.row._id;
    const clickedRowData = announcementsData.find((row) => row._id === clickedRowId);

    if (clickedRowData) {
      handleClickOpen(clickedRowData);
    } else {
      console.error('Row data not found for id:', clickedRowId);
    }
  }}        getRowId={getRowId} // Add this line to specify the rowId
      />
          </Box>

          {/* Popup for Add Announcements */}
          <Dialog open={open} onClose={handleClose}>
  <DialogTitle>{openTitle}</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  fullWidth
                    margin="normal"
                     error={formSubmitted && !formData.title.trim()}
  helperText={formSubmitted && !formData.title.trim() && "Annoucement title cannot be empty"}
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  fullWidth
                  multiline
                  rows={4}
                    margin="normal"
                     error={formSubmitted && !formData.description.trim()}
  helperText={formSubmitted && !formData.description.trim() && "Annoucement description cannot be empty"}
                />
  
              </form>
            </DialogContent>
            <DialogActions>
              {selectedAnnouncement !== null ? (
                <>
                    <Button onClick={handleDelete} style={{color: 'red'}}>
                  {loadingDelete && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}

                    Delete
                  </Button>
                    <Button onClick={handleFormSubmit} color="primary">
                    {submitting && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}

                    Update
                  </Button>
                </>
              ) : (
                    <Button onClick={handleSubmit} color="primary">
                      {submitting && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}
                  Add Announcement
                </Button>
              )}
            </DialogActions>
          </Dialog>

        
        </Box>
      )}
    </div>
  );
}

export default WhatsNew;
