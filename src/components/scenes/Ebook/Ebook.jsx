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

  // New state variable and function for contents view
  const [showContentsView, setShowContentsView] = useState(false);
  const [contents, setContents] = useState('');

  const [ebooks, setEbooks] = useState([
    { id: 1, title: 'Introduction to Science', file: 'introtosci.pdf', content: 'This is an introduction to Science.' },
    { id: 2, title: 'Intro to Physics', file: 'introtophy.pdf', content: 'This is an introduction to Physics.' },
    { id: 3, title: 'Mathematics', file: 'maths.pdf', content: 'This is about Mathematics.' },
    { id: 4, title: 'Statistics', file: 'stats.pdf', content: 'This is about Statistics.' },
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
    setEbookTitle(ebook.title);
    setEditEbookId(ebook.id);
    setShowAddForm(true);
  };

  const handleDeleteClick = (id) => {
    setEbooks(ebooks.filter(ebook => ebook.id !== id));
  };

  // Function to handle view contents
  const handleViewContents = (ebook) => {
    setContents(ebook.content);
    setShowContentsView(true);
  };

  return (
    <div style={{padding: '2rem'}} className="container mx-auto p-4 text-black bg-white">
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
      {/* Dialog for viewing contents */}
      <Dialog open={showContentsView} onClose={() => setShowContentsView(false)}>
        <DialogTitle>Ebook Contents</DialogTitle>
        <DialogContent>
          <DialogContentText>{contents}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowContentsView(false)}>Close</Button>
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
              <td className="border border-gray-300 p-3">{ebook.title}</td>
              <td className="border border-gray-300 p-3">{ebook.file}</td>
              <td className="border border-gray-300 p-3">
                <Button variant="outlined" onClick={() => handleViewContents(ebook)}>View Contents</Button>
                <Button variant="outlined" onClick={() => handleEditClick(ebook)}>Edit</Button>
                <Button variant="outlined" onClick={() => handleDeleteClick(ebook.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Ebook;
