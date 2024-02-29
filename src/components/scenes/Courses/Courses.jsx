import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

const Course = () => {
  const [showForm, setShowForm] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [programTitle, setProgramTitle] = useState('');
  const [category, setCategory] = useState('');
  const [days, setDays] = useState('');
  const [lesson, setLesson] = useState('');
  const [viewMode, setViewMode] = useState(true); // State variable to track view/edit mode
  const [courses, setCourses] = useState([
    { id: 1, title: 'Anatomy', program: 'Program A', category: 'Category A', days: 'Monday, Tuesday, Wednesday', lesson: 'Lesson 1' },
    { id: 2, title: 'Science', program: 'Program B', category: 'Category B', days: 'Tuesday, Wednesday, Thursday', lesson: 'Lesson 2' },
    { id: 3, title: 'Mathematics', program: 'Program C', category: 'Category C', days: 'Wednesday, Thursday, Friday', lesson: 'Lesson 3' },
    { id: 4, title: 'English', program: 'Program D', category: 'Category D', days: 'Thursday, Friday, Monday', lesson: 'Lesson 4' }
  ]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleAddCourse = () => {
    setShowForm(true);
    setViewMode(false); // Set to edit mode when adding new course
  };

  const handleInputChange = (e) => {
    setNewCourseName(e.target.value);
  };

  const handleProgramChange = (e) => {
    setProgramTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  const handleLessonChange = (e) => {
    setLesson(e.target.value);
  };

  const handleAddNewCourse = () => {
    if (validateForm()) {
      const newCourse = {
        id: Date.now(),
        title: newCourseName,
        program: programTitle,
        category: category,
        days: days,
        lesson: lesson
      };
      setCourses([...courses, newCourse]);
      setNewCourseName('');
      setProgramTitle('');
      setCategory('');
      setDays('');
      setLesson('');
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

    if (category.trim() === '') {
      errors.category = 'Category is required';
      isValid = false;
    }

    if (days.trim() === '') {
      errors.days = 'Days are required';
      isValid = false;
    }

    if (lesson.trim() === '') {
      errors.lesson = 'Lesson is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleClose = () => {
    setShowForm(false);
    setViewMode(true); // Reset to view mode when closing form
  };

  const handleViewEditCourse = (id) => {
    const courseToViewEdit = courses.find(course => course.id === id);
    setNewCourseName(courseToViewEdit.title);
    setProgramTitle(courseToViewEdit.program);
    setCategory(courseToViewEdit.category);
    setDays(courseToViewEdit.days);
    setLesson(courseToViewEdit.lesson);
    setSelectedCourseId(id);
    setShowForm(true);
    setViewMode(false); // Set to edit mode when viewing/editing a course
  };  

  const handleDeleteCourse = () => {
    setCourses(courses.filter(course => course.id !== selectedCourseId));
    setOpen(false);
    setShowForm(false);
  };

  const handleEditCourse = () => {
    setShowForm(true);
    setViewMode(false); // Set to edit mode when editing a course
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div className="container mx-auto p-4" style={{ marginLeft: '20px' }}>
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Courses</h1>
      <Button onClick={handleAddCourse} variant="outlined" color="primary" className="mb-4">Add New Course</Button>
      <Dialog open={showForm} onClose={handleClose}>
        <DialogTitle>{viewMode ? 'View Course' : 'Edit Course'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Course Title"
              value={newCourseName}
              onChange={handleInputChange}
              error={!!errors.title}
              helperText={errors.title}
              disabled={viewMode} // Disable input field in view mode
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
  disabled={false} // Enable select field for editing in edit mode
>

              <MenuItem value="Program A">Program A</MenuItem>
              <MenuItem value="Program B">Program B</MenuItem>
              <MenuItem value="Program C">Program C</MenuItem>
              <MenuItem value="Program D">Program D</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Category"
              value={category}
              onChange={handleCategoryChange}
              error={!!errors.category}
              helperText={errors.category}
              disabled={viewMode} // Disable input field in view mode
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Days"
              value={days}
              onChange={handleDaysChange}
              error={!!errors.days}
              helperText={errors.days}
              disabled={viewMode} // Disable input field in view mode
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Lesson"
              value={lesson}
              onChange={handleLessonChange}
              error={!!errors.lesson}
              helperText={errors.lesson}
              disabled={viewMode} // Disable input field in view mode
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Close</Button>
          {viewMode && (
            <>
              <Button onClick={handleEditCourse} color="primary">Edit</Button>
              <Button onClick={() => setOpen(true)} color="secondary">Delete</Button>
            </>
          )}
          {!viewMode && (
            <Button onClick={handleAddNewCourse} color="primary">Save</Button>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Delete Course</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this course?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCourse} color="secondary">Delete</Button>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Title</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Program</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Category</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Days</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Lesson</th>
            <th className="border px-4 py-2 text-gray-800 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td className="border px-4 py-2 font-extralight text-gray-600">{course.title}</td>
              <td className="border px-4 py-2 font-extralight text-gray-600">{course.program}</td>
              <td className="border px-4 py-2 font-extralight text-gray-600">{course.category}</td>
              <td className="border px-4 py-2 font-extralight text-gray-600">{course.days}</td>
              <td className="border px-4 py-2 font-extralight text-gray-600">{course.lesson}</td>
              <td className="border px-4 py-2  text-gray-800">
                <Button onClick={() => handleViewEditCourse(course.id)} variant="outlined" color="primary">
                  {viewMode ? 'View' : 'Edit'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
