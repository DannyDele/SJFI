import  { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


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
    const [loading, setLoading] = useState(true); // Added loading state




  useEffect(() => {
    // Fetch existing programs from the API when the component mounts
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await fetch('https://fis.metaforeignoption.com/api/programs');

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
    setProgramData({ ...programData, title: e.target.value });
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

  const handleDeleteProgram = async () => {
   setSubmitting(true)
  try {
    // Assuming editProgram is defined and has an "id" property
    const response = await fetch(`https://fis.metaforeignoption.com/api/programs/${editProgram._id}`, {
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
    setOpen(false); // Close the dialog after deletion
  } catch (error) {
    console.error('Error deleting program:', error.message);

    // Handle error state or show a notification to the user
    // For example, set an error message state and display it in the UI
  } finally {
    setSubmitting(false)
  }
};


  const handleAddNewProgram = async () => {
    // Set submitting to true when the form is being submitted
    setSubmitting(true);
  try {
    console.log('Program Data', programData);


    // Assuming the API supports adding a new program
    const response = await fetch('https://fis.metaforeignoption.com/api/programs', {
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


  return (
    <div className="container mx-auto p-4" style={{ marginLeft: '20px' }}>
      
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Programs</h1>
      <Button onClick={handleAddProgram} variant="outlined" color="primary" className="mb-4">
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
              value={programData.title}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          
              <FormControl fullWidth margin="normal" disabled={formMode === 'view'}
>
                <InputLabel>Fee</InputLabel>
                <Select
                  name="program"
              value={programData.price}
              onChange={handleFeeChange}
                  >
                  <MenuItem>
                    #2,000,000
                    </MenuItem>
                  
                </Select>
              </FormControl>
            <TextField
              label="Description"
              value={programData.description}
              onChange={handleDescriptionChange}
              fullWidth
              margin="normal"
              disabled={formMode === 'view'}
            />
            <TextField
              label="Lesson"
              value={programData.lesson}
              onChange={handleLessonChange}
              fullWidth
              margin="normal"
              disabled={formMode === 'view'}
            />
          </DialogContent>
          <DialogActions>
            {formMode === 'edit' && (
              <>
                <Button onClick={handleDeleteProgram} color="secondary">
                 {submitting && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />} Delete
                </Button>
                <Button onClick={handleAddNewProgram} color="primary">
                  Update
                </Button>
              </>
            )}
            {formMode !== 'edit' && (
              <Button onClick={handleAddNewProgram} color="primary">
                {submitting && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}Add Program
              </Button>
            )}
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-gray-800 font-semibold">Title</th>
              <th className="border px-4 py-2 text-gray-800 font-semibold">Category</th>
              <th className="border px-4 py-2 text-gray-800 font-semibold">Lesson</th>
              <th className="border px-4 py-2 text-gray-800 font-semibold">Actions</th>
            </tr>
          </thead>
     <tbody>
  {programs.map(program => (
    <tr key={program._id}>
      <td className="border px-4 py-2 text-gray-800">{program.title}</td>
      <td className="border px-4 py-2 text-gray-800">{program.category}</td>
      <td className="border px-4 py-2 text-gray-800">{program.lesson}</td>
      <td className="border px-4 py-2 text-gray-800">
        <Button  color="primary" onClick={() => handleViewProgram(program)}>View</Button>
        {/* Add a unique key to the following button */}
        {/* <Button variant="outlined" color="secondary" onClick={() => handleDeleteProgram(program.id)}>Delete</Button> */}
      </td>
    </tr>
  ))}
</tbody>

          </table>
          
      </Box>
      )}
    </div>
  );
};

export default Program;
