import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { colors } from '@mui/material';



// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';


function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    category: '',
    lesson: '',
    days: '',
    credit: '',
    program: ''
  });
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [courses, setCourses] = useState([])
  const [programOptions, setProgramOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [selectedProgramFilter, setSelectedProgramFilter] = useState('');
const [isFilterApplied, setIsFilterApplied] = useState(false);







useEffect(() => {
    // Fetch program options when the component mounts
    fetchProgramOptions();
  }, []);


  // Filter Courses by Program ID

  useEffect(() => {
    // Fetch courses when the component mounts or when the program filter changes
    if (isFilterApplied) {
      filterCoursesByProgram(selectedProgramFilter);
    } else {
      fetchCourses();
    }
  }, [isFilterApplied, selectedProgramFilter]);



  const fetchProgramOptions = async () => {
    try {
      const response = await fetch('https://fis.metaforeignoption.com/api/programs');
      const data = await response.json();

      // Assuming data is an array of programs with 'id' and 'title' properties
      const programOptions = data.map(program => ({
        id: program._id,
        title: program.title,
      }));
      
      console.log('Program Options:', programOptions);

      // Set the array of program options in state
      setProgramOptions(programOptions);
    } catch (error) {
      console.error('Error fetching program options:', error);
    }
  };




  const fetchCourses = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://fis.metaforeignoption.com/api/courses');
      const data = await response.json();

      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setIsLoading(false);
    }
  };


  // Function to filter Courses by Program

  const filterCoursesByProgram = async (programId) => {
    try {
      setIsLoading(true);

      const response = await fetch(`https://fis.metaforeignoption.com/api/courses?program=${programId}`);
      const data = await response.json();

      setCourses(data);
    } catch (error) {
      console.error('Error filtering courses:', error);
    } finally {
      setIsLoading(false);
    }
  };






 const openModal = (index) => {
  setSelectedCourseIndex(index);
  const selectedCourse = courses[index] || { title: '', category: '', lesson: '', days: '', program: '', credit: '' };
  console.log('Selected Course Index:', index);
  console.log('Selected Course:', selectedCourse);
  setCourseData(selectedCourse);
  setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourseIndex(null);
    setCourseData({
      title: '',
      category: '',
      lesson: '',
      days: '',
      credit: '',
      program: ''

    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is the 'program' field
    if (name === 'program') {
      // Update the course data with the selected program ID
      setCourseData({
        ...courseData,
        [name]: value,
      });
    } else {
      // For other fields, update the course data as before
      setCourseData({
        ...courseData,
        [name]: value,
      });
    }
  };




  // Function to add a Course
const handleAddCourse = async () => {
  try {
            setIsLoading(true);

    // Make a POST request to the courses API endpoint
    const response = await fetch('https://fis.metaforeignoption.com/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error('Failed to add course');
    }

    
    // Show the success message
      setSuccessMessageVisible(true);
       // Optionally, hide the success message after a certain duration
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 5000); // Hide the message after 5 seconds (adjust the duration as needed)
  

    console.log('Course Data:', courseData)
    // Assuming the response from the server contains the newly added course data
    const newCourse = await response.json();

    console.log('Added Course:', newCourse)

    // Update the courses array with the new course data
    setCourses([...courses, newCourse]);

    // Clear the form data
    setCourseData({
      title: '',
      category: '',
      lesson: '',
      days: '',
      credit: '',
      program: '',
    });

    // Close the modal after adding the course
    closeModal();
  } catch (error) {
    console.error('Error adding course:', error);
    // Handle error as needed (e.g., show an error message to the user)
  }finally {
    // Set loading back to false after the submission is complete (success or failure)
    setIsLoading(false);
  }
};


  
  // Function to Save changes in a Course
  const handleSaveChanges = () => {
    // Implement your logic to update the course data in the courses array
    const updatedCourses = [...courses];
    updatedCourses[selectedCourseIndex] = courseData;
    setCourses(updatedCourses);

    // Close the modal after saving changes
    closeModal();
  };



  // Funtion to delete a Course
 const handleDelete = async () => {
   try {
                setIsLoadingDelete(true);

    // Retrieve the courseId of the course to be deleted
    const courseIdToDelete = courses[selectedCourseIndex]._id;

    // Make a DELETE request to the courses API endpoint
    const response = await fetch(`https://fis.metaforeignoption.com/api/courses/${courseIdToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete course');
     }
     
     // Show the success message
      setSuccessMessageVisible(true);
       // Optionally, hide the success message after a certain duration
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 5000); // Hide the message after 5 seconds (adjust the duration as needed)
  

    // If the deletion was successful, update the courses array
    const updatedCourses = [...courses];
    updatedCourses.splice(selectedCourseIndex, 1);
     setCourses(updatedCourses);
     console.log('Deleted Course Successfully:', updatedCourses)

    // Close the modal after deleting the course
    closeModal();
  } catch (error) {
    console.error('Error deleting course:', error);
    // Handle error as needed (e.g., show an error message to the user)
  }finally {
    // Set loading back to false after the submission is complete (success or failure)
    setIsLoadingDelete(false);
  }
};

  const handleViewCourse = (index) => {
    openModal(index);
  };

  // Add this function to your component
const getProgramNameById = (programId) => {
  const program = programOptions.find(option => option.id === programId);
  return program ? program.title : '';
};

  
  
//   const filterCoursesByProgram = (programId) => {
//   if (programId === '') {
//     // If no program is selected, display all courses
//     setCourses(courses);
//   } else {
//     // Filter courses based on the selected program
//     const filteredCourses = courses.filter((course) => course.program === programId);
//     setCourses(filteredCourses);
//   }
// };




  

  return (
    <div>
      <Box marginTop='1rem' padding='2rem' width='80vw' height='100vh'>

          <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Course Created successfully! 
          </Alert>
        </Snackbar>

        <Box display='flex' justifyContent='center' alignItems='center'>

  <Box flex="1">
    <Button variant="outlined" color="primary" onClick={() => openModal(null)}>
      Add New Course
    </Button>
  </Box>

  <Box flex="2">
    <FormControl fullWidth margin="normal">
      <InputLabel id="filter-program-label">Filter Program</InputLabel>
      <Select
        labelId="filter-program-label"
        id="filter-program"
        value={selectedProgramFilter}
        onChange={(e) => setSelectedProgramFilter(e.target.value)}
        style={{ width: '200px' }} // Adjust the width value as needed
      >
        <MenuItem value="">All Programs</MenuItem>
        {programOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>

  <Box flex="1">
    <Button
      variant="outlined"
      color="primary"
      onClick={() => {
        setIsFilterApplied(true);
        // Trigger a function to filter courses based on the selected program
        // You can create a separate function for filtering and update the courses accordingly
        filterCoursesByProgram(selectedProgramFilter);
      }}
    >
      Apply Filter
    </Button>
  </Box>

</Box>


        <Dialog open={isModalOpen} onClose={closeModal}>
          <DialogTitle>{selectedCourseIndex !== null ? 'View Course' : 'Add Course'}</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="Title"
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  >
                  <MenuItem value="math">Math</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="history">History</MenuItem>
                  {/* Add more options as needed */}
                </Select>
              </FormControl>
           <FormControl fullWidth margin="normal">
        <InputLabel>Program</InputLabel>
        <Select
          name="program"
          value={courseData.program}
          onChange={handleInputChange}
        >
          {programOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
              <TextField
                label="Lesson"
                name="lesson"
                value={courseData.lesson}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Credit"
                name="credit"
                value={courseData.credit}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Days"
                name="days"
                value={courseData.days}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            </form>
          </DialogContent>
          <DialogActions>
            {selectedCourseIndex !== null && (
              
              <Button
color="error"
onClick={handleDelete} 
 disabled={isLoadingDelete}
    // startIcon={<DeleteIcon />}
    style={{  color: 'red' }}
  startIcon={isLoadingDelete && <CircularProgress size={20} color="inherit" />} >
                Delete
              </Button>
            )}
            <Button onClick={closeModal}>Cancel</Button>
            {selectedCourseIndex !== null ? (
              <Button onClick={handleSaveChanges}>
                Save Changes
              </Button>
            ) : (
              <Button
    color="primary"
onClick={handleAddCourse}  
  disabled={isLoading}
    style={{ backgroundColor: '#1976D2', color: '#ffffff' }}
    startIcon={isLoading && <CircularProgress size={20} color="inherit" />} >
                    Add Course </Button>
            )}
          </DialogActions>
        </Dialog>
        
      {isLoading ? (
  // Show loading spinner while data is being fetched
  <Box display="flex" justifyContent="center" marginTop="2rem">
    <CircularProgress />
  </Box>
) : (
  courses.length > 0 && (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Program</TableCell>
          <TableCell>Lesson</TableCell>
          <TableCell>Days</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {courses.map((course, index) => (
          <TableRow key={index}>
            <TableCell>{course.title}</TableCell>
            <TableCell>{course.category}</TableCell>
            <TableCell>{getProgramNameById(course.program)}</TableCell>
            <TableCell>{course.lesson}</TableCell>
            <TableCell>{course.days}</TableCell>
            <TableCell>
              <Button onClick={() => handleViewCourse(index)}>View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
)}

      </Box>
    </div>
  );
}

export default Courses;
