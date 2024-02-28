import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, MenuItem } from '@mui/material';

const Ebook = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [programTitle, setProgramTitle] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [ebookTitle, setEbookTitle] = useState('');
  const [ebookFile, setEbookFile] = useState('');
  const [fileError, setFileError] = useState('');
  const [editEbookId, setEditEbookId] = useState(null);

  // New state variables for caption and the current selected ebook
  const [caption, setCaption] = useState('');
  const [selectedEbook, setSelectedEbook] = useState(null);

  const [ebooks, setEbooks] = useState([
    { id: 1, title: 'Introduction to Science', file: 'introtosci.pdf', content: 'This is an introduction to Science.', caption: 'Science Ebook' },
    { id: 2, title: 'Intro to Physics', file: 'introtophy.pdf', content: 'This is an introduction to Physics.', caption: 'Physics Ebook' },
    { id: 3, title: 'Mathematics', file: 'maths.pdf', content: 'This is about Mathematics.', caption: 'Mathematics Ebook' },
    { id: 4, title: 'Statistics', file: 'stats.pdf', content: 'This is about Statistics.', caption: 'Statistics Ebook' },
  ]);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!ebookTitle.trim()) {
      return;
    }
    if (!ebookFile) {
      setFileError('Please select a file.');
      return;
    }
    if (editEbookId !== null) {
      const updatedEbooks = ebooks.map(ebook => {
        if (ebook.id === editEbookId) {
          return { ...ebook, title: ebookTitle, file: ebookFile.name };
        }
        return ebook;
      });
      setEbooks(updatedEbooks);
      setEditEbookId(null);
    } else {
      const newEbook = { id: Date.now(), title: ebookTitle, file: ebookFile.name };
      setEbooks([...ebooks, newEbook]);
    }
    setEbookTitle('');
    setEbookFile('');
    setFileError('');
    setShowAddForm(false);
  };

  const handleEditClick = (ebook) => {
    setProgramTitle(ebook.programTitle); // Assuming programTitle is a property of the ebook object
    setCourseTitle(ebook.courseTitle); // Assuming courseTitle is a property of the ebook object
    setEbookTitle(ebook.title);
    setEditEbookId(ebook.id);
    setShowAddForm(true);
  };

  const handleDeleteClick = (id) => {
    setEbooks(ebooks.filter(ebook => ebook.id !== id));
  };

  const handleViewContents = (ebook) => {
    setSelectedEbook(ebook);
    setCaption(ebook.caption); // Set the caption when viewing contents
    setProgramTitle(ebook.programTitle); // Set programTitle for editing
    setCourseTitle(ebook.courseTitle); // Set courseTitle for editing
    setEbookTitle(ebook.title); // Set ebookTitle for editing
  };  

  const handleEditEbook = () => {
    setProgramTitle(selectedEbook.programTitle); // Assuming programTitle is a property of the ebook object
    setCourseTitle(selectedEbook.courseTitle); // Assuming courseTitle is a property of the ebook object
    setEbookTitle(selectedEbook.title);
    setEditEbookId(selectedEbook.id);
    setShowAddForm(true);
  };

  const handleDeleteEbook = () => {
    setEbooks(ebooks.filter(ebook => ebook.id !== selectedEbook.id));
    setSelectedEbook(null);
  };

  return (
    <div className="container mx-auto p-4 text-black style={{ marginLeft: '20px' }} bg-white">
      <h1 className="text-3xl text-gray-500 mb-6">Ebooks</h1>
      <Button
        onClick={handleAddClick}
        variant="outlined"
        color="primary"
        className="mb-4"
      >
        Add New Ebook
      </Button>
      <Dialog open={showAddForm} onClose={() => setShowAddForm(false)}>
        <DialogTitle>{editEbookId !== null ? 'Edit Ebook' : 'Add New Ebook'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below:</DialogContentText>
          <TextField
            select
            label="Program Title"
            value={programTitle}
            onChange={(e) => setProgramTitle(e.target.value)}
            fullWidth
            margin="normal"
          >
            {/* Replace this with your actual program title options */}
            <MenuItem value="Program 1">Program 1</MenuItem>
            <MenuItem value="Program 2">Program 2</MenuItem>
            <MenuItem value="Program 3">Program 3</MenuItem>
          </TextField>
          <TextField
            select
            label="Course Title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            fullWidth
            margin="normal"
          >
            {/* Replace this with your actual course title options */}
            <MenuItem value="Course 1">Course 1</MenuItem>
            <MenuItem value="Course 2">Course 2</MenuItem>
            <MenuItem value="Course 3">Course 3</MenuItem>
          </TextField>
          <TextField
            label="Ebook Title"
            value={ebookTitle}
            onChange={(e) => setEbookTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          {/* Input field for the caption */}
          <TextField
            label="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            onChange={(e) => {
              setEbookFile(e.target.files[0]);
              setFileError('');
            }}
            accept=".pdf"
          />
          {fileError && (
            <p className="text-red-500 text-sm mt-1">{fileError}</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
          <Button onClick={handleFormSubmit} color="primary">{editEbookId !== null ? 'Edit Ebook' : 'Add Ebook'}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={selectedEbook !== null} onClose={() => setSelectedEbook(null)}>
        <DialogTitle>{selectedEbook?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedEbook?.content}</DialogContentText>
          {/* Display the caption along with the contents */}
          <DialogContentText><strong>Caption: </strong>{caption}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditEbook} color="primary">Edit</Button>
          <Button onClick={handleDeleteEbook} color="error">Delete</Button>
          <Button onClick={() => setSelectedEbook(null)}>Close</Button>
        </DialogActions>
      </Dialog>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-3">Ebook Title</th>
            <th className="border border-gray-300 p-3">File</th>
            <th className="border border-gray-300 p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ebooks.map((ebook) => (
            <tr key={ebook.id}>
              <td className="border font-extralight border-gray-300 p-3">{ebook.title}</td>
              <td className="border border-gray-300 p-3">{ebook.file}</td>
              <td className="border border-gray-300 p-3">
                <Button variant="outlined" onClick={() => handleViewContents(ebook)}>View Contents</Button>
                {/* <Button variant="outlined" onClick={() => handleEditClick(ebook)}>Edit</Button> */}
                {/* <Button variant="outlined" color='error' onClick={() => handleDeleteClick(ebook.id)}>Delete</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ebook;
