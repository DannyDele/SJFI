import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const Course = () => {
  const [showForm, setShowForm] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [programTitle, setProgramTitle] = useState('');
  const [courses, setCourses] = useState([
    { id: 1, title: 'Anatomy', program: 'Program A' },
    { id: 2, title: 'Science', program: 'Program B' },
    { id: 3, title: 'Mathematics', program: 'Program C' },
    { id: 4, title: 'English', program: 'Program D' }
  ]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleAddCourse = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setNewCourseName(e.target.value);
  };

  const handleProgramChange = (e) => {
    setProgramTitle(e.target.value);
  };

  const handleAddNewCourse = () => {
    if (validateForm()) {
      const newCourse = {
        id: Date.now(),
        title: newCourseName,
        program: programTitle
      };
      setCourses([...courses, newCourse]);
      setNewCourseName('');
      setProgramTitle('');
      setShowForm(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (newCourseName.trim() === '') {
      errors.title = 'Course name is required';
      isValid = false;
    }

    if (programTitle.trim() === '') {
      errors.program = 'Program title is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleEditCourse = (id) => {
    const courseToEdit = courses.find(course => course.id === id);
    setNewCourseName(courseToEdit.title);
    setProgramTitle(courseToEdit.program);
    setSelectedCourseId(id);
    setShowForm(true);
  };

  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Courses</h1>
      <Button onClick={handleAddCourse} variant="outlined" color="primary" className="mb-4">Add New Course</Button>
      <Dialog open={showForm} onClose={handleClose}>
        <DialogTitle>{selectedCourseId ? 'Edit Course' : 'Add New Course'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Course Title"
              value={newCourseName}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="program-title-label">Program Title</InputLabel>
            <Select
              labelId="program-title-label"
              id="program-title"
              value={programTitle}
              onChange={handleProgramChange}
              error={!!errors.program}
            >
              <MenuItem value="Program A">Program A</MenuItem>
              <MenuItem value="Program B">Program B</MenuItem>
              <MenuItem value="Program C">Program C</MenuItem>
              <MenuItem value="Program D">Program D</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleAddNewCourse} color="primary">{selectedCourseId ? 'Edit' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Title</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Program</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td className="border px-4 py-2 text-gray-800">{course.title}</td>
              <td className="border px-4 py-2 text-gray-800">{course.program}</td>
              <td className="border px-4 py-2 text-gray-800">
                <Button onClick={() => handleEditCourse(course.id)} variant="outlined" color="primary">Edit</Button>
                <Button onClick={() => handleDeleteCourse(course.id)} variant="outlined" color="secondary">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
