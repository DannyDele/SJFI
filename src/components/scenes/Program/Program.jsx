import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid,  GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';





// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";

// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';



const Program = () => {
  const [programData, setProgramData] = useState({
    title: '',
    price: '',
    description: '',
    lesson: '',
  });

  const [programs, setPrograms] = useState({});
  const [editProgram, setEditProgram] = useState(null);
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [submitting, setSubmitting] = useState(false); // Added submitting state
  const [loading, setLoading] = useState(false); // Added loading state
  const [loadingDelete, setLoadingDelete] = useState(false); // Added loading state
  const [loadingUpdate, setLoadingUpdate] = useState(false); // Added loading state
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const [isUpdateMessageVisible, setUpdateMessageVisible] = useState(false);
const [formValid, setFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Added formSubmitted state


  
useEffect(() => {
  // Check form validity whenever programData changes
  if(formSubmitted){
  const isValid = Object.entries(programData).every(([key, value]) => {
    // If value is a string, trim and check for empty string
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    // If value is a number (like price), check for non-zero
    if (typeof value === 'number') {
      return value !== 0;
    }
    // For other types of values, consider them valid
    return true;
  });
    setFormValid(isValid);
    }
  }, [programData, formSubmitted]);




  useEffect(() => {
    // Fetch existing programs from the API when the component mounts
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_ENDPOINT}/api/programs`);

      if (!response.ok) {
        throw new Error(`Failed to fetch programs. Status: ${response.status}`);
      }

      const programsData = await response.json();
      setPrograms(programsData);
    } catch (error) {
      console.error('Error fetching programs:', error.message);
    } finally {
      setLoading(false)
    }
  };
  
  
  const handleAddProgram = () => {
    setOpen(true);
    setEditProgram(null);
    setProgramData({
      title: '',
      price: '',
      description: '',
      lesson: '',
    });
    setFormMode('add');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgramData({ ...programData, [name]: value });
  };


  const handleFeeChange = (e) => {
    setProgramData({ ...programData, price: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setProgramData({ ...programData, description: e.target.value });
  };

  const handleLessonChange = (e) => {
    setProgramData({ ...programData, lesson: e.target.value });
  };

  const handleViewProgram = (program) => {
    setEditProgram(program);
    setProgramData({ ...program });
    setOpen(true);
    setFormMode('edit');
  };

  const handleClose = () => {
    setOpen(false);
  };


  // FUNTION TO DELETE PROGRAM

  const handleDeleteProgram = async () => {
   setLoadingDelete(true)
  try {
    // Assuming editProgram is defined and has an "id" property
    const response = await fetch(`${API_ENDPOINT}/api/programs/${editProgram._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete program. Status: ${response.status}`);
    }

    setPrograms((prevPrograms) => prevPrograms.filter((program) => program._id !== editProgram._id));

 
    // Show the success message
      setDeleteMessageVisible(true);
       // Optionally, hide the success message after a certain duration
    setTimeout(() => {
      setDeleteMessageVisible(false);
    }, 5000); // Hide the message after 5 seconds (adjust the duration as needed)


    setOpen(false); // Close the dialog after deletion
  } catch (error) {
    console.error('Error deleting program:', error.message);

    // Handle error state or show a notification to the user
    // For example, set an error message state and display it in the UI
  } finally {
    setLoadingDelete(false)
  }
};



  // FUNTION TO ADD PROGRAM
  const handleAddNewProgram = async () => {
    // Set submitting to true when the form is being submitted
    setSubmitting(true);
  try {
    console.log('Program Data', programData);


    // Assuming the API supports adding a new program
    const response = await fetch(`${API_ENDPOINT}/api/programs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(programData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add program. Status: ${response.status}`);
    }

    const newProgram = await response.json();

    setPrograms(prevPrograms => [...prevPrograms, newProgram]);


    
    // Show the success message
      setSuccessMessageVisible(true);
       // Optionally, hide the success message after a certain duration
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 5000); // Hide the message after 5 seconds (adjust the duration as needed)

    setProgramData({
      title: '',
      price: '',
      description: '',
      lesson: '',
    });
    setOpen(false);
  } catch (error) {
    console.error('Error adding program:', error);

    // Handle error state or show a notification to the user
    // For example, set an error message state and display it in the UI
  }finally {
    // Set submitting back to false whether the submission was successful or not
    setSubmitting(false);
  }
  };
  


    const handleSubmit = () => {
    // Set formSubmitted to true when attempting to submit the form
    setFormSubmitted(true);
    // If form is valid, proceed with adding new program
    if (formValid) {
      handleAddNewProgram();
    }
  };


// FUNTION TO UPDATE PROGRAM
  
  const handleUpdateProgram = async () => {
    setLoadingUpdate(true);
    try {
      const response = await fetch(`${API_ENDPOINT}/api/programs/${editProgram._id}`, {
        method: 'PUT', // Assuming you need to use PUT method to update
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        body: JSON.stringify(programData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update program. Status: ${response.status}`);
      }

      const updatedProgram = await response.json();

      setPrograms((prevPrograms) =>
        prevPrograms.map((program) => (program._id === updatedProgram._id ? updatedProgram : program))
      );

      // Show the success message
      setUpdateMessageVisible(true);
      // Optionally, hide the success message after a certain duration
      setTimeout(() => {
        setSuccessMessageVisible(false);
      }, 5000); // Hide the message after 5 seconds (adjust the duration as needed)

      setOpen(false);
    } catch (error) {
      console.error('Error updating program:', error);

      // Handle error state or show a notification to the user
      // For example, set an error message state and display it in the UI
    } finally {
      setLoadingUpdate(false);
    }
  };




  return (
    <div className="container mx-auto p-4" style={{ width:"80vw", padding:"2rem 4rem 4rem 4rem" }}>

       {/* Add Program Message */}
         <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Program Created successfully! 
          </Alert>
      </Snackbar>

      {/* Delete Program Message */}
       <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Program Deleted successfully! 
          </Alert>
      </Snackbar>
      
      {/* uPDATE Program Message */}
       <Snackbar
          open={isUpdateMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setUpdateMessageVisible(false)}
        >
          <Alert onClose={() => setUpdateMessageVisible(false)} severity="success">
            Program Updated successfully! 
          </Alert>
        </Snackbar>
      
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Programs</h1>
      <Button onClick={handleAddProgram} variant="contained" className='All-buttons mb-4'>
        Add New Program
      </Button>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (<Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{formMode === 'edit' ? 'Edit Program' : 'Add Program'}</DialogTitle>
          <DialogContent>
           <TextField
  label="Program Name"
  name="title"
  value={programData.title}
  onChange={handleInputChange}
  fullWidth
  margin="normal"
  error={formSubmitted && !programData.title.trim()}
  helperText={formSubmitted && !programData.title.trim() && "Program Name cannot be empty"}
  disabled={formMode === 'view'}
/>

<TextField
  label="Fee"
  name="price"
  value={programData.price}
  onChange={handleInputChange}
  fullWidth
  margin="normal"
  error={formSubmitted && (typeof programData.price === 'string' ? !programData.price.trim() : !programData.price)}
  helperText={formSubmitted && (typeof programData.price === 'string' ? !programData.price.trim() && "Price cannot be empty" : !programData.price && "Price cannot be empty")}
  disabled={formMode === 'view'}
/>

<TextField
  label="Description"
  name="description"
  value={programData.description}
  onChange={handleInputChange}
  fullWidth
  margin="normal"
  error={formSubmitted && !programData.description.trim()}
  helperText={formSubmitted && !programData.description.trim() && "Description cannot be empty"}
  disabled={formMode === 'view'}
/>

<TextField
  label="Tags"
  name="lesson"
  value={programData.lesson}
  onChange={handleInputChange}
  fullWidth
  margin="normal"
  error={formSubmitted && !programData.lesson.trim()}
  helperText={formSubmitted && !programData.lesson.trim() && "Lesson cannot be empty"}
  disabled={formMode === 'view'}
/>

          </DialogContent>
          <DialogActions>
            {formMode === 'edit' && (
              <>
                <Button onClick={handleDeleteProgram} style={{color: 'red'}}>
                  {loadingDelete && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}
                  Delete
                </Button>
                <Button onClick={handleUpdateProgram} color="primary">
                  {loadingUpdate && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}

                  Update
                </Button>
              </>
             )} 
            {formMode !== 'edit' && (
              <Button onClick={handleSubmit} color="primary">
                {submitting && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}Add Program
              </Button>
            )}
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
          </Dialog>
                  <div style={{ height: 400 }}>

          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={500}>
              <CircularProgress />
            </Box>
          ) :
            (
              <DataGrid
                rows={programs}
                columns={[
                  { field: 'title', headerName: 'TITLE', flex: 5 },
                  { field: 'lesson', headerName: 'TAGS', flex: 5 },
                  {
                    field: 'actions',
                    headerName: 'Actions',
                    flex: 1,
                    renderCell: (params) => (
                      <Button color="primary" onClick={() => handleViewProgram(params.row)}>
                        View
                      </Button>
                    ),
                  },
                ]}
                pageSize={5} // Number of items per page
                pagination
                components={{
                  Toolbar: GridToolbar,
                }}
                getRowId={(row) => row._id} // Specify the unique identifier for each row
                style={{ height: '500', width: '100%', margin: '2rem 0 0 0' }} // Set a height and width for the DataGrid

              />
            )}

          </div>
      </Box>
      )}
    </div>
  );
};

export default Program;
