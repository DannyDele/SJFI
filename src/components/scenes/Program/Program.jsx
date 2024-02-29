import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Program = () => {
  const [newProgramName, setNewProgramName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [lesson, setLesson] = useState('');
  const [programs, setPrograms] = useState([
    { id: 1, title: 'Computer Science', classes: 5, courses: 8, category: 'Science', description: 'Lorem ipsum', lesson: 'Introduction to CS' },
    { id: 2, title: 'Biology', classes: 4, courses: 7, category: 'Science', description: 'Dolor sit amet', lesson: 'Cell Biology' },
    { id: 3, title: 'Physics', classes: 6, courses: 9, category: 'Science', description: 'Consectetur adipiscing elit', lesson: 'Mechanics' },
    { id: 4, title: 'Literature', classes: 3, courses: 6, category: 'Humanities', description: 'Sed do eiusmod tempor', lesson: 'Shakespearean Literature' }
  ]);
  const [errors, setErrors] = useState({});
  const [editProgram, setEditProgram] = useState(null);
  const [editProgramName, setEditProgramName] = useState('');
  const [open, setOpen] = useState(false);
  const [formMode, setFormMode] = useState('add');

  const handleAddProgram = () => {
    setOpen(true);
    setEditProgram(null);
    setEditProgramName('');
    setCategory('');
    setDescription('');
    setLesson('');
    setFormMode('add');
  };

  const handleInputChange = (e) => {
    setNewProgramName(e.target.value);
    validateForm();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    validateForm();
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    validateForm();
  };

  const handleLessonChange = (e) => {
    setLesson(e.target.value);
    validateForm();
  };

  const handleViewProgram = (program) => {
    setEditProgram(program);
    setEditProgramName(program.title);
    setCategory(program.category);
    setDescription(program.description);
    setLesson(program.lesson);
    setOpen(true);
    setFormMode('edit');
  };  

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteProgram = (id) => {
    setPrograms(programs.filter(program => program.id !== id));
    setOpen(false); // Close the dialog after deletion
  };

  const handleEdit = () => {
    setOpen(true);
    setFormMode('edit');
  };

  const handleDelete = () => {
    handleDeleteProgram(editProgram.id);
    setOpen(false);
  };
  const handleAddNewProgram = () => {
    if (validateForm()) {
      if (formMode === 'edit') {
        setPrograms(programs.map(program =>
          program.id === editProgram.id ? { ...program, title: editProgramName, category: category, description: description, lesson: lesson } : program
        ));
        setEditProgram(null);
      } else {
        const newProgram = {
          id: Date.now(),
          title: newProgramName,
          classes: 0,
          courses: 0,
          category: category,
          description: description,
          lesson: lesson
        };
        setPrograms([...programs, newProgram]);
      }
      setNewProgramName('');
      setCategory('');
      setDescription('');
      setLesson('');
      setOpen(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (newProgramName.trim() === '') {
      errors.title = 'Program name is required';
      isValid = false;
    }

    if (category.trim() === '') {
      errors.category = 'Category is required';
      isValid = false;
    }

    if (description.trim() === '') {
      errors.description = 'Description is required';
      isValid = false;
    }

    if (lesson.trim() === '') {
      errors.lesson = 'Lesson is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div className="container mx-auto p-4" style={{ marginLeft: '20px' }}>
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Programs</h1>
      <Button onClick={handleAddProgram} variant="outlined" color="primary" className="mb-4">Add New Program</Button>
      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>{formMode === 'edit' ? 'Edit Program' : 'View Program'}</DialogTitle>
  <DialogContent>
    <TextField
      label="Program Name"
      value={editProgramName}
      onChange={(e) => setEditProgramName(e.target.value)}
      fullWidth
      margin="normal"
      disabled={formMode === 'view'}
      error={errors.title ? true : false}
      helperText={errors.title}
    />
    <TextField
      label="Category"
      value={category}
      onChange={handleCategoryChange}
      fullWidth
      margin="normal"
      disabled={formMode === 'view'}
      error={errors.category ? true : false}
      helperText={errors.category}
    />
    <TextField
      label="Description"
      value={description}
      onChange={handleDescriptionChange}
      fullWidth
      margin="normal"
      disabled={formMode === 'view'}
      error={errors.description ? true : false}
      helperText={errors.description}
    />
    <TextField
      label="Lesson"
      value={lesson}
      onChange={handleLessonChange}
      fullWidth
      margin="normal"
      disabled={formMode === 'view'}
      error={errors.lesson ? true : false}
      helperText={errors.lesson}
    />
  </DialogContent>
  <DialogActions>
    {formMode === 'edit' && (
      <>
        <Button onClick={handleDelete} color="secondary">Delete</Button>
      </>
    )}
    <Button onClick={handleClose} color="primary">Close</Button>
    {formMode === 'edit' && (
      <Button onClick={handleAddNewProgram} variant="outlined" color="primary">Update</Button>
    )}
  </DialogActions>
</Dialog>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Title</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Number of Courses</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Number of Classes</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {programs.map(program => (
            <tr key={program.id}>
              <td className="border px-4 py-2 text-gray-800">{program.title}</td>
              <td className="border px-4 py-2 text-gray-800">{program.classes}</td>
              <td className="border px-4 py-2 text-gray-800">{program.courses}</td>
              <td className="border px-4 py-2 text-gray-800">
                <Button variant="outlined" color="primary" onClick={() => handleViewProgram(program)}>View</Button>
                {/* <Button variant="outlined" color="secondary" onClick={() => handleDeleteProgram(program.id)}>Delete</Button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Program;
