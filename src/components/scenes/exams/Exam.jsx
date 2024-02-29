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
  
  const [formData, setFormData] = useState([{
    tableIndex: null,

    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    answer: [{ option: 'a', details: '' }],
    program: '',
    course: '',
    class: '',
  }]);

  const [examQuestions, setExamQuestions] = useState([]);

  const handleSelectOpen = () => {
    setOpenSelect(true);
  };

  const handleSelectClose = () => {
    setOpenSelect(false);
    setFormData([{
      question: '',
      a: '',
      b: '',
      c: '',
      d: '',
      answer: [{ option: 'a', details: '' }],
      program: '',
      course: '',
      class: '',
    }]);
  };

  const handleAddQuestionsOpen = () => {
    setOpenAddQuestions(true);
  };

  const handleAddQuestionsClose = () => {
    setOpenAddQuestions(false);
    setFormData([{
      question: '',
      a: '',
      b: '',
      c: '',
      d: '',
      answer: [{ option: 'a', details: '' }],
      program: '',
      course: '',
      class: '',
    }]);
  };

const handleFormChange = (event) => {
  const { name, value } = event.target;

  setFormData((prevFormData) => {
    if (!Array.isArray(prevFormData)) {
      // If prevFormData is not an array, initialize it as an array
      return [{ [name]: value, program: prevFormData.program, course: prevFormData.course, class: prevFormData.class }];
    }

    // If prevFormData is an array, update the first element
    return [{ ...prevFormData[0], [name]: value }];
  });
};



  const handleFormSubmit = () => {
    console.log('Form Data:', formData);

 const newQuestion = {
  question: formData[0].question,
  a: formData[0].a,
  b: formData[0].b,
  c: formData[0].c,
  d: formData[0].d,
  answer: formData[0].answer,
  program: formData[0].program,
  course: formData[0].course,
  class: formData[0].class,
};


    setExamQuestions((prevExamQuestions) => [...prevExamQuestions, newQuestion]);

    setFormData([{
      question: '',
      a: '',
      b: '',
      c: '',
      d: '',
      answer: [{ option: 'a', details: '' }],
      program: '',
      course: '',
      class: '',
    }]);

    setOpenAddQuestions(false);
    setOpenSelect(false);
  };

const handleMoreQuestionsOpen = (tableIndex) => {
  if (examQuestions && examQuestions.length > tableIndex && examQuestions[tableIndex]) {
    const { program, course, class: classValue } = examQuestions[tableIndex];

    setFormData({
      tableIndex,
      question: '', // Reset the question for a new one
      a: '',
      b: '',
      c: '',
      d: '',
      answer: [{ option: 'a', details: '' }],
      program: program || '',
      course: course || '',
      class: classValue || '',
    });

    setOpenMoreQuestions(true);
  } else {
    console.error('Invalid tableIndex or examQuestions array.');
  }
};




  const handleMoreQuestionsClose = () => {
    setOpenMoreQuestions(false);
  };

const handleMoreQuestionsSubmit = () => {
  if (currentTableIndex !== null) {
    setExamQuestions((prevExamQuestions) => {
      const updatedExamQuestions = [...prevExamQuestions];
      updatedExamQuestions[currentTableIndex] = {
        ...updatedExamQuestions[currentTableIndex],
        ...formData[0],
      };
      return updatedExamQuestions;
    });
  } else {
    // Append the new question to examQuestions
    setExamQuestions((prevExamQuestions) => [
      ...prevExamQuestions,
      {
        question: formData[0].question,
        a: formData[0].a,
        b: formData[0].b,
        c: formData[0].c,
        d: formData[0].d,
        answer: formData[0].answer,
        program: formData[0].program,
        course: formData[0].course,
        class: formData[0].class,
      },
    ]);
  }

  // Reset only the necessary form fields
  setFormData({
    tableIndex: null,
    question: '',
    a: '',
    b: '',
    c: '',
    d: '',
    answer: [{ option: 'a', details: '' }],
    program: '', // Add any other fields you want to reset
    course: '',
    class: '',
  });

  setOpenMoreQuestions(false);
};


 
  // Function for Answer and Details Fields (FormData)
const handleAnswerChange = (value) => {
  setFormData((prevFormData) => {
    const updatedOptions = prevFormData.map((item, index) => {
      if (index === 0 && item.answer) {
        return {
          ...item,
          answer: item.answer.length > 0
            ? [{ ...item.answer[0], option: value.charAt(0) }]
            : [{ option: value.charAt(0), details: '' }],
        };
      }
      return item;
    });

    return updatedOptions;  // Remove the array wrapping
  });
};



const handleDetailsChange = (value) => {
  setFormData((prevFormData) => {
    const updatedOptions = prevFormData.map((item, index) => {
      if (index === 0 && item.answer) {
        return {
          ...item,
          answer: item.answer.length > 0
            ? [{ ...item.answer[0], details: value }]
            : [{ option: 'a', details: value }],
        };
      }
      return item;
    });

    return updatedOptions;  // Remove the array wrapping
  });
  };





  const [openViewQuestion, setOpenViewQuestion] = useState(false);
  const [viewQuestionIndex, setViewQuestionIndex] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedOptions, setEditedOptions] = useState(['']);

// Update the handleViewQuestionOpen function
const handleViewQuestionOpen = (tableIndex, questionIndex) => {
  setViewQuestionIndex({ tableIndex, questionIndex });

  const currentQuestion = examQuestions[tableIndex];
  setEditedQuestion(currentQuestion.question);

  // Assuming your answer array is always present and has options 'a', 'b', 'c', 'd'
  const options = ['a', 'b', 'c', 'd'];
  const editedOptions = options.map((option) => ({
    option,
    details: currentQuestion[option],
  }));
  setEditedOptions(editedOptions);

  setOpenViewQuestion(true);
};

  const handleViewQuestionClose = () => {
    setOpenViewQuestion(false);
    setViewQuestionIndex(null);
  };

  const handleSaveEdits = () => {
    const updatedQuestions = [...examQuestions];
    updatedQuestions[viewQuestionIndex.tableIndex].answer = [...editedOptions];

    setExamQuestions(updatedQuestions);

    setOpenViewQuestion(false);
    setViewQuestionIndex(null);
  };



   console.log('Exam Questions:', examQuestions);
  console.log('Current Table Index:', currentTableIndex);
  console.log('Form Data:', formData);
  console.log('View Question Index:', viewQuestionIndex);
  console.log('Edited Question:', editedQuestion);
  console.log('Edited Options:', editedOptions);



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
{examQuestions.map((examQuestion, tableIndex) => (
  <div key={tableIndex}>
    <TableContainer component={Box} marginTop="1rem">
      <Typography variant="h6">{`Program: ${examQuestion.program} - Class: ${examQuestion.class} - Course: ${examQuestion.course}`}</Typography>
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
          <TableRow key={tableIndex}>
            <TableCell>{ tableIndex + 1}</TableCell>
            <TableCell>{examQuestion.question}</TableCell>
            <TableCell>
              <Button onClick={() => handleViewQuestionOpen(tableIndex)}>
                View
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* Add More Questions Button */}
      <Button onClick={() => handleMoreQuestionsOpen(tableIndex)}>
        Add More Questions
      </Button>
      <Button>
        Submit
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
              name="program"
              value={formData.program}
              onChange={handleFormChange}
            >
              <MenuItem value="ProgramA">Program A</MenuItem>
              <MenuItem value="ProgramB">Program B</MenuItem>
              {/* Add more class options as needed */}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Course</InputLabel>
            <Select
              name="course"
              value={formData.course}
              onChange={handleFormChange}
            >
              <MenuItem value="Course1">Course 1</MenuItem>
              <MenuItem value="Course2">Course 2</MenuItem>
              {/* Add more course options as needed */}
            </Select>
          </FormControl>

              <FormControl fullWidth margin="normal">
            <InputLabel>Select Class</InputLabel>
            <Select
              name="class"
              value={formData.class}
              onChange={handleFormChange}
            >
              <MenuItem value="ClassA">Class A</MenuItem>
              <MenuItem value="ClassB">Class B</MenuItem>
              {/* Add more class options as needed */}
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
        value={formData.question}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />



      <TextField
        label="Option A"
        name="a"
        value={formData.a}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Option B"
        name="b"
        value={formData.b}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Option C"
        name="c"
        value={formData.c}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Option D"
        name="d"
        value={formData.d}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />


          {/* <Button variant="outlined" onClick={handleAddOptions}>
            Add More Options
              </Button> */}
              

 
      {/* Assuming answer is an array in the structure */}

<TextField
  label="Answer (e.g., a, b, c, or d)"
  name="answer"
  value={formData.length > 0 && formData[0].answer && formData[0].answer.length > 0 ? formData[0].answer[0]?.option || '' : ''}
  onChange={(e) => handleAnswerChange(e.target.value)}
  fullWidth
  margin="normal"
/>


<TextField
  label="Details"
  name="details"
  value={formData.length > 0 && formData[0].answer && formData[0].answer.length > 0 ? formData[0].answer[0]?.details || '' : ''}
  onChange={(e) => handleDetailsChange(e.target.value)}
  fullWidth
  margin="normal"
/>

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
  <DialogTitle>{`Add More Exam Questions - Program: ${formData.program} - Course: ${formData.course} - Class: ${formData.class}`}</DialogTitle>
  <DialogContent>
    <form>
     <TextField
        label="Question"
        name="question"
        value={formData.question}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />



      <TextField
        label="Option A"
        name="a"
        value={formData.a}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Option B"
        name="b"
        value={formData.b}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Option C"
        name="c"
        value={formData.c}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Option D"
        name="d"
        value={formData.d}
        onChange={handleFormChange}
        fullWidth
        margin="normal"
      />


          {/* <Button variant="outlined" onClick={handleAddOptions}>
            Add More Options
              </Button> */}
              

 
      {/* Assuming answer is an array in the structure */}

<TextField
  label="Answer (e.g., a, b, c, or d)"
  name="answer"
  value={formData.length > 0 && formData[0].answer && formData[0].answer.length > 0 ? formData[0].answer[0]?.option || '' : ''}
  onChange={(e) => handleAnswerChange(e.target.value)}
  fullWidth
  margin="normal"
/>


<TextField
  label="Details"
  name="details"
  value={formData.length > 0 && formData[0].answer && formData[0].answer.length > 0 ? formData[0].answer[0]?.details || '' : ''}
  onChange={(e) => handleDetailsChange(e.target.value)}
  fullWidth
  margin="normal"
/>

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
  <DialogTitle>View Question</DialogTitle>
  <DialogContent>
    {viewQuestionIndex !== null && (
      <form>
        <TextField
          label="Question"
          name="question"
          value={editedQuestion}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />

     {editedOptions.map((option, index) => (
          <div key={index}>
            <TextField
              label={`Option ${option.option.toUpperCase()}`}
              name={option.option}
              value={option.details}
              fullWidth
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
        ))} 


        <TextField
          label="Correct Answer"
          name="correctAnswer"
          value={editedOptions[0]?.option || ''}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />

        <TextField
          label="Details"
          name="details"
          value={editedOptions[0]?.details || ''}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />

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


 