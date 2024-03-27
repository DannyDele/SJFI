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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Cookies from 'js-cookie';






// Store the endpoint in a variable
const API_ENDPOINT = "https://fis.metaforeignoption.com";


// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';




const Class = () => {
 
  const [token, setToken] = useState('');

  const [courses, setCourses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showZoomMeetingLinkForm, setShowZoomMeetingLinkForm] = useState(false);
const [programOptions, setProgramOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);
// Add a state variable to store the fetched usernames
const [teacherOptions, setTeacherOptions] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [linkLoading, setlinkLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const [isMeetingLinkMessageVisible, setMeetingLinkMessageVisible] = useState(false);
  
  const [selectedProgramFilter, setSelectedProgramFilter] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('');
  
  const [newClass, setNewClass] = useState({
    title: '',
    course: '',
    program: '',
    lecturer: '',
    details: '',
    date: new Date(),
    start_time: '00:00',
    end_time: '01:00',
    url: ''
  });
  const [viewIndex, setViewIndex] = useState(null);
  const [zoomMeetingLinkIndex, setZoomMeetingLinkIndex] = useState(null);
  const [messsageSuccessText, setSuccessMessageText] = useState('')




  


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
      const response = await fetch(`${API_ENDPOINT}/api/programs`);
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
      const response = await fetch(`${API_ENDPOINT}/api/courses?program=${newClass.program}`);
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

      // Set the flag to indicate that course data is loaded
      setIsCourseDataLoaded(true);
    }
  } catch (error) {
    console.error('Error fetching courses for the program:', error);
  }
};



  
  // Function to filter Program and Courses

  useEffect(() => {
  // Fetch classes based on filters when the component mounts or filters change
  fetchFilteredClasses();
}, [selectedProgramFilter, newClass.program, newClass.course]);



const fetchFilteredClasses = async () => {
  // Fetch classes based on selected filters
  try {
    setIsLoading(true);

    let apiUrl = `${API_ENDPOINT}/api/classes?`;

    if (selectedProgramFilter) {
      apiUrl += `program=${selectedProgramFilter}`;
    }

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('All Clases:', data)

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
    const authToken = Cookies.get('authToken');

  
    if (authToken) {
      setToken(authToken);
      console.log('Token:', token)
    }

  fetchTeachers(authToken);
}, []); // Empty dependency array ensures the effect runs only once when the component mounts



  
// Modify the fetchTeachers function
const fetchTeachers = async (authToken) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/api/users?type=student`,
       {
          method: "GET",
          headers: {
            Authorization: `bearer ${authToken}`,
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



// Function to Add New Class
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
      date: newClass.date,
      start_time: newClass.start_time,
      end_time: newClass.end_time,
      url: newClass.url,
    };

    // Determine whether to add or update the class based on viewIndex
    let apiUrl = `${API_ENDPOINT}/api/classes`;
    let operationMessage = ''; // Variable to store the operation message

    if (viewIndex !== null) {
      // If viewIndex is not null, it means we are updating an existing class
      const classId = courses[viewIndex]._id;
      apiUrl += `/${classId}`; // Append class ID to the URL for updating
      operationMessage = 'updated'; // Set operation message to 'updated'
    } else {
      operationMessage = 'created'; // Set operation message to 'created'
    }

    // Make a POST request to the endpoint
    const response = await fetch(apiUrl, {
      method: viewIndex !== null ? 'PUT' : 'POST', // Use PUT for update, POST for add
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
    setSuccessMessageVisible(true);

    // If successful, update the courses state and reset the newClass state
    const updatedCourses = [...courses];
    console.log('Updated Course:', updatedCourses);

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
      date: new Date(),
    start_time: '00:00',
      end_time: '01:00',
      url: '',
    });

    // Close the forms and reset the viewIndex
    setShowAddForm(false);
    setShowZoomMeetingLinkForm(false);
    setViewIndex(null);

    // Show a dynamic success message based on whether the operation was an addition or update
    setSuccessMessageText(`Class ${operationMessage} successfully!`);

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
  



const handleAddNewClass = () => {
  // Set newClass to initial state for adding a new class
  setNewClass({
    title: '',
    course: '',
    program: '',
    lecturer: '',
    details: '',
    date: new Date(),
    start_time: '00:00',
    end_time: '01:00',
    url: ''
  });

  // Set viewIndex to null to indicate adding a new class
  setViewIndex(null);
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

      const response = await fetch(`${API_ENDPOINT}/api/classes/${classIdToDelete}`, {
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
    setNewClass((prevClass) => ({ ...prevClass, url: '' }));
    setShowZoomMeetingLinkForm(false);
  };



  // FUNTION TO ADD ZOOM LINK FOR A CLASS
 const handleSubmitZoomMeetingLink = async () => {
   try {
    setlinkLoading(true)
    // Get the class ID from the courses array using the zoomMeetingLinkIndex
    const classId = courses[zoomMeetingLinkIndex]._id;
    console.log('Class Id:', classId)

    // Create a new class object to send to the server with updated zoomMeetingLink
    const classData = {
      url: newClass.url,
    };

    // API request to update the zoom meeting link for the class
    const response = await fetch(`${API_ENDPOINT}/api/classes/${classId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });

    if (!response.ok) {
      throw new Error(`Failed to save zoom meeting link: ${response.statusText}`);
    }

    // Optionally, you can handle success scenarios here
    // For example, show a success message or update the UI as needed
    const meetingLinkRes = response.json()
    console.log('Meeting Link Res:', meetingLinkRes)
    // Close the zoom meeting link form
     setShowZoomMeetingLinkForm(false);
     setMeetingLinkMessageVisible(true)
  } catch (error) {
     console.error('Error:', error.message);
          setIsLoading(false)

    // Optionally, you can handle errors here
    // For example, show an error message to the user
   } finally {
     setlinkLoading(false)
  }
};


  const CustomDatePickerInput = ({ value, onClick }) => (
    <TextField margin="dense" variant="outlined" value={value} onClick={onClick} fullWidth />
  );









  return (
    <div className="container mx-auto p-6" style={{ width:"80vw", padding:"2rem 4rem 4rem 4rem" }}>
      <h1 className="text-3xl font-bold text-gray-500 mb-6">Classes</h1>


      {/* Create Clas Message */}
         <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            {messsageSuccessText} 
          </Alert>
      </Snackbar>

        {/* Delete Class Meesage */}
      
         <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Class Deleted successfully! 
          </Alert>
      </Snackbar>

      {/* DAdd Zoom Link for Class Meesage */}
      
         <Snackbar
          open={isMeetingLinkMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setMeetingLinkMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Meeting link added successfully! 
          </Alert>
        </Snackbar>
         
          {/* Filter Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>

        <Box>
          <Button
       variant="contained" className='All-buttons mb-4'
    onClick={handleAddNewClass}
        
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
            variant="contained"
            className='All-buttons'
            onClick={() => {
              // Trigger a function to filter classes based on the selected filters
              fetchFilteredClasses();
            }}
          >
            Apply Filter
          </Button>
        </Box>
      </Box>
           <div style={{ height: 400 }}>

      {isLoading ? (
      <Box display="flex" justifyContent="center" alignItems="center" height={500}>
            <CircularProgress />
          </Box>
      ) :
        (
    <DataGrid
  columns={[
    { field: 'title', headerName: 'Class Title', width: 200 },
    { field: 'course', headerName: 'Class Course', width: 200 },
    { field: 'program', headerName: 'Program', width: 200 },
    { field: 'actions', headerName: 'Actions', width: 300, renderCell: (params) => (
      <div>
        <Button variant="outlined" color="primary" onClick={() => handleView(params.row.id)}>
          View
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            setShowZoomMeetingLinkForm(true);
            setZoomMeetingLinkIndex(params.row.id);
          }}
        >
          Add/Edit Zoom
        </Button>
      </div>
    )},
  ]}
rows={courses.map((course, index) => ({
  id: index,
  title: course.title,
  course: course.course && courseOptions.some((c) => c.id === course.course) ? 
          courseOptions.find((c) => c.id === course.course)?.title || 'N/A' : 'N/A',
  program: programOptions.find((p) => p.id === course.program)?.title || 'N/A',
}))}
  pageSize={10}
  rowsPerPageOptions={[10, 20, 50]}
        pagination
          components={{
          Toolbar: GridToolbar,
        }}
/>
          )}
        </div>

  
       
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
              selected={newClass.date}
              onChange={(date) => setNewClass({ ...newClass, date: date })}
              selectsStart
              startDate={newClass.date}
              dateFormat="MM/dd/yyyy"
              className="form-control"
              customInput={<CustomDatePickerInput />}
            />
          </Box>
          <Box mt={2}>
            <TextField
              margin="dense"
              id="start_time"
              name="start_time"
              label="Start Time"
              type="time"
              fullWidth
              value={newClass.start_time}
              onChange={handleChange}
             
            />
          </Box>
          <Box mt={2}>
            <TextField
              margin="dense"
              id="end_time"
              name="end_time"
              label="End Time"
              type="time"
              fullWidth
              value={newClass.end_time}
              onChange={handleChange}
              
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
<Button onClick={handleSubmit} color="primary" disabled={isLoading}>
  <div style={{ display: 'flex', alignItems: 'center', color: '#3B8AD8' }}>
    {viewIndex !== null ? 'Update' : 'Add Class'}
    {isLoading && <CircularProgress size={20} style={{ marginLeft: '8px', color:'#3B8AD8' }} />}
  </div>
</Button>
          {viewIndex !== null && (
            <>
              {/* <Button onClick={handleEdit} color="primary">Edit</Button> */}
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
            id="url"
            name="url"
            label="Zoom Meeting Link"
            type="text"
            fullWidth
            value={newClass.url}
            onChange={handleChange}
           
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowZoomMeetingLinkForm(false)}>Cancel</Button>
          <Button onClick={handleSubmitZoomMeetingLink} color="primary">
            
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              {linkLoading && <CircularProgress size={20} style={{ marginLeft: '8px' }} />}
              Add link
              </Box>

          </Button>
          {zoomMeetingLinkIndex !== null && (
            <Button onClick={handleDeleteZoomMeetingLink} color="secondary">Delete</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Class;