import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Exam() {
  const [openSelect, setOpenSelect] = useState(false);
  const [openAddQuestions, setOpenAddQuestions] = useState(false);
  const [openMoreQuestions, setOpenMoreQuestions] = useState(false);
  const [currentTableIndex, setCurrentTableIndex] = useState(null);
  
  const [formData, setFormData] = useState({
    questions: [
      {
        question: '',
        answers: [''],
      },
    ],
    selectedClass: '',
    selectedCourse: '',
    selectedProgram: '',
  });

  const [examQuestions, setExamQuestions] = useState([]);

  const handleSelectOpen = () => {
    setOpenSelect(true);
  };

  const handleSelectClose = () => {
    setOpenSelect(false);
    // Reset the form data
    setFormData({
      questions: [
        {
          question: '',
          answers: [''],
        },
      ],
      selectedClass: '',
      selectedCourse: '',
      selectedProgram: '',
    });
  };

  const handleAddQuestionsOpen = () => {
    setOpenAddQuestions(true);
  };

  const handleAddQuestionsClose = () => {
    setOpenAddQuestions(false);
    // Reset the form data
    setFormData({
      questions: [
        {
          question: '',
          answers: [''],
        },
      ],
      selectedClass: '',
      selectedCourse: '',
      selectedProgram: '',
    });
  };

const handleFormChange = (event) => {
  const { name, value } = event.target;

  if (name === "question") {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [
        {
          ...prevFormData.questions[0],
          [name]: value,
        },
      ],
    }));
  } else if (name.startsWith("answer")) {
    const answerIndex = parseInt(name.replace("answer", ""), 10);
    setFormData((prevFormData) => {
      const updatedQuestions = [...prevFormData.questions];
      updatedQuestions[0].answers[answerIndex] = value;

      return {
        ...prevFormData,
        questions: updatedQuestions,
      };
    });
  } else {
    setFormData({
      ...formData,
      [name]: value,
    });
  }
};



const handleAddAnswer = () => {
  setFormData({
    ...formData,
    questions: [
      {
        ...formData.questions[0],
        answers: [...formData.questions[0].answers, ''],
      },
    ],
  });
};


const handleAnswerChange = (answerIndex, value, isEditing) => {
  if (isEditing) {
    // Update the temporary edited values
    setEditedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[answerIndex] = value;
      return updatedAnswers;
    });
  } else {
    // Update the original form data
    const updatedQuestions = [...examQuestions];
    updatedQuestions[viewQuestionIndex.tableIndex].questions[viewQuestionIndex.questionIndex].answers[answerIndex] = value;

    setExamQuestions(updatedQuestions);
  }
};



  const handleFormSubmit = () => {
    // Handle the submission logic (e.g., sending data to the server)
    console.log('Form Data:', formData);
    console.log('Form Data:', examQuestions);

    const newQuestion = {
      question: formData.questions[0].question,
      answers: [...formData.questions[0].answers],
    };

    // If the table doesn't exist, create a new table with the question
    setExamQuestions((prevExamQuestions) => [
      ...prevExamQuestions,
      {
        selectedClass: formData.selectedClass,
        selectedCourse: formData.selectedCourse,
        selectedProgram: formData.selectedProgram,
        numQuestions: 1,
        questions: [newQuestion],
      },
    ]);

    // Reset the form data
    setFormData({
      questions: [
        {
          question: '',
          answers: [''],
        },
      ],
      selectedClass: '',
      selectedCourse: '',
      selectedProgram: '',
    });

    // Close the popup
    setOpenAddQuestions(false);
    setOpenSelect(false)
  };

const handleMoreQuestionsOpen = (index) => {
  if (examQuestions && examQuestions.length > index && examQuestions[index]) {
    setCurrentTableIndex(index);

    setMoreQuestionsFormData({
      ...moreQuestionsFormData,
      selectedProgram: examQuestions[index].selectedProgram || '',
      selectedClass: examQuestions[index].selectedClass || '',
      selectedCourse: examQuestions[index].selectedCourse || '',
    });

    // Open the "Add More Questions" dialog
    setOpenMoreQuestions(true);
  } else {
    console.error("Invalid index or examQuestions array.");
  }
};








  const handleMoreQuestionsClose = () => {
    setOpenMoreQuestions(false);
  };

  // State to manage the input fields in the "Add More Questions" dialog
 const [moreQuestionsFormData, setMoreQuestionsFormData] = useState({
  question: '',
  answers: [''],
});


  // Handler to add more answers in the "Add More Questions" dialog
  const handleMoreQuestionsAddAnswer = () => {
    setMoreQuestionsFormData((prevData) => ({
      ...prevData,
      answers: [...prevData.answers, ''],
    }));
  };

  // Handler to submit the "Add More Questions" form
const handleMoreQuestionsSubmit = () => {
  if (currentTableIndex !== null) {
    const updatedExamQuestions = [...examQuestions];
    const newQuestion = {
      question: moreQuestionsFormData.question,
      answers: [...moreQuestionsFormData.answers],
    };

    updatedExamQuestions[currentTableIndex].numQuestions += 1;
    updatedExamQuestions[currentTableIndex].questions.push(newQuestion);

    setExamQuestions(updatedExamQuestions);
  }

  // Reset the form data and close the dialog
  setMoreQuestionsFormData({
    question: '',
    answers: [''],
  });

  setCurrentTableIndex(null);
  setOpenMoreQuestions(false);
};








  const [openViewQuestion, setOpenViewQuestion] = useState(false);
  const [viewQuestionIndex, setViewQuestionIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
const [editedAnswers, setEditedAnswers] = useState(['']);

const handleViewQuestionOpen = (tableIndex, questionIndex) => {
  setViewQuestionIndex({ tableIndex, questionIndex });

  const currentQuestion = examQuestions[tableIndex].questions[questionIndex];
  setEditedQuestion(currentQuestion.question);
  setEditedAnswers([...currentQuestion.answers]);

  // Open the "View" modal
  setOpenViewQuestion(true);
};



const handleViewQuestionClose = () => {
  setOpenViewQuestion(false);
  setViewQuestionIndex(null);
};

  
  const handleSaveEdits = () => {
    // Update the original data with the edited values
    const updatedQuestions = [...examQuestions];
    updatedQuestions[viewQuestionIndex.tableIndex].questions[viewQuestionIndex.questionIndex].question = editedQuestion;
    updatedQuestions[viewQuestionIndex.tableIndex].questions[viewQuestionIndex.questionIndex].answers = [...editedAnswers];

    setExamQuestions(updatedQuestions);

    // Close the modal
    setOpenViewQuestion(false);
    setViewQuestionIndex(null);
  };



  return (
   <div>
  <Box marginTop='1rem' padding='2rem' width='80vw' height='100vh'>
    <Typography variant="h5">Exam</Typography>

    <Box>
      <Button style={{ border: '1px solid #1976D2' }} onClick={handleSelectOpen}>
        Add Exam Questions
      </Button>
    </Box>

    {/* Display the Exam Questions Tables */}
{examQuestions.map((question, index) => (
  <div key={index}>
    <TableContainer component={Box} marginTop="1rem">
      <Typography variant="h6">{` Program: ${question.selectedProgram}  - Class: ${question.selectedClass} - Course: ${question.selectedCourse}`}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial Number</TableCell>
            <TableCell>Question</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        {/* Display questions in the table body */}
    <TableBody>
      {question.questions.map((q, qIndex) => (
        <TableRow key={qIndex}>
          <TableCell>{qIndex + 1}</TableCell>
          <TableCell>{q.question}</TableCell>
          <TableCell>
           <Button onClick={() => handleViewQuestionOpen(index, qIndex)}>
                View
          </Button>

          </TableCell>
        </TableRow>
      ))}
    </TableBody>

      </Table>

      {/* Add More Questions Button */}
    <Button onClick={() => handleMoreQuestionsOpen(index)}>
        Add More Questions
      </Button>
    </TableContainer>
  </div>
))}



    {/* Select Class and Course Dialog */}
    <Dialog open={openSelect} onClose={handleSelectClose}>
      <DialogTitle>Select Class and Course</DialogTitle>
      <DialogContent>
        <form>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Program</InputLabel>
            <Select
              name="selectedProgram"
              value={formData.selectedProgram}
              onChange={handleFormChange}
            >
              <MenuItem value="ProgramA">Program A</MenuItem>
              <MenuItem value="ProgramB">Program B</MenuItem>
              {/* Add more class options as needed */}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Class</InputLabel>
            <Select
              name="selectedClass"
              value={formData.selectedClass}
              onChange={handleFormChange}
            >
              <MenuItem value="ClassA">Class A</MenuItem>
              <MenuItem value="ClassB">Class B</MenuItem>
              {/* Add more class options as needed */}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Course</InputLabel>
            <Select
              name="selectedCourse"
              value={formData.selectedCourse}
              onChange={handleFormChange}
            >
              <MenuItem value="Course1">Course 1</MenuItem>
              <MenuItem value="Course2">Course 2</MenuItem>
              {/* Add more course options as needed */}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestionsOpen}
          >
            Proceed to Add Questions
          </Button>
        </form>
      </DialogContent>
    </Dialog>

    {/* Add Exam Questions Dialog */}
    <Dialog open={openAddQuestions} onClose={handleAddQuestionsClose}>
      <DialogTitle>Add Exam Questions</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Question"
            name="question"
            value={formData.questions[0].question}
            onChange={handleFormChange}
            fullWidth
            margin="normal"
          />

        {formData.questions[0].answers.map((answer, index) => (
  <TextField
    key={index}
    label={`Answer ${index + 1}`}
    value={answer}
    onChange={(e) => handleFormChange(e)}
    name={`answer${index}`}
    fullWidth
    margin="normal"
  />
))}

          <Button variant="outlined" onClick={handleAddAnswer}>
            Add More Answers
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFormSubmit} color="primary">
          Add Exam Question
        </Button>
      </DialogActions>
    </Dialog>

    {/* Add More Questions Dialog */}
    <Dialog open={openMoreQuestions} onClose={handleMoreQuestionsClose}>
<DialogTitle>{`Add More Exam Questions - Program: ${moreQuestionsFormData.selectedProgram} - Class: ${moreQuestionsFormData.selectedClass} - Course: ${moreQuestionsFormData.selectedCourse}`}</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Question"
            name="question"
            value={moreQuestionsFormData.question}
            onChange={(e) => setMoreQuestionsFormData({ ...moreQuestionsFormData, question: e.target.value })}
            fullWidth
            margin="normal"
          />

          {moreQuestionsFormData.answers.map((answer, index) => (
            <TextField
              key={index}
              label={`Answer ${index + 1}`}
              value={answer}
              onChange={(e) => {
                const updatedAnswers = [...moreQuestionsFormData.answers];
                updatedAnswers[index] = e.target.value;
                setMoreQuestionsFormData({ ...moreQuestionsFormData, answers: updatedAnswers });
              }}
              fullWidth
              margin="normal"
            />
          ))}

          <Button variant="outlined" onClick={handleMoreQuestionsAddAnswer}>
            Add More Answers
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleMoreQuestionsSubmit} color="primary">
          Add Questions
        </Button>
        <Button onClick={handleMoreQuestionsClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>

        
    {/* View Exam Questions Dialog */}


      <Dialog open={openViewQuestion} onClose={handleViewQuestionClose}>
  <DialogTitle>Edit Question</DialogTitle>
  <DialogContent>
    {viewQuestionIndex !== null && (
  <form>
    <TextField
      label="Question"
      name="question"
      value={editedQuestion}
      onChange={(e) => setEditedQuestion(e.target.value)}
      fullWidth
      margin="normal"
    />

   {editedAnswers.map((answer, answerIndex) => (
  <TextField
    key={answerIndex}
    label={`Answer ${answerIndex + 1}`}
    value={answer}
    onChange={(e) => handleAnswerChange(answerIndex, e.target.value, true)}
    fullWidth
    margin="normal"
  />
))}

  </form>
)}

  </DialogContent>
  <DialogActions>
    <Button onClick={handleViewQuestionClose} color="primary">
      Close
    </Button>
    <Button onClick={handleSaveEdits} color="primary">
      Save Edits
    </Button>
  </DialogActions>
</Dialog>


  </Box>

</div>
  );
}

export default Exam;


 