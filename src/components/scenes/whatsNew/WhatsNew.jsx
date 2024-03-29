import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Box, DialogActions, IconButton} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputAdornment from '@mui/material/InputAdornment';
import CircularProgress from '@mui/material/CircularProgress';



function WhatsNew() {
    const [open, setOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', category: '', });
  const [imageFile, setImageFile] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [announcementsData, setAnnouncementsData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [submitting, setSubmitting] = useState(false); // Added submitting state
  const [defaultFileName, setDefaultFileName] = useState('default_file_name.txt'); // Set your default file name







  
  // Fetch announcements when the component mounts
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://fis.metaforeignoption.com/api/announcements');
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

  
    const handleClickOpen = (announcement) => {
            // console.log('Form Submit:', selectedAnnouncement);

  setSelectedAnnouncement(announcement || null); // Set to null if no announcement is passed
  setFormData(announcement || { title: '', body: '', category: '' }); // Set to empty values if no announcement is passed
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

async function handleFormSubmit() {
  try {
    // Set submitting to true when the form is being submitted
    setSubmitting(true);

    let apiUrl = 'https://fis.metaforeignoption.com/api/announcements';

    // Determine whether to send a POST or PUT request based on whether selectedAnnouncement is present
    let method = 'POST';

    if (selectedAnnouncement) {
      apiUrl += `/${selectedAnnouncement._id}`;
      method = 'PUT';
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
        category: formData.category,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error ${method === 'POST' ? 'creating' : 'updating'} announcement`);
    }

    const updatedAnnouncement = await response.json();

    // Step 2: Upload the image if available
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const imageResponse = await fetch('https://fis.metaforeignoption.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!imageResponse.ok) {
        throw new Error('Error uploading image');
      }

      const imageData = await imageResponse.json();

      // Step 3: Update announcement with the image URL
      updatedAnnouncement.image = imageData.path;
    }

    // Step 4: Update state with the new announcement
    setAnnouncementsData((prevData) =>
      selectedAnnouncement
        ? prevData.map((announcement) =>
            announcement._id === selectedAnnouncement._id ? updatedAnnouncement : announcement
          )
        : [...prevData, updatedAnnouncement]
    );

    // Reset the form data and image
    setFormData({ title: '', description: '', category: '' });
    setSelectedFile(null);

    // Close the popup
    setOpen(false);

    // Fetch the image separately and update the state
    if (updatedAnnouncement.image) {
      const imagePath = updatedAnnouncement.image;
      const imageUrl = `https://fis.metaforeignoption.com/file/${imagePath}`;

      const imageResponse = await fetch(imageUrl);
      if (imageResponse.ok) {
        // Assuming the response is an image, you may need to adjust the logic accordingly
        const blob = await imageResponse.blob();
        const imageUrlObject = URL.createObjectURL(blob);

        // Update state with the image URL
        setAnnouncementsData((prevData) =>
          prevData.map((announcement) =>
            announcement._id === updatedAnnouncement._id
              ? { ...announcement, image: imageUrlObject }
              : announcement
          )
        );
      }
    }
  } catch (error) {
    console.error(`Error ${selectedAnnouncement ? 'updating' : 'creating'} announcement:`, error);
    // Handle the error appropriately (e.g., show an error message to the user)
  } finally {
    // Set submitting back to false whether the submission was successful or not
    setSubmitting(false);
  }
}




  const handleDelete = async () => {
     
    try {
    // Set submitting to true when the form is being submitted
      setSubmitting(true);
    if (!selectedAnnouncement) {
      // If no announcement is selected, do nothing
      return;
    }

    const apiUrl = `https://fis.metaforeignoption.com/api/announcements/${selectedAnnouncement._id}`;

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

    // Reset the form data
    setFormData({ title: '', body: '', category: '' });

    // Close the popup
    setOpen(false);
  } catch (error) {
    console.error('Error deleting announcement:', error);
    // Handle the error appropriately (e.g., show an error message to the user)
  } finally {
      // Set submitting back to false whether the submission was successful or not
      setSubmitting(false);
    }
};



  // Function to handle file upload
  
  const handleFileChange = (event) => {
  const file = event.target.files[0];
  setSelectedFile(file);

  // Update the formData object with the selected file
  setFormData({
    ...formData,
    image: file,
  });
};

  // Funtion to display image wide on the screen

   const [showImageModal, setShowImageModal] = useState(false);

  const handleImageClick = (image, event) => {

    // Prevent event propagation to avoid opening the announcement modal
  event.stopPropagation();

    setSelectedFile(image);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
        setOpen(false);
    setShowImageModal(false);
    
  };




  // Function to update and delete an announcement image
 const handleUpdate = () => {
    // Open the file manager for updating the image
    document.getElementById('fileInput').click();
  };


     const handleImageDelete = () => {
    // Delete the image
    // Assuming you have a function to handle image deletion, replace the following line accordingly
    console.log('Image Delete:', selectedFile);

    // Reset the updated image state (if any)
    setUpdatedImage(null);

    // Close the image modal
    closeImageModal();
  };


  


  return (
    <div>

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

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Title</b></TableCell>
                    <TableCell><b>Description</b></TableCell>
                    <TableCell><b>Category</b></TableCell>
                    <TableCell><b>Image</b></TableCell> {/* New column for Image */}

                  </TableRow>
                </TableHead>
                <TableBody>
                  {announcementsData.map((announcement, index) => (
                    <TableRow key={index}
                      onClick={() => handleClickOpen(announcement)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TableCell>{announcement.title}</TableCell>
                      <TableCell>{announcement.description}</TableCell>
                      <TableCell>{announcement.category}</TableCell>
                      <TableCell>
                        {announcement.image && (
                          <img
                            src={announcement.image}
                            alt="Announcement Image"
                            style={{ cursor: 'pointer', maxWidth: '100px', maxHeight: '100px' }}
                            onClick={(event) => handleImageClick(announcement.image, event)}
                          />
                        )}

                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Popup for Add Announcements */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Announcement Details</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
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
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Select Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category || ''}
                    onChange={handleFormChange}
                  >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Event">Event</MenuItem>
                    <MenuItem value="News">News</MenuItem>
                  </Select>
                </FormControl>
            
                <IconButton
                  color="primary"
                  component="span"
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <CloudUploadIcon />
                </IconButton>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              {selectedFile ? (
  <div style={{ marginTop: '8px', fontSize: '14px', color: '#555555' }}>
    {`Selected file: ${selectedFile.name || defaultFileName}`}
  </div>
) : (
  <span style={{ marginLeft: '8px', paddingTop: '7rem', fontSize: '12px', color: '#555555' }}>Choose an image</span>
)}
              </form>
            </DialogContent>
            <DialogActions>
              {selectedAnnouncement !== null ? (
                <>
                    <Button onClick={handleDelete} color="secondary">
                  {submitting && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}

                    Delete
                  </Button>
                  <Button onClick={handleFormSubmit} color="primary">
                    Save Changes
                  </Button>
                </>
              ) : (
                    <Button onClick={handleFormSubmit} color="primary">
                      {submitting && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}
                  Add Announcement
                </Button>
              )}
            </DialogActions>
          </Dialog>


          {/* full image modal */}
          {/* Image Modal */}
          <Dialog open={showImageModal} onClose={closeImageModal}>
            <DialogTitle>Announcement Image</DialogTitle>
            <DialogContent style={{ overflow: 'hidden' }}>
              {selectedFile && (
                <img
                  src={selectedFile}
                  alt="Announcement Image"
                  style={{ maxWidth: '100%', maxHeight: '80vh' }}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdate} color="primary">
                Update
              </Button>
              <Button onClick={handleImageDelete} color="secondary">
                Delete
              </Button>
              <Button onClick={closeImageModal} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        
        </Box>
      )}
    </div>
  );
}

export default WhatsNew;
