import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css';

const Class = () => {
  const initialCourses = [
    { title: 'Mathematics', course: 'Maths', program: 'Program A', lecturer: 'John Doe', details: 'Monday 10:00 AM', date: new Date(), startTime: '10:00', endTime: '11:00', zoomLink: '' },
    { title: 'Science', course: 'Physics', program: 'Program B', lecturer: 'Jane Smith', details: 'Tuesday 9:00 AM', date: new Date(), startTime: '09:00', endTime: '10:00', zoomLink: '' },
    { title: 'History', course: 'Social Studies', program: 'Program C', lecturer: 'Alice Johnson', details: 'Wednesday 11:00 AM', date: new Date(), startTime: '11:00', endTime: '12:00', zoomLink: '' },
    { title: 'English', course: 'Language Arts', program: 'Program D', lecturer: 'Bob Brown', details: 'Thursday 10:00 AM', date: new Date(), startTime: '10:00', endTime: '11:00', zoomLink: '' },
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClass, setNewClass] = useState({ title: '', course: '', program: '', lecturer: '', details: '', dateFrom: new Date(), dateTo: new Date(), startTime: '00:00', endTime: '01:00', zoomLink: '' }); // Changed to dateFrom and dateTo
  const [errors, setErrors] = useState({ title: '', course: '', program: '', lecturer: '', details: '', dateFrom: '', dateTo: '', startTime: '', endTime: '', zoomLink: '' }); // Changed to dateFrom and dateTo
  const [viewIndex, setViewIndex] = useState(null);

  const lecturers = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newClass.title || !newClass.course || !newClass.program || !newClass.lecturer || !newClass.details || !newClass.dateFrom || !newClass.dateTo || !newClass.startTime || !newClass.endTime || !newClass.zoomLink) {
      setErrors({
        title: newClass.title ? '' : 'Title is required',
        course: newClass.course ? '' : 'Course is required',
        program: newClass.program ? '' : 'Program is required',
        lecturer: newClass.lecturer ? '' : 'Lecturer is required',
        details: newClass.details ? '' : 'Details are required',
        dateFrom: newClass.dateFrom ? '' : 'Date From is required',
        dateTo: newClass.dateTo ? '' : 'Date To is required',
        startTime: newClass.startTime ? '' : 'Start Time is required',
        endTime: newClass.endTime ? '' : 'End Time is required',
        zoomLink: newClass.zoomLink ? '' : 'Zoom link is required',
      });
      return;
    }
    if (viewIndex !== null) {
      const updatedCourses = [...courses];
      updatedCourses[viewIndex] = newClass;
      setCourses(updatedCourses);
      setViewIndex(null);
    } else {
      setCourses([...courses, newClass]);
    }
    setNewClass({ title: '', course: '', program: '', lecturer: '', details: '', dateFrom: new Date(), dateTo: new Date(), startTime: '00:00', endTime: '01:00', zoomLink: '' });
    setShowAddForm(false);
  };

  const handleView = (index) => {
    setNewClass(courses[index]);
    setViewIndex(index);
    setShowAddForm(true);
  };

  const handleEdit = () => {
    setShowAddForm(true);
  };

  const handleDelete = () => {
    const updatedCourses = [...courses];
    updatedCourses.splice(viewIndex, 1);
    setCourses(updatedCourses);
    setViewIndex(null);
    setShowAddForm(false);
  };

  const CustomDatePickerInput = ({ value, onClick }) => (
    <TextField
      margin="dense"
      variant="outlined"
      value={value}
      onClick={onClick}
      fullWidth
    />
  );

  return (
    <div className="container mx-auto p-6" style={{ marginLeft: '20px' }}>
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Classes</h1>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setShowAddForm(true)}
        className="mb-4"
      >
        Add New Class
      </Button>
      <Dialog open={showAddForm} onClose={() => setShowAddForm(false)} minWidth="0" fullWidth> {/* Set maxWidth to 'md' and fullWidth */}
  <DialogTitle>{viewIndex !== null ? 'Edit Class' : 'Add New Class'}</DialogTitle>
  <DialogContent>
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
          <Box mt={2}>
            <TextField
              margin="dense"
              id="lecturer"
              name="lecturer"
              select
              label="Select Lecturer"
              fullWidth
              value={newClass.lecturer}
              onChange={handleChange}
              error={!!errors.lecturer}
              helperText={errors.lecturer}
            >
              {lecturers.map((lecturer, index) => (
                <MenuItem key={index} value={lecturer}>{lecturer}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={2}>
            <TextField
              margin="dense"
              id="details"
              name="details"
              label="Details"
              type="text"
              fullWidth
              value={newClass.details}
              onChange={handleChange}
              error={!!errors.details}
              helperText={errors.details}
            />
          </Box>
          <Box mt={2}>
            {/* Replace the TextField with DatePicker */}
            <DatePicker
              selected={newClass.dateFrom}
              onChange={(date) => setNewClass({ ...newClass, dateFrom: date })}
              selectsStart
              startDate={newClass.dateFrom}
              endDate={newClass.dateTo}
              dateFormat="EE dd MMM"
              className="form-control"
              customInput={<CustomDatePickerInput />}
            />
          </Box>
          <Box mt={2}>
            {/* Replace the TextField with DatePicker */}
            <DatePicker
              selected={newClass.dateTo}
              onChange={(date) => setNewClass({ ...newClass, dateTo: date })}
              selectsEnd
              startDate={newClass.dateFrom}
              endDate={newClass.dateTo}
              minDate={newClass.dateFrom}
              dateFormat="EE dd MMM"
              className="form-control"
              customInput={<CustomDatePickerInput />}
            />
          </Box>
          <Box mt={2}>
            <TextField
              margin="dense"
              id="startTime"
              name="startTime"
              label="Start Time"
              type="time"
              fullWidth
              value={newClass.startTime}
              onChange={handleChange}
              error={!!errors.startTime}
              helperText={errors.startTime}
            />
          </Box>
          <Box mt={2}>
            <TextField
              margin="dense"
              id="endTime"
              name="endTime"
              label="End Time"
              type="time"
              fullWidth
              value={newClass.endTime}
              onChange={handleChange}
              error={!!errors.endTime}
              helperText={errors.endTime}
            />
          </Box>
          <Box mt={2}>
            <TextField
              margin="dense"
              id="zoomLink"
              name="zoomLink"
              label="Zoom Meeting Link"
              type="text"
              fullWidth
              value={newClass.zoomLink}
              onChange={handleChange}
              error={!!errors.zoomLink}
              helperText={errors.zoomLink}
            />
          </Box>
        </DialogContent>
  <DialogActions style={{ justifyContent: 'space-between', width: '50%', padding: '10px' }}> {/* Adjust width and padding */}
    <div>
      <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
      <Button onClick={handleSubmit} color="primary">{viewIndex !== null ? 'Save' : 'Add'}</Button>
    </div>
    {viewIndex !== null && (
      <>
        <div>
          <Button onClick={handleEdit} color="primary">Edit</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </div>
      </>
    )}
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
              <td className="border px-4 py-2 font-extralight text-gray-600">{course.title}</td>
              <td className="border px-4 py-2 font-extralight text-gray-600">{course.course}</td>
              <td className="border px-4 py-2 font-extralight text-gray-600">{course.program}</td>
              <td className="border px-4 py-2  text-gray-800">
                <Button variant="outlined" color="primary" onClick={() => handleView(index)}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Class;
