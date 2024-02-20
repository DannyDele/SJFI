import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Box, DialogActions} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

function Announcements() {
    const [open, setOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: '' });
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
  if (selectedAnnouncement) {
    // Update the selected announcement in announcementsData
    const updatedAnnouncements = announcementsData.map((announcement) =>
      announcement === selectedAnnouncement ? formData : announcement
    );
    setAnnouncementsData(updatedAnnouncements);
  } else {
    // If no announcement is selected, add a new announcement
    setAnnouncementsData([...announcementsData, formData]);
  }

  // Reset the form data
  setFormData({ title: '', body: '', category: '' });

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
    </div>
  );
}

export default Announcements;
