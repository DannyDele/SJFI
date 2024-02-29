import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';

const Program = () => {
  const [showForm, setShowForm] = useState(false);
  const [newProgramName, setNewProgramName] = useState('');
  const [programs, setPrograms] = useState([
    { id: 1, title: 'Computer Science', classes: 5, courses: 8 },
    { id: 2, title: 'Biology', classes: 4, courses: 7 },
    { id: 3, title: 'Physics', classes: 6, courses: 9 },
    { id: 4, title: 'Literature', classes: 3, courses: 6 }
  ]);
  const [errors, setErrors] = useState({});
  const [editProgram, setEditProgram] = useState(null);
  const [editProgramName, setEditProgramName] = useState('');

  const handleAddProgram = () => {
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    setNewProgramName(e.target.value);
  };

  const handleEditProgram = (program) => {
    setEditProgram(program);
    setEditProgramName(program.title);
    setShowForm(true);
  };

  const handleDeleteProgram = (id) => {
    setPrograms(programs.filter(program => program.id !== id));
  };

  const handleAddNewProgram = () => {
    if (validateForm()) {
      if (editProgram) {
        setPrograms(programs.map(program =>
          program.id === editProgram.id ? { ...program, title: editProgramName } : program
        ));
        setEditProgram(null);
      } else {
        const newProgram = {
          id: Date.now(),
          title: newProgramName,
          classes: 0,
          courses: 0
        };
        setPrograms([...programs, newProgram]);
      }
      setNewProgramName('');
      setShowForm(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (newProgramName.trim() === '') {
      errors.title = 'Program name is required';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  return (
    <div  style={{padding: '2rem'}}  className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Programs</h1>
      <Button onClick={handleAddProgram} variant="outlined" color="primary" className="mb-4">Add New Program</Button>
      {showForm && (
        <div className="bg-gray-200 p-4 rounded-lg mb-6">
          <label htmlFor="programName" className="block font-semibold text-gray-800 mb-2">Program Name:</label>
          <TextField
            type="text"
            id="programName"
            value={editProgram ? editProgramName : newProgramName}
            onChange={handleInputChange}
            className={`border text-gray-600 border-gray-300 rounded-lg p-2 w-full ${
              errors.title ? 'border-red-500' : ''
            }`}
            placeholder="Enter program name..."
            variant="outlined"
            fullWidth
            style={{ backgroundColor: '#FFE3E3' }} 
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
          <Button onClick={handleAddNewProgram} variant="outlined" color="primary" className="mt-4">{editProgram ? 'Update' : 'Add'}</Button>
        </div>
      )}
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
                <Button variant="outlined" color="primary" onClick={() => handleEditProgram(program)}>Edit</Button>
                <Button variant="outlined" color="secondary" onClick={() => handleDeleteProgram(program.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Program;
