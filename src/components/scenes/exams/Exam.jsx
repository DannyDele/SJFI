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
  const [currentExam, setCurrentExam] = useState(null); // New state to track the current exam
  const [filterProgram, setFilterProgram] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [programOptions, setProgramOptions] = useState([]);
    const [courseOptions, setCourseOptions] = useState([]);




  




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



  const [examQuestionsList, setExamQuestionsList] = useState([]);








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

  setAddDialogOpen(false);
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
};



  
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


  const handleApplyFilters = () => {
  // Filter the exams based on selected filters
  const filteredExams = examsList.filter((exam) => {
    return (
      (!filterProgram || exam.program === filterProgram) &&
      (!filterCourse || exam.course === filterCourse)
    );
  });

  // Update the state variable holding the displayed exams
  setExamsList(filteredExams);
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
  // const selectedClass = classOptions.find(className => className.id === selectedClassId);

  return {
    program: selectedProgram ? selectedProgram.title : '',
    course: selectedCourse ? selectedCourse.title : '',
    class: selectedClass ? selectedClass.title : '',
  };
};



  return (
    <div>
      <Box>
        {/* Snackbar for Success Message */}
        <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Exam Submission successful! 
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
          labelId="filter-program-label"
          id="filter-program"
          value={filterProgram}
          onChange={(e) => setFilterProgram(e.target.value)}
        >
          <MenuItem value="">All Programs</MenuItem>
          <MenuItem value="program1">Program 1</MenuItem>
          <MenuItem value="program2">Program 2</MenuItem>
        </Select>
            </FormControl>
            



            

      <FormControl fullWidth margin="normal" style={{ flex: 1, minWidth: '120px' }}>
        <InputLabel id="filter-course-label">Course</InputLabel>
        <Select
          labelId="filter-course-label"
          id="filter-course"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <MenuItem value="">All Courses</MenuItem>
          <MenuItem value="course1">Course 1</MenuItem>
          <MenuItem value="course2">Course 2</MenuItem>
        </Select>
      </FormControl>

      <Button onClick={handleApplyFilters} color="primary" variant="contained" style={{ marginLeft: '1rem' }}>
        Apply Filters
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
          <MenuItem value="class1">Class 1</MenuItem>
          <MenuItem value="class2">Class 2</MenuItem>
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSelectDialogClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleProceedToAddExam} color="primary">
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
  <Box marginTop="2rem">
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
        

</Box>

    </div>
  );
}

export default Exam;
