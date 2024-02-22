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
import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InputAdornment from '@mui/material/InputAdornment';


function Announcements() {
    const [open, setOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: '' });
  const [imageFile, setImageFile] = useState(null);
    const [updatedImage, setUpdatedImage] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);

  const [announcementsData, setAnnouncementsData] = useState([
    { title: 'Announcement 1', body: 'This is the body of Announcement 1', category: 'General' },
    { title: 'Announcement 2', body: 'This is the body of Announcement 2', category: 'Event' },
    { title: 'Announcement 3', body: 'This is the body of Announcement 3', category: 'News' },
  ]);

  
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

 
const handleFormSubmit = () => {
  const updatedFormData = { ...formData };

    // Set the image property to the URL of the selected file
  if (imageFile) {
    updatedFormData.image = URL.createObjectURL(imageFile);
  }

  
  if (selectedAnnouncement) {
    // Update the selected announcement in announcementsData
    const updatedAnnouncements = announcementsData.map((announcement) =>
      announcement === selectedAnnouncement ? updatedFormData : announcement
    );
    setAnnouncementsData(updatedAnnouncements);
  } else {
    // If no announcement is selected, add a new announcement
    setAnnouncementsData([...announcementsData, updatedFormData]);
  }

  // Reset the form data and image
  setFormData({ title: '', body: '', category: '' });
  setImageFile(null);

  // Close the popup
  setOpen(false);
};



    const handleDelete = () => {
          console.log('Delete:', selectedAnnouncement);

    // Remove the selected announcement from announcementsData
    const updatedAnnouncements = announcementsData.filter(
      (announcement) => announcement !== selectedAnnouncement
    );
    setAnnouncementsData(updatedAnnouncements);

    // Reset the form data
    setFormData({ title: '', body: '', category: '' });

    // Close the popup
    setOpen(false);
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
      <Box marginTop='1rem' padding='2rem' width='80vw' height='100vh'>
              <Button variant="contained"
                  color="primary"
                  style={{ marginBottom: '10px', display: 'flex', justifyContent: 'end' }} onClick={() => handleClickOpen()}>
          Add New Announcements
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Body</b></TableCell>
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
                  <TableCell>{announcement.body}</TableCell>
                  <TableCell>{announcement.category}</TableCell>
           <TableCell>
  {announcement.image && (
    <img
      src={URL.createObjectURL(announcement.image)}
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
              label="Body"
              name="body"
              value={formData.body}
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
      {selectedFile && (
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#555555' }}>
          {`Selected file: ${selectedFile.name}`}
        </div>
      )}


          </form>
        </DialogContent>
       <DialogActions>
  {selectedAnnouncement !== null ? (
    <>
      <Button onClick={handleDelete} color="secondary">
        Delete
      </Button>
      <Button onClick={handleFormSubmit} color="primary">
        Save Changes
      </Button>
    </>
  ) : (
    <Button onClick={handleFormSubmit} color="primary">
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
        src={URL.createObjectURL(selectedFile)}
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

    </div>
  );
}

export default Announcements;
