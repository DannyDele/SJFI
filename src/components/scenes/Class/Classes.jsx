import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField } from '@mui/material';

const Class = () => {
  const initialCourses = [
    { title: 'Mathematics', course: 'Maths', program: 'Program A' },
    { title: 'Science', course: 'Physics', program: 'Program B' },
    { title: 'History', course: 'Social Studies', program: 'Program C' },
    { title: 'English', course: 'Language Arts', program: 'Program D' },
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({ title: '', course: '', program: '' });
  const [errors, setErrors] = useState({ title: '', course: '', program: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newClass.title || !newClass.course || !newClass.program) {
      setErrors({
        title: newClass.title ? '' : 'Title is required',
        course: newClass.course ? '' : 'Course is required',
        program: newClass.program ? '' : 'Program is required',
      });
      return;
    }
    setCourses([...courses, newClass]);
    setNewClass({ title: '', course: '', program: '' });
    setShowAddForm(false);
  };

  const handleEdit = (index) => {
    // Implement edit functionality here
    console.log('Edit class at index', index);
  };

  const handleDelete = (index) => {
    // Implement delete functionality here
    console.log('Delete class at index', index);
  };

  return (
    <div className="container mx-auto p-6">
         <h1 className="text-3xl font-bold text-gray-500 mb-6">Program</h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setShowAddForm(true)}
      >
        Add New Class
      </Button>

      <Dialog open={showAddForm} onClose={() => setShowAddForm(false)}>
        <DialogTitle>Add New Class</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out the form below:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Class Title"
            type="text"
            fullWidth
            value={newClass.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <Box mt={2}>
            <TextField
              margin="dense"
              id="course"
              name="course"
              select
              label="Select Course"
              fullWidth
              value={newClass.course}
              onChange={handleChange}
              error={!!errors.course}
              helperText={errors.course}
            >
              {courses.map((course, index) => (
                <MenuItem key={index} value={course.course}>{course.course}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={2}>
            <TextField
              margin="dense"
              id="program"
              name="program"
              select
              label="Select Program"
              fullWidth
              value={newClass.program}
              onChange={handleChange}
              error={!!errors.program}
              helperText={errors.program}
            >
              {courses.map((course, index) => (
                <MenuItem key={index} value={course.program}>{course.program}</MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Table displaying classes */}
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Class Title</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Class Course</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Program</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-gray-800">{course.title}</td>
              <td className="border px-4 py-2 text-gray-800">{course.course}</td>
              <td className="border px-4 py-2 text-gray-800">{course.program}</td>
              <td className="border px-4 py-2 text-gray-800">
                <Button variant="outlined" color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDelete(index)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Class;
