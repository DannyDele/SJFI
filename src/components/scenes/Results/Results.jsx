import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Checkbox
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';








// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";



// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';





function Results() {
    const [selectedFilteredExam, setSelectedFilteredExam] = useState(null);
    const [isViewFilteredExamDialogOpen, setViewFilteredExamDialogOpen] = useState(false);
     const [selectedExams, setSelectedExams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const [programOptions, setProgramOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
      const [selectedProgram, setSelectedProgram] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
      const [token, setToken] = useState('');





    

// Add a new useEffect hook to fetch teachers when the component mounts
  useEffect(() => {
    const authToken = Cookies.get('authToken');

  
    if (authToken) {
      setToken(authToken);
      console.log('Token:', authToken)
    }

}, []); // Empty dependency array ensures the effect runs only once when the component mounts
    
    
    
useEffect(() => {
  // Fetch program options when the component mounts
  fetchProgramOptions();
}, []);
  

useEffect(() => {
  // Fetch courses when the program changes
  console.log('Selected program:', selectedProgram);
  if (selectedProgram) {
    fetchCoursesForProgram();
  }
}, [selectedProgram]);
  
  
  
  

// Fetch All Programs
const fetchProgramOptions = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/programs`);
    const data = await response.json();
    const programNames = data.map(program => ({
      id: program._id,
      title: program.title
    }));
    console.log('Program Data:', programNames);
    setProgramOptions(programNames);
    console.log('Selected Program:', selectedProgram);
  } catch (error) {
    console.error('Error fetching program options:', error);
  }
};

  
  
  
  
  
// Fetch Courses for programs
const fetchCoursesForProgram = async () => {
  console.log('Fetching courses for the program...');
  try {
    const response = await fetch(`${API_ENDPOINT}/api/courses?program=${selectedProgram}`);
    const data = await response.json();
    const courseNames = data.map(course => ({
      id: course._id,
      title: course.title
    }));
    console.log('Courses related to a program:', courseNames);
    setCourseOptions(courseNames);
  } catch (error) {
    console.error('Error fetching courses for the program:', error);
  }
};



  
  
// Fetch Classes for selected program
const fetchClassesForProgram = async (programId) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/classes?program=${programId}`);
    const data = await response.json();
    const classNames = data.map(classItem => ({
      id: classItem._id,
      title: classItem.title
    }));
    console.log('Classes related to a program:', classNames);
    setClassOptions(classNames);
  } catch (error) {
    console.error('Error fetching classes for the program:', error);
  }
};

// ...

useEffect(() => {
  // Fetch classes when the program changes
  console.log('Selected program:', selectedProgram);
  if (selectedProgram) {
    fetchCoursesForProgram();
    fetchClassesForProgram(selectedProgram); // Fetch classes for the selected program
  }
}, [selectedProgram]);









  // Funtion to Filter Exams

const handleApplyFilters = async () => {
  try {
      setIsLoading(true);
      console.log('Result Token:', token)
    
    // Build the request body with selected filter values
    const requestBody = {
      program: selectedProgram,
      course: selectedCourse,
      classes: selectedClass
    };

      console.log('Request body:', requestBody)
    // Make the POST request to fetch exam questions based on filters
    const response = await fetch(`${API_ENDPOINT}/api/check-result`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,

      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      console.error('Failed to fetch exam results. Status:', response.status);
      return;
    }

    // Parse the response data
    const responseData = await response.json();
    console.log('Response Result Data', responseData);

    // // Set the filtered exams in state
    // setFilteredExams(responseData);
    // console.log('Exam Filtered Successfully!:', responseData);

    // // Set the filterButtonClicked state to true when the filter button is clicked
    // setFilterButtonClicked(true);
  } catch (error) {
    console.error('Error applying filters:', error);
  } finally {
    setIsLoading(false);
  }
};




    // Function to handle viewing the details of the selected filtered exam
const handleViewFilteredExam = (examId) => {
  // Find the selected exam by its ID from the filtered exams array
  const selectedExam = filteredExams.find(exam => exam._id === examId);

  // Check if the selected exam is defined before setting the state
  if (selectedExam) {
    // Set the state variables for the selected exam and open the dialog
    setSelectedFilteredExam(selectedExam);
    setViewFilteredExamDialogOpen(true);
  } else {
    console.error('Selected exam not found.');
  }
};

  return (
      <div>
          <Box sx={{ width: "80vw", padding: "2rem 4rem 4rem 4rem" }}>
              
              <h1 className="text-3xl font-bold text-gray-500 mb-6">View students results</h1>
              



              
    <Box display="flex" alignItems="center" width='70%'>
      <FormControl fullWidth margin="normal" style={{ marginRight: '1rem', flex: 1, minWidth: '120px' }}>
        <InputLabel id="filter-program-label">Program</InputLabel>
        <Select
           labelId="program-label"
    id="program"
    value={selectedProgram}
    label="Program"
    onChange={(e) => setSelectedProgram(e.target.value)}
  >
    {programOptions.map((program) => (
      <MenuItem key={program.id} value={program.id}>
        {program.title}
      </MenuItem>
    ))}
        </Select>
            </FormControl>
            
            

      <FormControl fullWidth margin="normal" style={{ marginRight: '1rem', flex: 1, minWidth: '120px' }}>
        <InputLabel id="filter-course-label">Course</InputLabel>
        <Select
            id="course"
    value={selectedCourse}
    label="Course"
    onChange={(e) => setSelectedCourse(e.target.value)}
  >
    {courseOptions.map((course) => (
      <MenuItem key={course.id} value={course.id}>
        {course.title}
      </MenuItem>
    ))}
        </Select>
            </FormControl>
            
    <FormControl fullWidth margin="normal" style={{ flex: 1, minWidth: '120px' }}>
  <InputLabel id="filter-class-label">Class</InputLabel>
  <Select
    labelId="filter-class-label"
    id="filter-class"
    value={selectedClass}
    onChange={(e) => setSelectedClass(e.target.value)}
  >
    {classOptions.map((classItem) => (
      <MenuItem key={classItem.id} value={classItem.id}>
        {classItem.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>


      <Button onClick={handleApplyFilters} variant="contained" className='All-buttons' style={{ marginLeft: '1rem' }}>
        
              <Box display='flex' justifyContent='center' alignItems='center'>
                {isLoading && <CircularProgress size={20} color="inherit"/>}
                Apply Filters
                </Box>
      </Button>
    </Box>

              </Box>

    </div>
  )
}

export default Results