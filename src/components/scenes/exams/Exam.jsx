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


// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';






function Exam() {
  const [isSelectDialogOpen, setSelectDialogOpen] = useState(false);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedExamIndex, setSelectedExamIndex] = useState(null);
  const [isAddMoreQuestionsMode, setAddMoreQuestionsMode] = useState(false);
  const [examsList, setExamsList] = useState([]);
  const [isviewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const [programOptions, setProgramOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
const [isTableCleared, setIsTableCleared] = useState(false);
    

  // Define state variables to hold the details of the selected filtered exam
const [selectedFilteredExam, setSelectedFilteredExam] = useState(null);
  const [isViewFilteredExamDialogOpen, setViewFilteredExamDialogOpen] = useState(false);
  // Define a state variable to track whether the filter button has been clicked
  const [filterButtonClicked, setFilterButtonClicked] = useState(false);
    const [examQuestionsList, setExamQuestionsList] = useState([]);

  
 // Updated state for examQuestion
const [examQuestion, setExamQuestion] = useState({
  question: '',
  a: '',
  b: '',
  c: '',
  d: '',
  answer: [{ option: 'a', details: '' }],
  program: '',
  course: '',
  class: ''
});








  useEffect(() => {
    // Load exams list from localStorage when component mounts
    const storedExams = localStorage.getItem('exams');
    if (storedExams) {
      setExamsList(JSON.parse(storedExams));
    }
  }, []); // Empty dependency array to run only once when component mounts



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
    const response = await fetch('https://fis.metaforeignoption.com/api/programs');
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
    const response = await fetch(`https://fis.metaforeignoption.com/api/courses?program=${selectedProgram}`);
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
    const response = await fetch(`https://fis.metaforeignoption.com/api/classes?program=${programId}`);
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






   const handleAddExam = () => {
    setSelectDialogOpen(true);
    setAddMoreQuestionsMode(false); // Reset the mode when opening the first dialog
  };

  const handleSelectDialogClose = () => {
    setSelectDialogOpen(false);
  };

 const handleProceedToAddExam = () => {
  setSelectDialogOpen(false);
  setAddDialogOpen(true);

  // Set the program, course, and class in the examQuestion state
  setExamQuestion((prevExamQuestion) => ({
    ...prevExamQuestion,
    program: selectedProgram,
    course: selectedCourse,
    class: selectedClass,
  }));
};


const handleAddDialogClose = () => {
  setAddDialogOpen(false);
  setExamQuestion((prevExamQuestion) => ({
    ...prevExamQuestion,
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    answer: [{ option: 'a', details: '' }],
  }));
};



const handleSave = () => {
  const updatedExamsList = [...examsList];

  const newExam = {
    question: examQuestion.question,
    a: examQuestion.a,
    b: examQuestion.b,
    c: examQuestion.c,
    d: examQuestion.d,
    answer: [...examQuestion.answer],
    program: selectedProgram || '',
    course: selectedCourse || '',
    class: selectedClass || '',
  };

  console.log('New Exam:', newExam);

  if (selectedExamIndex === null) {
    // If it's a new exam, add it to the list
    updatedExamsList.push({ exams: [newExam] });
    console.log('Updated Exam List:', updatedExamsList);
  } else {
    // If it's an existing exam, update the questions for that exam
    updatedExamsList[selectedExamIndex].exams.push(newExam);
  }

  setExamsList(updatedExamsList);

  
  // Save the updated exams list to localStorage
  localStorage.setItem('exams', JSON.stringify(updatedExamsList));

  setAddDialogOpen(false);

    // Clear the form fields by resetting the state

  setExamQuestion({
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    answer: [{ option: 'a', details: '' }],
    program: '',
    course: '',
    class: '',
  });

  //  setSelectedProgram('');
  // setSelectedCourse('');
  // setSelectedClass('');

  // Clear the filtered exam table
  setFilteredExams([]);
  
  // Clear the table and set the state to show the message
  setIsTableCleared(true);
};



  // Function to Add  Exam

 const handleSubmit = async () => {
   try {
        setIsLoading(true);

    // Check if there are exams to submit
    if (examsList.length === 0) {
      console.log('No exams to submit.');
      return;
    }

    // Extracting all questions from examsList
    const allExams = examsList.reduce((exams, exam) => {
      return exams.concat(exam.exams);
    }, []);

    // Creating the payload for the API
    const payload = {
      exams: allExams,
    };

    // Making the API request
    const response = await fetch('https://fis.metaforeignoption.com/api/tests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
      },
      body: JSON.stringify(payload),
    });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      console.log('Exams submitted successfully!');
      // Clear the table by setting examsList to an empty array
      setExamsList([]);


// Clear localStorage
      localStorage.removeItem('exams');

      
    // Show the success message
      setSuccessMessageVisible(true);
       // Optionally, hide the success message after a certain duration
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 5000); // Hide the message after 5 seconds (adjust the duration as needed)
  
      
    } else {
      console.error('Failed to submit exams. Status:', response.status);
      // Handle the error as needed
    }
  } catch (error) {
    console.error('Error submitting exams:', error);
    // Handle the error as needed
  }finally {
    // Set loading back to false after the submission is complete (success or failure)
    setIsLoading(false);
  }
};


  // Function to Delete Exam
const handleDeleteExam = async (examId, index) => {
  try {
    setIsLoadingDelete(index);

    const response = await fetch(`https://fis.metaforeignoption.com/api/tests/${examId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      // Add any body if required
    });

    if (response.ok) {
      // Remove the exam from the filtered exams state
      const updatedFilteredExams = filteredExams.filter(exam => exam.id !== examId);
      setFilteredExams(updatedFilteredExams);

      // Handle success
      console.log('Exam deleted successfully');
      setDeleteMessageVisible(true)
    } else {
      // Handle error
      console.error('Failed to delete exam:', response.status);
    }
  } catch (error) {
    // Handle network error
    console.error('Network error:', error);
  } finally {
    setIsLoadingDelete(false);
  }
};

  
  
  

// Function to view Exams

const handleViewExam = (examIndex) => {
  setSelectedExamIndex(examIndex);

  // Retrieve the selected exam from examsList
  const selectedExam = examsList[examIndex]?.exams[0];

  // Check if the selected exam is defined before setting the state
  if (selectedExam) {
    // Set the examQuestion state with the details of the selected exam
    setExamQuestion({
      question: selectedExam.question || '',
      a: selectedExam.a || '',
      b: selectedExam.b || '',
      c: selectedExam.c || '',
      d: selectedExam.d || '',
      answer: {
        option: selectedExam.answer[0]?.option || '', 
        details: selectedExam.answer[0]?.details || '', 
      },
      program: selectedExam.program || '',
      course: selectedExam.course || '',
      class: selectedExam.class || '',
    });
  }

  setViewDialogOpen(true);
};




const isViewDialogClose = () => {
  setViewDialogOpen(false);
};




  



   const handleAddMoreQuestions = () => {
    setAddDialogOpen(true);
    setAddMoreQuestionsMode(true); // Set the mode when opening the second dialog
  };

    const handleAddNewTable = () => {
    setExamsList([...examsList, { questions: [] }]);
  };
  

  // Funtion to Filter Exams

const handleApplyFilters = async () => {
  try {
    setIsLoading(true);
    // Build the API endpoint with selected filter values
    const endpoint = `https://fis.metaforeignoption.com/api/tests?program=${selectedProgram}&course=${selectedCourse}&classes=${selectedClass}`;

    // Make the API request to fetch exam questions based on filters
    const response = await fetch(endpoint);
    if (!response.ok) {
      console.error('Failed to fetch exam questions. Status:', response.status);
      return;
    }

    // Parse the response data
    const responseData = await response.json();
    console.log('Response Exam Data', responseData);

     // Extract IDs from the responseData and store them in an array
    const examsWithIds = responseData.map(exam => ({ ...exam, id: exam._id }));

    // Save the filtered exam data and IDs in state variables
    setFilteredExams(examsWithIds);

    
console.log('Exam Filtered Successfully!:', examsWithIds);
    console.log(`Program =  ${selectedProgram}, Course = ${selectedCourse}, Class = ${selectedClass}`);


    // Set the filterButtonClicked state to true when the filter button is clicked
    setFilterButtonClicked(true);

  } catch (error) {
    console.error('Error applying filters:', error);
    setIsLoading(false);

    // Handle the error as needed
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


// Function to close the dialog/modal displaying the details of the selected filtered exam
const handleCloseViewFilteredExamDialog = () => {
  setViewFilteredExamDialogOpen(false);
};
  
  
  //  Function to clear Filterd Exam Table
  const handleClearTable = () => {
  setIsTableCleared(true);
};

  // Funtion to remove exam question from table after save
  const handleRemoveExam = (examIndex) => {
    // Filter out the exam at the specified index
    const updatedExamsList = examsList.filter((exam, index) => index !== examIndex);
  
    // Update the state with the updated exams list
    setExamsList(updatedExamsList);

    // Update the local storage by removing the exam at the specified index
  const updatedLocalStorageExams = JSON.parse(localStorage.getItem('exams')).filter((exam, index) => index !== examIndex);
  localStorage.setItem('exams', JSON.stringify(updatedLocalStorageExams));
  };
  

  
  // Check box Function
  const handleCheckboxChange = (examIndex) => {
  if (selectedExams.includes(examIndex)) {
    // If the exam is already selected, remove it from the list
    setSelectedExams((prevSelectedExams) =>
      prevSelectedExams.filter((index) => index !== examIndex)
    );
  } else {
    // If the exam is not selected, add it to the list
    setSelectedExams((prevSelectedExams) => [...prevSelectedExams, examIndex]);
  }
};

  
  // Helper function to get Program, Course and Class by thier names

  const getNamesByIds = (selectedProgramId, selectedCourseId, selectedClassId) => {
  const selectedProgram = programOptions.find(program => program.id === selectedProgramId);
  const selectedCourse = courseOptions.find(course => course.id === selectedCourseId);
  // Assuming you have a similar array for classes
  const selectedClass = classOptions.find(className => className.id === selectedClassId);

  return {
    program: selectedProgram ? selectedProgram.title : '',
    course: selectedCourse ? selectedCourse.title : '',
    class: selectedClass ? selectedClass.title : '',
  };
};



  return (
    <div>

      <Box sx={{ width: "80vw" }}>
        <Typography style={{marginLeft: '3rem',}} variant="h4" className="mb-4 font-bold text-gray-500">Exams</Typography>

        {/* Snackbar for Success Message */}
        <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Exam Submitted successfully! 
          </Alert>

        {/* Snackbar for Delete Message */}
        </Snackbar>
        {/* Snackbar for Success Message */}
        <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setDeleteMessageVisible(false)} severity="success">
            Exam Deleted successfully! 
          </Alert>
        </Snackbar>

        
  <Box display="flex" alignItems="center" justifyContent="space-between">
    <Box marginTop='1rem' padding='2rem' width='30%'>
      <Button onClick={handleAddExam} color="primary">
        Add Exam Question
      </Button>
    </Box>

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


      <Button onClick={handleApplyFilters} color="primary" variant="contained" style={{ marginLeft: '1rem' }}>
        
              <Box display='flex' justifyContent='center' alignItems='center'>
                {isLoading && <CircularProgress size={20} color="inherit"/>}
                Apply Filters
                </Box>
      </Button>
    </Box>
  </Box>

  {/* First Dialog for selecting program, course, and class */}
  <Dialog open={isSelectDialogOpen} onClose={handleSelectDialogClose} fullWidth maxWidth="sm">
    <DialogTitle>Select Program, Course, and Class</DialogTitle>
    <DialogContent>
    <FormControl fullWidth margin="normal">
  <InputLabel id="program-label">Program</InputLabel>
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

     <FormControl fullWidth margin="normal">
  <InputLabel id="course-label">Course</InputLabel>
  <Select
    labelId="course-label"
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


    <FormControl fullWidth margin="normal">
  <InputLabel id="class-label">Class</InputLabel>
  <Select
    labelId="class-label"
    id="class"
    value={selectedClass}
    label="Class"
    onChange={(e) => setSelectedClass(e.target.value)}
  >
    {classOptions.map((classItem) => (
      <MenuItem key={classItem.id} value={classItem.id}>
        {classItem.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>

    </DialogContent>
    <DialogActions>
      <Button onClick={handleSelectDialogClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleProceedToAddExam} color="primary"  disabled={!selectedProgram || !selectedCourse || !selectedClass}
>
        Proceed to Add Exam
      </Button>
    </DialogActions>
  </Dialog>

  {/* Second Dialog for adding exam questions */}
  <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose} fullWidth maxWidth="sm">
    <DialogTitle>Add Exam Question</DialogTitle>
    <DialogContent>
      <TextField
        label="Question"
        fullWidth
        margin="normal"
        value={examQuestion.question}
        onChange={(e) => setExamQuestion({ ...examQuestion, question: e.target.value })}
      />

      <TextField
        label="Option A"
        fullWidth
        margin="normal"
        value={examQuestion.a}
        onChange={(e) => setExamQuestion({ ...examQuestion, a: e.target.value })}
      />

      <TextField
        label="Option B"
        fullWidth
        margin="normal"
        value={examQuestion.b}
        onChange={(e) => setExamQuestion({ ...examQuestion, b: e.target.value })}
      />

      <TextField
        label="Option C"
        fullWidth
        margin="normal"
        value={examQuestion.c}
        onChange={(e) => setExamQuestion({ ...examQuestion, c: e.target.value })}
      />

      <TextField
        label="Option D"
        fullWidth
        margin="normal"
        value={examQuestion.d}
        onChange={(e) => setExamQuestion({ ...examQuestion, d: e.target.value })}
      />

     <FormControl fullWidth margin="normal">
  <InputLabel id="answer-label">Answer (a, b, c, d)</InputLabel>
  <Select
    labelId="answer-label"
    id="answer"
    value={examQuestion.answer && examQuestion.answer[0]?.option || ''}
    onChange={(e) => setExamQuestion({ ...examQuestion, answer: [{ ...examQuestion.answer[0], option: e.target.value }] })}
  >
    <MenuItem value="a">Option A</MenuItem>
    <MenuItem value="b">Option B</MenuItem>
    <MenuItem value="c">Option C</MenuItem>
    <MenuItem value="d">Option D</MenuItem>
  </Select>
</FormControl>


      <TextField
        label="Answer Details"
        fullWidth
        margin="normal"
    value={examQuestion.answer && examQuestion.answer[0]?.details || ''}
        onChange={(e) => setExamQuestion({ ...examQuestion, answer: [{ ...examQuestion.answer[0], details: e.target.value }] })}
      />
    </DialogContent>
    <DialogActions>
      {isAddMoreQuestionsMode ? (
        <Button color="primary">
          Add Exam
        </Button>
      ) : (
        <>
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save Question
          </Button>
        </>
      )}
    </DialogActions>
  </Dialog>

  {/* Table to display saved exam questions */}
  {examsList.length > 0 && (
          <Box marginTop="2rem" style={{ marginLeft: '6rem' }}>
              <Typography variant="h5" gutterBottom>
      Exam Questions.
    </Typography>
    <Typography variant="h5" gutterBottom>
      {getNamesByIds(selectedProgram, selectedCourse, selectedClass).program}, {getNamesByIds(selectedProgram, selectedCourse, selectedClass).course}, {getNamesByIds(selectedProgram, selectedCourse, selectedClass).class}
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {examsList.map((exam, examIndex) => (
            <TableRow key={examIndex}>
              <TableCell>
                <Checkbox
                  checked={selectedExams.includes(examIndex)}
                  onChange={() => handleCheckboxChange(examIndex)}
                />
              </TableCell>
              <TableCell>{examIndex + 1}</TableCell>
              <TableCell>{exam.exams[0].question}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleViewExam(examIndex)}>
                  View
                </Button>
              </TableCell>

              
              <TableCell>
    <Button style={{color:'red'}}  onClick={() => handleRemoveExam(examIndex)}>
      remove
    </Button>
  </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    

    {/* Submit Button */}
    <Box marginTop="1rem" textAlign="right">
               <Button
    color="primary"
    onClick={handleSubmit}
    disabled={isLoading}
    style={{ backgroundColor: '#1976D2', color: '#ffffff' }}
    startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
  >
    Submit
  </Button>
    </Box>
  </Box>
        )}
        


{/* // Assuming filteredExamList holds the filtered exam data */}
        {!isTableCleared && filteredExams.length > 0 ? (
          
          <Box marginTop="2rem" style={{ marginLeft: '6rem' }}>
            <Box marginTop="2rem" style={{ marginLeft: '6rem' }}>
  <Button onClick={handleClearTable} color="primary" variant="outlined">
    Clear Table
  </Button>
</Box>
    <Typography variant="h5" gutterBottom>
      Filtered Exam Questions
    </Typography>
    <Typography variant="h5" gutterBottom>
      {getNamesByIds(selectedProgram, selectedCourse, selectedClass).program}, {getNamesByIds(selectedProgram, selectedCourse, selectedClass).course}, {getNamesByIds(selectedProgram, selectedCourse, selectedClass).class}
    </Typography>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Number</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {filteredExams.map((exam, index) => (
    <TableRow key={exam.id}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{exam.question}</TableCell>
      <TableCell>
        <Button color="primary" onClick={() => handleViewFilteredExam(exam.id)}> {/* Pass exam ID to handleViewFilteredExam */}
          View
        </Button>
      </TableCell>

      <TableCell>
      <Button
  style={{ color: 'red' }}
  onClick={() => handleDeleteExam(exam.id, index)} // Pass index to handleDeleteExam
>
  {isLoadingDelete === index ? (
    <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />
  ) : (
    "Delete"
  )}
</Button>

      </TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>
  </Box>
) : (
  filterButtonClicked && (
    <Box marginTop="2rem" style={{ marginLeft: '6rem' }}>
      <Typography variant="h5" gutterBottom>
        No exam for this program: {getNamesByIds(selectedProgram, selectedCourse, selectedClass).program}
      </Typography>
    </Box>
  )
        )
        
        }




  <Dialog open={isviewDialogOpen} onClose={isViewDialogClose} fullWidth maxWidth="sm">
<DialogTitle>{`View Exam Question - ${getNamesByIds(
    examsList[selectedExamIndex]?.exams[0]?.program,
    examsList[selectedExamIndex]?.exams[0]?.course,
    examsList[selectedExamIndex]?.exams[0]?.class
  ).program} | ${getNamesByIds(
    examsList[selectedExamIndex]?.exams[0]?.program,
    examsList[selectedExamIndex]?.exams[0]?.course,
    examsList[selectedExamIndex]?.exams[0]?.class
  ).course} | ${getNamesByIds(
    examsList[selectedExamIndex]?.exams[0]?.program,
    examsList[selectedExamIndex]?.exams[0]?.course,
    examsList[selectedExamIndex]?.exams[0]?.class
  ).class}`}</DialogTitle>    <DialogContent>
      <TextField
        label="Question"
        fullWidth
        margin="normal"
        value={examsList[selectedExamIndex]?.exams[0]?.question}
        onChange={(e) => setExamQuestion({ ...examQuestion, question: e.target.value })}
      />

      <TextField
        label="Option A"
        fullWidth
        margin="normal"
        value={examsList[selectedExamIndex]?.exams[0]?.a}
        onChange={(e) => setExamQuestion({ ...examQuestion, a: e.target.value })}
      />

      <TextField
        label="Option B"
        fullWidth
        margin="normal"
        value={examsList[selectedExamIndex]?.exams[0]?.b}
        onChange={(e) => setExamQuestion({ ...examQuestion, b: e.target.value })}
      />

      <TextField
        label="Option C"
        fullWidth
        margin="normal"
        value={examsList[selectedExamIndex]?.exams[0]?.c}
        onChange={(e) => setExamQuestion({ ...examQuestion, c: e.target.value })}
      />

      <TextField
        label="Option D"
        fullWidth
        margin="normal"
        value={examsList[selectedExamIndex]?.exams[0]?.d}
        onChange={(e) => setExamQuestion({ ...examQuestion, d: e.target.value })}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel id="answer-label">Answer (a, b, c, d)</InputLabel>
        <Select
          labelId="answer-label"
          id="answer"
          value={examsList[selectedExamIndex]?.exams[0]?.answer[0].option}
          onChange={(e) => setExamQuestion({ ...examQuestion, answer: [{ ...examQuestion.answer[0], option: e.target.value }] })}
        >
          <MenuItem value="a">Option A</MenuItem>
          <MenuItem value="b">Option B</MenuItem>
          <MenuItem value="c">Option C</MenuItem>
          <MenuItem value="d">Option D</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Answer Details"
        fullWidth
        margin="normal"
        value={examsList[selectedExamIndex]?.exams[0]?.answer[0].details}
        onChange={(e) => setExamQuestion({ ...examQuestion, answer: [{ ...examQuestion.answer[0], details: e.target.value }] })}
      />
    </DialogContent>
    <DialogActions>
      {/* Add any actions or buttons you need */}
    </DialogActions>
        </Dialog>


{/* Dialog For Filtered Exams */}

<Dialog open={isViewFilteredExamDialogOpen} onClose={handleCloseViewFilteredExamDialog} fullWidth maxWidth="sm">
  <DialogTitle>View Exam Details</DialogTitle>
  <DialogContent>
    {selectedFilteredExam && (
      <form>
        <TextField
          label="Question"
          fullWidth
          margin="normal"
          value={selectedFilteredExam.question}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Option A"
          fullWidth
          margin="normal"
          value={selectedFilteredExam.a}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Option B"
          fullWidth
          margin="normal"
          value={selectedFilteredExam.b}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Option C"
          fullWidth
          margin="normal"
          value={selectedFilteredExam.c}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Option D"
          fullWidth
          margin="normal"
          value={selectedFilteredExam.d}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Answer"
          fullWidth
          margin="normal"
          value={selectedFilteredExam.answer && selectedFilteredExam.answer[0]?.option}
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Answer Details"
          fullWidth
          margin="normal"
          value={selectedFilteredExam.answer && selectedFilteredExam.answer[0]?.details}
          InputProps={{
            readOnly: true,
          }}
        />
      </form>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseViewFilteredExamDialog} color="primary">
      Close
    </Button>
  </DialogActions>
</Dialog>




        

</Box>

    </div>
  );
}

export default Exam;
