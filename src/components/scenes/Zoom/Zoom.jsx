import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

function Zoom() {
  const [openSelectPopup, setOpenSelectPopup] = useState(false);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [zoomLink, setZoomLink] = useState('');

  const programs = ['Program A', 'Program B', 'Program C'];
  const courses = ['Course 1', 'Course 2', 'Course 3'];
  const classes = ['Class X', 'Class Y', 'Class Z'];

  const handleAddZoomLink = () => {
    setOpenSelectPopup(true);
  };

  const handleProceed = () => {
    setOpenSelectPopup(false);
    setOpenAddPopup(true);
  };

  const handleAddZoomLinkFinal = () => {
    // Add logic to handle the addition of Zoom link
    console.log('Zoom Link:', zoomLink);

    // Reset state
    setSelectedProgram('');
    setSelectedCourse('');
    setSelectedClass('');
    setZoomLink('');

    // Close the popup
    setOpenAddPopup(false);
  };

  return (
    <div>
      <Box marginTop='1rem' padding='2rem' width='80vw' height='100vh'>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddZoomLink}
        >
          Add Zoom Link
        </Button>

        {/* Select Popup */}
        <Dialog open={openSelectPopup} onClose={() => setOpenSelectPopup(false)}>
          <DialogTitle>Select Program, Course, and Class</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="normal">
              <InputLabel>Program</InputLabel>
              <Select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
              >
                {programs.map((program, index) => (
                  <MenuItem key={index} value={program}>
                    {program}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Course</InputLabel>
              <Select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                {courses.map((course, index) => (
                  <MenuItem key={index} value={course}>
                    {course}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Class</InputLabel>
              <Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                {classes.map((classItem, index) => (
                  <MenuItem key={index} value={classItem}>
                    {classItem}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProceed} color="primary">
              Proceed
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Zoom Link Popup */}
        <Dialog open={openAddPopup} onClose={() => setOpenAddPopup(false)}>
          <DialogTitle>Add Zoom Link</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              {`Selected Program: ${selectedProgram}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`Selected Course: ${selectedCourse}`}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {`Selected Class: ${selectedClass}`}
            </Typography>
            <TextField
              label="Zoom Link"
              fullWidth
              value={zoomLink}
              onChange={(e) => setZoomLink(e.target.value)}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddZoomLinkFinal} color="primary">
              Add Zoom Link
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
}

export default Zoom;
