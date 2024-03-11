import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';




// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';




const Class = () => {
 

  const [courses, setCourses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showZoomMeetingLinkForm, setShowZoomMeetingLinkForm] = useState(false);
const [programOptions, setProgramOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
// Add a state variable to store the fetched usernames
const [teacherOptions, setTeacherOptions] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
  
  const [selectedProgramFilter, setSelectedProgramFilter] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('');
  
  const [newClass, setNewClass] = useState({
    title: '',
    course: '',
    program: '',
    lecturer: '',
    details: '',
    dateFrom: new Date(),
    dateTo: new Date(),
    startTime: '00:00',
    endTime: '01:00',
    zoomMeetingLink: ''
  });
  const [viewIndex, setViewIndex] = useState(null);
  const [zoomMeetingLinkIndex, setZoomMeetingLinkIndex] = useState(null);






useEffect(() => {
    // Fetch program options when the component mounts
    fetchProgramOptions();
}, [programOptions]);
  
   useEffect(() => {
     // Fetch courses when the program changes
      //  console.log('Selected program:', newClass.program);

    fetchCoursesForProgram();
   }, [newClass.program]);
  

  

  
     
    //  Fetch All Programs

  const fetchProgramOptions = async () => {
    try {
      const response = await fetch('https://fis.metaforeignoption.com/api/programs');
      const data = await response.json();
       // Assuming data is an array of courses
      const programNames = data.map(program => ({
        id: program._id,
        title: program.title
      }));
      
      // console.log('Program Data:', programNames);

      // Set the array of program names in state
      setProgramOptions(programNames);
      // console.log('Program Options:', programOptions)
    } catch (error) {
      console.error('Error fetching program options:', error);
    }
  };


// Fecth Courses for programs

// Modify the fetchCoursesForProgram function
const fetchCoursesForProgram = async () => {
  try {
    if (newClass.program) {
      const response = await fetch(`https://fis.metaforeignoption.com/api/courses?program=${newClass.program}`);
      const data = await response.json();
      const courseNames = data.map(course => ({
        id: course._id,
        title: course.title
      }));

      // Update the courseOptions state
      setCourseOptions(courseNames);

      // Update the newClass.course state if it's not set
      if (!newClass.course && courseNames.length > 0) {
        setNewClass((prevClass) => ({ ...prevClass, course: courseNames[0].id }));
      }
    }
  } catch (error) {
    console.error('Error fetching courses for the program:', error);
  }
};


  
  // Function to filter Program and Courses

   useEffect(() => {
    // Fetch classes based on filters when the component mounts or filters change
    fetchFilteredClasses();
  }, []);



const fetchFilteredClasses = async () => {
  // Fetch classes based on selected filters
  try {
    setIsLoading(true);

    let apiUrl = 'https://fis.metaforeignoption.com/api/classes?';

    if (selectedProgramFilter) {
      apiUrl += `program=${selectedProgramFilter}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();

    // Update the courses state with the filtered data
    setCourses(data);
  } catch (error) {
    console.error('Error fetching filtered classes:', error);
  } finally {
    setIsLoading(false);
  }
};





// Add a new useEffect hook to fetch teachers when the component mounts
useEffect(() => {
  fetchTeachers();
}, []); // Empty dependency array ensures the effect runs only once when the component mounts


const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbm55SXllIiwidXNlcklkIjoiNjVlODViNDUyNDU3N2JmZDMyMGNjMmVjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA5NzQwNTQ2fQ.i4K-14N5_X0dmj7GK6m8wNVJH5Fb3M14g5z20bAkDTQ";

  
// Modify the fetchTeachers function
const fetchTeachers = async () => {
  try {
    const response = await fetch('https://fis.metaforeignoption.com/api/users?type=student',
       {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
    );
    const data = await response.json();
    console.log("Gotten Users:", data)

    // Assuming data is an array of users
    const teacherUsernames = data.map(user => ({
      id: user._id,
      username: user.username
    }));

    // Update the state with the fetched usernames
    setTeacherOptions(teacherUsernames);
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
};





const handleChange = (e) => {
  const { name, value } = e.target;

  // For the program field, find the corresponding program object
  if (name === 'program') {
    // Update the state with the selected program ID
    setNewClass((prevClass) => ({
      ...prevClass,
      [name]: value,  // Displayed Program Name
      programId: value  // Program ID for submission
    }));

    // Fetch courses for the selected program
    fetchCoursesForProgram();
  } else {
    // For other fields, update the state as before
    setNewClass((prevClass) => ({ ...prevClass, [name]: value }));
  }
};





const handleSubmit = async (e) => {
  e.preventDefault();

  // Set loading to true when the button is clicked
  setIsLoading(true);

  try {
    // Create a new class object to send to the server
    const classData = {
      title: newClass.title,
      course: newClass.course,
      program: newClass.program,
      lecturer: newClass.lecturer,
      details: newClass.details,
      dateFrom: newClass.dateFrom,
      dateTo: newClass.dateTo,
      startTime: newClass.startTime,
      endTime: newClass.endTime,
      zoomMeetingLink: newClass.zoomMeetingLink,
    };

    console.log('Added Class Information:', classData)

    // API request to send the new class data to the server
    const response = await fetch('https://fis.metaforeignoption.com/api/classes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });

    if (!response.ok) {
      // Handle non-successful response (e.g., show an error message)
      throw new Error(`Failed to add/update class: ${response.statusText}`);
    }

    // Parse the response data as JSON
    const responseData = await response.json();
    console.log('Response Data:', responseData);

    // If successful, update the courses state and reset the newClass state
    const updatedCourses = [...courses];
    console.log('Updated Course:', updatedCourses)

    if (viewIndex !== null) {
      updatedCourses[viewIndex] = newClass;
    } else {
      updatedCourses.push(newClass);
    }

    setCourses(updatedCourses);
    setNewClass({
      title: '',
      course: '',
      program: '',
      lecturer: '',
      details: '',
      dateFrom: new Date(),
      dateTo: new Date(),
      startTime: '00:00',
      endTime: '01:00',
      zoomMeetingLink: '',
    });

    // Close the forms and reset the viewIndex
    setShowAddForm(false);
    setShowZoomMeetingLinkForm(false);
    setViewIndex(null);
  } catch (error) {
    console.error('Error:', error.message);
    // Handle errors if needed (e.g., show an error message)
  } finally {
    // Reset loading to false after the asynchronous operations are completed
    setIsLoading(false);
  }
};




  const handleView = (index) => {
    setNewClass(courses[index]);
    setViewIndex(index);
    setShowAddForm(true);
  };

  const handleEdit = () => {
    // Check if there is a selected class for editing
    if (viewIndex !== null) {
      setShowAddForm(true);
    } else {
      setShowAddForm(false); // Add this line to prevent showing the form for a new class
    }
  };



// Function to Delete a Class

 const handleDelete = async () => {
  if (viewIndex !== null) {
    const classIdToDelete = courses[viewIndex]._id; // Assuming the class object has an _id property

    try {
      setIsLoadingDelete(true);

      const response = await fetch(`https://fis.metaforeignoption.com/api/classes/${classIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete class: ${response.statusText}`);
      }

      // If the deletion was successful, update the courses state
      const updatedCourses = [...courses];
      updatedCourses.splice(viewIndex, 1);
      setCourses(updatedCourses);
      setViewIndex(null);

      setDeleteMessageVisible(true); // Optionally, show a success message
      setShowAddForm(false)

    } catch (error) {
      console.error('Error:', error.message);
      // Handle errors if needed (e.g., show an error message)
    } finally {
      setIsLoadingDelete(false);
    }
  }
};


  const handleDeleteZoomMeetingLink = () => {
    setNewClass((prevClass) => ({ ...prevClass, zoomMeetingLink: '' }));
    setShowZoomMeetingLinkForm(false);
  };

  const handleSubmitZoomMeetingLink = () => {
    setShowZoomMeetingLinkForm(false);
  };

  const CustomDatePickerInput = ({ value, onClick }) => (
    <TextField margin="dense" variant="outlined" value={value} onClick={onClick} fullWidth />
  );

  return (
    <div className="container mx-auto p-6" style={{ marginLeft: '20px' }}>
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Classes</h1>


         <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Class Created successfully! 
          </Alert>
      </Snackbar>
      
         <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Class Deleted successfully! 
          </Alert>
        </Snackbar>
         
          {/* Filter Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>

        <Box>
          <Button
        variant="outlined"
        color="primary"
        onClick={() => setShowAddForm(true)}
        className="mb-4"
      >
        Add New Class</Button>
</Box>

        <Box>
          <FormControl>
            <InputLabel id="filter-program-label">Filter Program</InputLabel>
            <Select
              labelId="filter-program-label"
              id="filter-program"
              value={selectedProgramFilter}
              onChange={(e) => setSelectedProgramFilter(e.target.value)}
              style={{ width: '200px' }} // Adjust the width value as needed

            >
              <MenuItem value="">All Programs</MenuItem>
              {programOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box ml={2}>
          <FormControl>
            <InputLabel id="filter-course-label">Filter Course</InputLabel>
            <Select
              labelId="filter-course-label"
              id="filter-course"
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              style={{ width: '200px' }} // Adjust the width value as needed

            >
              <MenuItem value="">All Courses</MenuItem>
              {courseOptions.map((course, index) => (
                <MenuItem key={index} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box ml={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              // Trigger a function to filter classes based on the selected filters
              fetchFilteredClasses();
            }}
          >
            Apply Filter
          </Button>
        </Box>
      </Box>

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
      {/* Use find to get the corresponding course name based on the course ID */}
      <td className="border px-4 py-2 font-extralight text-gray-600">
        {courseOptions.find((c) => c.id === course.course)?.title || 'N/A'}
      </td>
      {/* Use find to get the corresponding program name based on the program ID */}
      <td className="border px-4 py-2 font-extralight text-gray-600">
        {programOptions.find((p) => p.id === course.program)?.title || 'N/A'}
      </td>
              <td className="border px-4 py-2  text-gray-800">
                <Button variant="outlined" color="primary" onClick={() => handleView(index)}>View</Button>
                <Button variant="outlined" color="primary" onClick={() => { setShowZoomMeetingLinkForm(true); setZoomMeetingLinkIndex(index); }}>Add/Edit Zoom</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog open={showAddForm} onClose={() => setShowAddForm(false)} minWidth="0" fullWidth>
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
            
          />

             <Box mt={2}>
              <FormControl fullWidth margin="normal">
  <InputLabel>Select Program</InputLabel>
  <Select
    name="program"
    value={newClass.program}
    onChange={handleChange}
  >
    {programOptions.map((option) => (
      <MenuItem key={option.id} value={option.id}>
        {option.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>

          </Box> 

          <Box mt={2}>
         <FormControl fullWidth margin="normal">
  <InputLabel>Select Course</InputLabel>
  <Select
    name="course"
    value={newClass.course}
    onChange={handleChange}
  >
    {courseOptions.map((course, index) => (
      <MenuItem key={index} value={course.id}>
        {course.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>


             
          </Box>
       
          <Box mt={2}>
         
              <FormControl fullWidth margin="normal">
    <InputLabel>Select Lecturer</InputLabel>
    <Select
      name="lecturer"
      value={newClass.lecturer}
      onChange={handleChange}
    >
      {teacherOptions.map((teacher, index) => (
        <MenuItem key={index} value={teacher.id}>
          {teacher.username}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
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
              
            />
          </Box>
          <Box mt={2}>
            <DatePicker
              selected={newClass.dateFrom}
              onChange={(date) => setNewClass({ ...newClass, dateFrom: date })}
              selectsStart
              startDate={newClass.dateFrom}
              endDate={newClass.dateTo}
              dateFormat="MM/dd/yyyy"
              className="form-control"
              customInput={<CustomDatePickerInput />}
            />
          </Box>
          <Box mt={2}>
            <DatePicker
              selected={newClass.dateTo}
              onChange={(date) => setNewClass({ ...newClass, dateTo: date })}
              selectsEnd
              startDate={newClass.dateFrom}
              endDate={newClass.dateTo}
              minDate={newClass.dateFrom}
              dateFormat="MM/dd/yyyy"
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
              
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
<Button onClick={handleSubmit} color="primary" disabled={isLoading}>
  <div style={{ display: 'flex', alignItems: 'center', color: '#3B8AD8' }}>
    {viewIndex !== null ? 'Save' : 'Add Class'}
    {isLoading && <CircularProgress size={20} style={{ marginLeft: '8px', color:'#3B8AD8' }} />}
  </div>
</Button>
          {viewIndex !== null && (
            <>
              <Button onClick={handleEdit} color="primary">Edit</Button>
<Button onClick={handleDelete} color="secondary" disabled={isLoadingDelete}>
        <div style={{ display: 'flex', alignItems: 'center', color: '#FF0000' }}>
          Delete
          {isLoadingDelete && <CircularProgress size={20} style={{ marginLeft: '8px', color: '#FF0000' }} />}
        </div>
      </Button>            </>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={showZoomMeetingLinkForm} onClose={() => setShowZoomMeetingLinkForm(false)} minWidth="0" fullWidth>
        <DialogTitle>{zoomMeetingLinkIndex !== null ? 'Edit Zoom Meeting Link' : 'Add Zoom Meeting Link'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="zoomMeetingLink"
            name="zoomMeetingLink"
            label="Zoom Meeting Link"
            type="text"
            fullWidth
            value={newClass.zoomMeetingLink}
            onChange={handleChange}
           
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowZoomMeetingLinkForm(false)}>Cancel</Button>
          <Button onClick={handleSubmitZoomMeetingLink} color="primary">Save</Button>
          {zoomMeetingLinkIndex !== null && (
            <Button onClick={handleDeleteZoomMeetingLink} color="secondary">Delete</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Class;