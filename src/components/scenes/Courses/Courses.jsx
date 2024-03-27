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
import { colors, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';







// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";

// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';


function Courses() {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
    const [isUpdateMessageVisible, setUpdateMessageVisible] = useState(false);
    const [isCategoryMessageVisible, setCategoryMessageVisible] = useState(false);

  const [selectedProgramFilter, setSelectedProgramFilter] = useState('');
const [isFilterApplied, setIsFilterApplied] = useState(false);


  const [formValid, setFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Added formSubmitted state
    const [newCategory, setNewCategory] = useState('');



  
useEffect(() => {
  // Check form validity whenever programData changes
  if(formSubmitted){
  const isValid = Object.entries(courseData).every(([key, value]) => {
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
  }, [courseData, formSubmitted]);





useEffect(() => {
    // Fetch program options when the component mounts
    fetchProgramOptions();
}, []);
  
useEffect(() => {
    // Fetch program options when the component mounts
    fetchCategoryOptions();
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
      const response = await fetch(`${API_ENDPOINT}/api/programs`);
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


  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/category`);
      const data = await response.json();

      // Assuming data is an array of programs with 'id' and 'title' properties
      const categoryOptions = data.map(category => ({
        id: category._id,
        title: category.category,
      }));
      
      console.log('Category Options:', categoryOptions);

      // Set the array of program options in state
      setCategoryOptions(categoryOptions);
    } catch (error) {
      console.error('Error fetching Category options:', error);
    }
  };




  const fetchCourses = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_ENDPOINT}/api/courses`);
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

      const response = await fetch(`${API_ENDPOINT}/api/courses?program=${programId}`);
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
    const response = await fetch(`${API_ENDPOINT}/api/courses`, {
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
  

    const handleSubmit = () => {
    // Set formSubmitted to true when attempting to submit the form
    setFormSubmitted(true);
    // If form is valid, proceed with adding new program
    if (formValid) {
      handleAddCourse();
    }
  };


  
  // Function to Update a Course
 const handleSaveChanges = async () => {
  try {
    setUpdateLoading(true);

    // Retrieve the courseId of the course to be updated
    const courseIdToUpdate = courses[selectedCourseIndex]._id;

    // Make a PUT request to update the course data
    const response = await fetch(`${API_ENDPOINT}/api/courses/${courseIdToUpdate}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error('Failed to update course');
    }

    // Show the success message
    setUpdateMessageVisible(true);
    // Optionally, hide the success message after a certain duration
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 5000); // Hide the message after 5 seconds (adjust the duration as needed)

    // Assuming the response from the server contains the updated course data
    const updatedCourse = await response.json();

    // Update the courses array with the updated course data
    const updatedCourses = [...courses];
    updatedCourses[selectedCourseIndex] = updatedCourse;
    setCourses(updatedCourses);

    // Close the modal after saving changes
    closeModal();
  } catch (error) {
    console.error('Error updating course:', error);
    // Handle error as needed (e.g., show an error message to the user)
  } finally {
    // Set loading back to false after the submission is complete (success or failure)
    setUpdateLoading(false);
  }
};




  // Funtion to delete a Course
 const handleDelete = async () => {
   try {
                setIsLoadingDelete(true);

    // Retrieve the courseId of the course to be deleted
    const courseIdToDelete = courses[selectedCourseIndex]._id;

    // Make a DELETE request to the courses API endpoint
    const response = await fetch(`${API_ENDPOINT}/api/courses/${courseIdToDelete}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete course');
     }
     
    // Show the success message
      setDeleteMessageVisible(true);
       // Optionally, hide the success message after a certain duration
    setTimeout(() => {
      setDeleteMessageVisible(false);
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

 const handleViewCourse = (course) => {
  // Set courseData with individual properties
  setCourseData({
    title: course.title,
    category: course.category,
    lesson: course.lesson,
    days: course.days,
    program: course.program,
    credit: course.credit,
  });

  openModal(course.id); // Assuming course.id is the unique identifier for the course
};
;

  // Add this function to your component
const getProgramNameById = (programId) => {
  const program = programOptions.find(option => option.id === programId);
  return program ? program.title : '';
};

  
  // function to add category

  const handleAddCategory = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('${API_ENDPOINT}/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category: newCategory }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }


      const categoryData = response.json();

      console.log('Category Data:', categoryData)
      
      setCategoryMessageVisible(true)
          setIsCategoryModalOpen(false);


      // Clear the input field after successful addition
      setNewCategory('');

      // Optionally, you can perform additional actions after successful addition

    } catch (error) {
      console.error('Error adding category:', error);
      // Handle error as needed (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
      closeModal(); // Close the dialog regardless of success or failure
    }
  };


// Function to open the category modal
  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  // Function to close the category modal
  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };


  // Funtion to delete category

 
  const handleDeleteCategory = async (e, categoryId) => {
    e.stopPropagation();
    try {
      const response = await fetch(`${API_ENDPOINT}/api/category/${categoryId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      console.log('Category Deleted!')
      // Update the category options after successful deletion
      const updatedCategoryOptions = categoryOptions.filter(option => option.id !== categoryId);
      setCategoryOptions(updatedCategoryOptions);
    } catch (error) {
      console.error('Error deleting category:', error);
      // Handle error as needed
    }
  };



  return (
    <div>
      <Box padding="2rem 4rem 4rem 4rem" width='80vw' height='100vh'>
            <h1  className="text-3xl font-bold text-gray-500 mb-6">Courses</h1>

        
        {/* Create Class Message */}
          <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Course Created successfully! 
          </Alert>
        </Snackbar>

        {/* Delete Class Message */}

           <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Course Deleted successfully! 
          </Alert>
        </Snackbar>

        {/* Update Class Message */}
           <Snackbar
          open={isUpdateMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setUpdateMessageVisible(false)}
        >
          <Alert onClose={() => setUpdateMessageVisible(false)} severity="success">
            Course Updated successfully! 
          </Alert>
        </Snackbar>


        {/* ADD CATEGORY Message */}
           <Snackbar
          open={isCategoryMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setCategoryMessageVisible(false)}
        >
          <Alert onClose={() => setCategoryMessageVisible(false)} severity="success">
           Category added successfully! 
          </Alert>
        </Snackbar>

        <Box display='flex' justifyContent='space-between' alignItems='center'>

  <Box flex="1">
    <Button variant="contained" className='All-buttons' onClick={() => openModal(null)}>
      Add New Course
    </Button>
  </Box>

          <Box marginRight='1rem'>
        <Button variant="contained" className='All-buttons' onClick={openCategoryModal}>
            Add Category
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
              variant="contained"
              className='All-buttons'
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
                 error={formSubmitted && !courseData.title.trim()}
  helperText={formSubmitted && !courseData.title.trim() && "Course Name cannot be empty"}
              />
                  <FormControl fullWidth
                margin="normal"
                  error={formSubmitted && !courseData.category.trim()}
  helperText={formSubmitted && !courseData.category.trim() && "Course category cannot be empty"}
              >
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={courseData.category}
          onChange={handleInputChange}
        >
          {categoryOptions.map((option) => (
        <MenuItem key={option.id} value={option.id} style={{ position: 'relative' }}>
  {option.title}
  <DeleteIcon
    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'red', cursor: 'pointer' }}
    onClick={(e) => handleDeleteCategory(e, option.id)}
  />
</MenuItem>
          ))}
        </Select>
      </FormControl>
              <FormControl fullWidth
                margin="normal"
                  error={formSubmitted && !courseData.category.trim()}
  helperText={formSubmitted && !courseData.category.trim() && "Course category cannot be empty"}
              >
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
                label="Course Tag"
                name="lesson"
                value={courseData.lesson}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                 error={formSubmitted && !courseData.lesson.trim()}
  helperText={formSubmitted && !courseData.title.trim() && "Course lesson cannot be empty"}
              />
              <TextField
                label="Credit"
                name="credit"
                value={courseData.credit}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                  error={formSubmitted && !courseData.credit.trim()}
  helperText={formSubmitted && !courseData.credit.trim() && "Course credit cannot be empty"}
              />
              <TextField
                label="Days"
                name="days"
                value={courseData.days}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                 error={formSubmitted && !courseData.days.trim()}
  helperText={formSubmitted && !courseData.days.trim() && "Course days cannot be empty"}
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
            { updateLoading && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}

                Update
              </Button>
            ) : (
              <Button
                  variant="contained"
                  className='All-buttons'
                  onClick={handleSubmit}
            disabled={isLoading}
    startIcon={isLoading && <CircularProgress size={20} color="inherit" />} >
                    Add Course </Button>
            )}
          </DialogActions>
        </Dialog>




 {/* Dialog for adding category */}
        <Dialog open={isCategoryModalOpen} onClose={closeCategoryModal}>
          <DialogTitle>Add Category</DialogTitle>
          <DialogContent>
            <TextField
              label="Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAddCategory} color="primary" disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : 'Add'}
            </Button>
            <Button onClick={closeCategoryModal} color="secondary" disabled={isLoading}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>


        
        <div style={{ height: 400 }}>

      {isLoading ? (
        // Show loading spinner while data is being fetched
        <Box display="flex" justifyContent="center" marginTop="2rem">
          <CircularProgress />
        </Box>
      ) : (
        courses.length > 0 && (
          <DataGrid
            columns={[
              { field: 'title', headerName: 'Title', width: 200 },
              { field: 'category', headerName: 'Category', width: 200 },
              { field: 'program', headerName: 'Program', width: 200 },
              { field: 'lesson', headerName: 'Course Tag', width: 200 },
              {
                field: 'action',
                headerName: 'Action',
                width: 200,
                renderCell: (params) => (
                  <Button onClick={() => handleViewCourse(params.row)}>View</Button>
                ),
              },
            ]}
            rows={courses.map((course, index) => ({
              id: index,
              title: course.title,
              category: course.category,
              program: getProgramNameById(course.program),
              lesson: course.lesson,
              days: course.days,
            }))}
                        style={{ marginTop: '2rem', }}

            pageSize={10}
            rowsPerPageOptions={[10, 25, 50, 100]}
                pagination
                  components={{
          Toolbar: GridToolbar,
        }}
          />
        )
          )}
          </div>

      </Box>
    </div>
  );
}

export default Courses;
