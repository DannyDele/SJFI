import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  Box,
  InputLabel,
  FormControl,
  Input,
  InputAdornment,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';







// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';


const Ebook = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [fileError, setFileError] = useState('');
  const [ebookFile, setEbookFile] = useState(null);  // Add this line for the file state
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);

  const [editEbookId, setEditEbookId] = useState(null);
  const [programOptions, setProgramOptions] = useState([]);
    const [ebooks, setEbooks] = useState([]); // New state to store the list of ebooks
  const [courseOptions, setCourseOptions] = useState([]);
  const [newEbook, setNewEbook] = useState({
    title: '',
    caption: '',
    program: '', // id
    course: '', // id
    class: '', // id
    url: '',
  });
  const [caption, setCaption] = useState('');
  const [selectedEbook, setSelectedEbook] = useState(null);

  useEffect(() => {
    fetchProgramOptions();
  }, [programOptions]);

  useEffect(() => {
    fetchCoursesForProgram();
  }, [newEbook.program]);

  const fetchProgramOptions = async () => {
    try {
      const response = await fetch('https://fis.metaforeignoption.com/api/programs');
      const data = await response.json();
      const programNames = data.map(program => ({
        id: program._id,
        title: program.title
      }));

      setProgramOptions(programNames);
    } catch (error) {
      console.error('Error fetching program options:', error);
    }
  };

  const fetchCoursesForProgram = async () => {
    try {
      if (newEbook.program) {
        const response = await fetch(`https://fis.metaforeignoption.com/api/courses?program=${newEbook.program}`);
        const data = await response.json();
        const courseNames = data.map(course => ({
          id: course._id,
          title: course.title
        }));

        setCourseOptions(courseNames);

        if (!newEbook.course && courseNames.length > 0) {
          setNewEbook((prevEbook) => ({ ...prevEbook, course: courseNames[0].id }));
        }
      }
    } catch (error) {
      console.error('Error fetching courses for the program:', error);
    }
  };

  const handleChange = (e) => {
    setNewEbook((prevEbook) => ({ ...prevEbook, [e.target.name]: e.target.value }));
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };


// FUNCTION TO SUMMIT EBOOK

const handleFormSubmit = async (e) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    // Step 1: Create a new FormData object
    const fileData = new FormData();
    // Step 2: Append the actual file to the FormData object
    fileData.append('file', ebookFile);

    const fileUploadResponse = await fetch('https://fis.metaforeignoption.com/upload', {
      method: 'POST',
      body: fileData,
    });

    const filePath = await fileUploadResponse.json();
    const path = filePath.path;

    // Step 2: Send a POST request with ebook information and file path
    const ebookData = {
      title: newEbook.title,
      caption: newEbook.caption,
      program: newEbook.program,
      course: newEbook.course,
      class: newEbook.class,
      url: path,
    };

    const ebookPostResponse = await fetch('https://fis.metaforeignoption.com/api/ebook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ebookData),
    });

    if (!ebookPostResponse.ok) {
      throw new Error(`Failed to Upload Ebook. Status: ${ebookPostResponse.status}`);
    }

    const uploadedEbook = await ebookPostResponse.json();
    console.log('Uploaded Ebook', uploadedEbook);

   
      // Update the list of ebooks state with the response data
// Update the list of ebooks state with the response data
setEbooks((prevEbooks) => [...prevEbooks, { ...uploadedEbook, id: uploadedEbook._id }]);

    setSuccessMessageVisible(true);

    // Reset form and state
    setNewEbook({
      title: '',
      caption: '',
      program: '',
      course: '',
      class: '',
      url: '',
    });
    setFileError('');
    setShowAddForm(false);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
};



  const handleEditClick = (ebook) => {
    setProgramTitle(ebook.programTitle); // Assuming programTitle is a property of the ebook object
    setCourseTitle(ebook.courseTitle); // Assuming courseTitle is a property of the ebook object
    setEbookTitle(ebook.title);
    setEditEbookId(ebook.id);
    setShowAddForm(true);
  };

  const handleDeleteClick = (id) => {
    setEbooks(ebooks.filter(ebook => ebook.id !== id));
  };

  const handleViewContents = (ebook) => {
    setSelectedEbook(ebook);
    setCaption(ebook.caption); // Set the caption when viewing contents
    setProgramTitle(ebook.programTitle); // Set programTitle for editing
    setCourseTitle(ebook.courseTitle); // Set courseTitle for editing
    setEbookTitle(ebook.title); // Set ebookTitle for editing
  };  

  const handleEditEbook = () => {
    setProgramTitle(selectedEbook.programTitle); // Assuming programTitle is a property of the ebook object
    setCourseTitle(selectedEbook.courseTitle); // Assuming courseTitle is a property of the ebook object
    setEbookTitle(selectedEbook.title);
    setEditEbookId(selectedEbook.id);
    setShowAddForm(true);
  };

  const handleDeleteEbook = () => {
    setEbooks(ebooks.filter(ebook => ebook.id !== selectedEbook.id));
    setSelectedEbook(null);
  };
return (
  <div className="container mx-auto p-4" style={{ marginLeft: '20px' }}>
    
 <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Ebook Created successfully! 
          </Alert>
        </Snackbar>

      <h1 className="text-3xl text-gray-500 mb-6">Ebooks</h1>
      <Button
        onClick={handleAddClick}
        variant="outlined"
        color="primary"
        className="mb-4"
      >
        Add New Ebook
      </Button>
<Dialog open={showAddForm} onClose={() => setShowAddForm(false)}  fullWidth>
        <DialogTitle>{editEbookId !== null ? 'Edit Ebook' : 'Add New Ebook'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below:</DialogContentText>
          <Box mt={2}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Program</InputLabel>
              <Select
                name="program"
                value={newEbook.program}
                onChange={handleChange}
              >
                {programOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Course</InputLabel>
              <Select
                name="course"
                value={newEbook.course}
                onChange={handleChange}
              >
                {courseOptions.map((course, index) => (
                  <MenuItem key={index} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            label="Ebook Title"
            value={newEbook.title}
            onChange={(e) => handleChange(e)}
            fullWidth
            margin="normal"
            name="title"
          />
          {/* File input */}
            <InputLabel>Choose Ebook File</InputLabel>
        <Input
    type="file"
    onChange={(e) => {
      setEbookFile(e.target.files[0]);
      setFileError('');
    }}
    accept=".pdf"
    fullWidth
    margin="normal"
  />


          {/* Existing error handling */}
          {fileError && (
            <p className="text-red-500 text-sm mt-1">{fileError}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
        <Button
  onClick={handleFormSubmit}
  color="primary"
  disabled={isLoading} // Disable the button while loading
  startIcon={isLoading && <CircularProgress size={20} />} // Display spinner as startIcon
>
  {editEbookId !== null ? 'Edit Ebook' : 'Add Ebook'}
</Button>

        </DialogActions>
      </Dialog>
      <Dialog open={selectedEbook !== null} onClose={() => setSelectedEbook(null)}>
        <DialogTitle>{selectedEbook?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedEbook?.content}</DialogContentText>
          {/* Display the caption along with the contents */}
          <DialogContentText><strong>Caption: </strong>{caption}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditEbook} color="primary">Edit</Button>
          <Button onClick={handleDeleteEbook} color="error">Delete</Button>
          <Button onClick={() => setSelectedEbook(null)}>Close</Button>
        </DialogActions>
    </Dialog>





        <div style={{ height: 500, width: "90%", }}>
    <DataGrid
          rows={ebooks} // Use the ebooks state for the rows
        id="ebooks-table"
        style={{ marginTop: '2rem', marginLeft: '2rem' }}
        autoHeight
        columns={[
          { field: 'title', headerName: 'Ebook Title', flex: 1 },
          { field: 'url', headerName: 'File', flex: 1 },
          {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (params) => (
              <Button
                variant="outlined"
                onClick={() => handleViewContents(params.row)}
              >
                View Contents
              </Button>
            ),
          },
        ]}
        pageSize={10}
        components={{
          Toolbar: GridToolbar,
        }}
        checkboxSelection={false}
        disableSelectionOnClick
      />
      </div>

    </div>
  );
};

export default Ebook;
