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
import Cookies from 'js-cookie';


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';





// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";



// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';


const Ebook = () => {
    const [token, setToken] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [fileError, setFileError] = useState('');
  const [ebookFile, setEbookFile] = useState(null);  // Add this line for the file state
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);

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
      const authToken = Cookies.get('authToken');

 if (authToken) {
      setToken(authToken);
      console.log('Token:', token)
    }


    fetchProgramOptions();
        fetchEbooksAndObjectives(authToken);

  }, []);

  useEffect(() => {
    fetchCoursesForProgram();
  }, [newEbook.program]);



  // Function to Fetch Program

  const fetchProgramOptions = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/programs`);
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


  // Function to Course for Program

  const fetchCoursesForProgram = async () => {
    try {
      if (newEbook.program) {
        const response = await fetch(`${API_ENDPOINT}/api/courses?program=${newEbook.program}`);
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


// Funtion to fetch all Ebook
  
    const fetchEbooksAndObjectives = async (authToken) => {
      try {
      setIsLoading(true)
      const response = await fetch(`${API_ENDPOINT}/api/ebook_and_objective`, {
        headers: {
          "Authorization": `bearer ${authToken}`
        }
      });
      const data = await response.json();
      setEbooks(data.ebooks); // Assuming the response data is an array of ebooks
      console.log('Ebook Data:',data )
    } catch (error) {
      console.error('Error fetching ebooks and objectives:', error);
      } finally {
        setIsLoading(false)
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

    const fileUploadResponse = await fetch(`${API_ENDPOINT}/upload`, {
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

    const ebookPostResponse = await fetch(`${API_ENDPOINT}/api/ebook`, {
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

  
 

 const handleViewContents = (ebook) => {
  setSelectedEbook(ebook);
  // setCaption(ebook.caption); // Set the caption when viewing contents
  // setProgramTitle(ebook.programTitle); // Set programTitle for editing
  // setCourseTitle(ebook.courseTitle); // Set courseTitle for editing
  // setEbookTitle(ebook.title); // Set ebookTitle for editing

  // Prepopulate the form fields with the selected ebook data
  setNewEbook({
    ...newEbook,
    title: ebook.title,
    caption: ebook.caption,
    program: ebook.program, // Assuming program ID is stored in ebook.program
    course: ebook.course, // Assuming course ID is stored in ebook.course
  });
};

 const handleViewEbook = () => {
  // Assuming the URL of the PDF is stored in selectedEbook.url
  const pdfViewerUrl = `${API_ENDPOINT}/file/${selectedEbook.url}`;
  window.open(pdfViewerUrl, '_blank'); // Open the PDF in a new tab
};

  
  // Funtion to Delete Ebook

const handleDeleteEbook = async () => {
  try {
    setIsLoadingDelete(true); // Set loading state to true

    const response = await fetch(`${API_ENDPOINT}/api/ebook/${selectedEbook._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      // Add any body if required
    });

    if (response.ok) {
      // If deletion is successful, remove the ebook from the state
      setEbooks(ebooks.filter(ebook => ebook.id !== selectedEbook.id));
      // setSelectedEbook(null); // Reset selected ebook state
      console.log('Ebook deleted successfully');
      setSelectedEbook(null);
      
          setDeleteMessageVisible(true);


    } else {
      console.error('Failed to delete ebook:', response.status);
      // Handle error if deletion fails
    }
  } catch (error) {
    console.error('Error deleting ebook:', error);
    // Handle network error if request fails
  } finally {
    setIsLoadingDelete(false); // Reset loading state
  }
};




      // Specify a custom getRowId function
    const getRowId = (row) => row._id;
return (
  <div className="container mx-auto p-4" style={{ padding:"2rem 4rem 4rem 4rem", width:"80vw" }}>
    
 <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Ebook Created successfully! 
          </Alert>
    </Snackbar>
    {/* Snackbar for deleted Ebook */}
 <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setDeleteMessageVisible(false)} severity="success">
            Ebook Deleted successfully! 
          </Alert>
        </Snackbar>

      <h1 className="text-3xl text-gray-500 mb-6">Ebooks</h1>
      <Button
        onClick={handleAddClick}
      variant="contained"
      className='All-buttons mb-4'
      
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
          <TextField
            label="Ebook Caption"
            value={newEbook.caption}
            onChange={(e) => handleChange(e)}
            fullWidth
            margin="normal"
            name="caption"
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

    
{/* Dialoog to view/update Ebook */}

    <Dialog open={selectedEbook !== null} onClose={() => setSelectedEbook(null)} fullWidth>
  <DialogTitle>{selectedEbook?.title}</DialogTitle>
  <DialogContent>
    <form>
      <TextField
        label="Ebook Title"
        value={selectedEbook ? selectedEbook.title : ''}
        onChange={(e) => setNewEbook((prevEbook) => ({ ...prevEbook, title: e.target.value }))}
        fullWidth
        margin="normal"
        name="title"
          />
              <TextField
        label="Caption"
        value={selectedEbook ? selectedEbook.caption : ''}
        onChange={(e) => setNewEbook((prevEbook) => ({ ...prevEbook, caption: e.target.value }))}
        fullWidth
        margin="normal"
        name="caption"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Select Program</InputLabel>
        <Select
          name="program"
          value={selectedEbook ? selectedEbook.program : ''}
          onChange={(e) => setNewEbook((prevEbook) => ({ ...prevEbook, program: e.target.value }))}
        >
          {programOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     <FormControl fullWidth margin="normal">
        <InputLabel>Select Course</InputLabel>
        <Select
          name="course"
          value={selectedEbook ? selectedEbook.course : ''}
          onChange={(e) => setNewEbook((prevEbook) => ({ ...prevEbook, course: e.target.value }))}
        >
          {courseOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  </DialogContent>
      <DialogActions>
    <Button onClick={handleViewEbook} color="primary">View Ebook</Button>
    <Button  color="primary">Save Changes</Button>
        <Button
            startIcon={isLoadingDelete && <CircularProgress color='inherit' size={20} />} // Display spinner as startIcon

          onClick={handleDeleteEbook} color="error">Delete
        
        </Button>
    <Button onClick={() => setSelectedEbook(null)}>Close</Button>
  </DialogActions>
</Dialog>


    





    <div style={{ height: 400}}>
      
      {isLoading ? ( <Box display="flex" justifyContent="center" alignItems="center" height={500}>
            <CircularProgress />
          </Box>) : (
        
    <DataGrid
          rows={ebooks} // Use the ebooks state for the rows
        id="ebooks-table"
        style={{ marginTop: '2rem' }}
        autoHeight
        columns={[
          { field: 'title', headerName: 'Ebook Title', flex: 1 },
          // { field: 'url', headerName: 'File', flex: 1 },
           { 
      field: 'program', 
      headerName: 'Program', 
      flex: 1,
      valueGetter: (params) => {
        // Find the corresponding program name based on the ID
        const program = programOptions.find(option => option.id === params.value);
        return program ? program.title : '';
      }
    },
    { 
      field: 'course', 
      headerName: 'Course', 
      flex: 1,
      valueGetter: (params) => {
        // Find the corresponding course name based on the ID
        const course = courseOptions.find(option => option.id === params.value);
        return course ? course.title : '';
      }
    },
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
            getRowId={getRowId} // Specify the custom getRowId function

        />
        )
      }
      </div>

    </div>
  );
};

export default Ebook;
