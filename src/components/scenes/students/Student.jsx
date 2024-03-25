  import React, { useState, useEffect } from "react";
  import { DataGrid, GridHeader,  GridToolbar } from "@mui/x-data-grid";
  import {
    Box,
    Typography,
    Button,
    Dialog,
    TextField,
  Select,
  FormControl,
  InputLabel,
    MenuItem,
  IconButton,
  useTheme,
  InputAdornment
  } from "@mui/material";
  import InputBase from "@mui/material/InputBase";
  import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
  import "../../../assets/styles/Student.css";
import CircularProgress from '@mui/material/CircularProgress';
  import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';





// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';



  function CustomHeader(props) {
    return <GridHeader {...props} className="bold-header" />;
  }




function Student({setIsLoggedIn}) {
      const [token, setToken] = useState('');

    const [data, setData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true); // State to track loading
    const [loadingDelete, setLoadingDelete] = useState(false); // State to track delete loading
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
      const [programOptions, setProgramOptions] = useState([]);
    const [selectedProgram, setSelectedProgram] = useState('');
      const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);

// Add state to manage selected role
const [selectedRole, setSelectedRole] = useState('student');


    
    const [formData, setFormData] = useState({
    program: "",
    student_application: {
      sur_name: "",
      other_name: "",
      frist_name: "",
      marital_status: "",
      dob: "",
      pob: "",
      state: "",
      nationality: "",
      email: "",
      address: "",
      phone_number: "",
      office_number: "",
      mailing_address: "",
      education: [
        { institution: "", level: "", subject: "", grade: "", date: "" }
      ],
      employment: [
        { name: "", address: "", nature: "", position: "", date: "" }
      ],
      referees: [
        { institution: "", name: "", rank: "", phone: "", date: "" }
      ],
      explanation: ""
    }
    });
  
  
    


 const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    // Check if any field is empty
    for (const key in formData.student_application) {
      if (!formData.student_application[key]) {
        errors[key] = 'This field is required';
      }
    }
    // Additional validation logic for other fields if needed
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };






 useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
    


    
    // State to fectch all Programs

 useEffect(() => {
    // Fetch program options when the component mounts
    fetchProgramOptions();
  }, []);

  
  
  

// Fetch All Programs
const fetchProgramOptions = async () => {
  try {
    const response = await fetch('https://api.stj-fertilityinstitute.com/api/programs');
    const data = await response.json();
    const programNames = data.map(program => ({
      id: program._id,
      title: program.title
    }));
    console.log('Program Data:', programNames);
    setProgramOptions(programNames);
    console.log('Selected Program:', selectedProgram);
  } catch (error) {
    console.error('Error fetching program options:', error);
  }
};
    
    
    
    



  useEffect(() => {
      
 const authToken = Cookies.get('authToken');
    if (authToken) {
      setToken(authToken);
      // console.log('Auth Token:', token)
    }

      fetchStudents(authToken);
    }, [selectedRole]); // Fetch data when the component mounts

    const columns = [
      { field: "profileimage", headerName: "Profile", width: 100, renderCell: (params) => <img src={params.value} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} /> },
      { field: "username", headerName: "Username", width: 150 },
      { field: "country", headerName: "Country", width: 120 },
      { field: "phone", headerName: "Phone", width: 120 },
      { field: "vstatus", headerName: "VStatus", width: 120 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "role", headerName: "Role", width: 120 },
    ];




// Function to handle role selection change
const handleRoleChange = (event) => {
  setSelectedRole(event.target.value);
};



    const fetchStudents = async (authToken) => {
      try {
        setLoading(true)
        const response = await fetch(
      `https://fis.metaforeignoption.com/api/users?type=${selectedRole}`,
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${authToken}`,
            },
          }
        );
        const studentsData = await response.json();
        console.log('Student Data:', studentsData)
        setData(studentsData);
              setLoading(false); // Set loading to false when data is fetched

      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false); // Set loading to false when data is fetched

      }
    };






    
  const handleOpenAddStudentDialog = () => {
    setOpenAddStudentDialog(true);
  };

  const handleCloseAddStudentDialog = () => {
    setOpenAddStudentDialog(false);
  };

    const handleOpenDialog = () => {
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    };

    // const handleSave = () => {
    //   // Handle saving logic here
    //   handleCloseDialog();
    // };

const handleChange = (event) => {
  const { name, value } = event.target;
  const { student_application } = formData;

  // If name is 'program', update it directly
  if (name === 'program') {
    setFormData({ ...formData, [name]: value });
  } else if (name.includes('[')) {
    // If the name attribute contains square brackets, it indicates a nested property
    const [outerKey, innerKey] = name.split(/\[|\]\./); // Split the name to get outer and inner keys
    const updatedStudentApplication = {
      ...student_application,
      [outerKey]: [
        ...student_application[outerKey].map((item, index) =>
          index.toString() === innerKey ? { ...item, [name.split('.').pop()]: value } : item
        )
      ]
    };
    setFormData({ ...formData, student_application: updatedStudentApplication });
  } else {
    // If it's not a nested property or 'program', directly update the form data
setFormData({
      ...formData,
      student_application: {
        ...formData.student_application,
        [name]: value
      }
});  }
};



    


 // Function to handle form submission
const handleSubmit = async () => {
  try {
    setLoading(true);

    // Construct the data to be sent
    const formDataToSend = {
      ...formData,
      student_application: {
        ...formData.student_application,
        education: formData.student_application.education.map(edu => ({ ...edu })),
        employment: formData.student_application.employment.map(emp => ({ ...emp })),
        referees: formData.student_application.referees.map(ref => ({ ...ref }))
      }
    };

    // Make a POST request to the endpoint
    const response = await fetch('https://fis.metaforeignoption.com/api/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      },
      body: JSON.stringify(formDataToSend),
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error('Failed to submit form');
    }

    // Handle successful submission
    const responseData = await response.json();
    console.log('Form submitted successfully:', responseData);
    setSuccessMessageVisible(true)

    // Optionally, close the dialog or perform any other actions
    handleCloseAddStudentDialog();
  } catch (error) {
    // Handle errors
    console.error('Error submitting form:', error);
  } finally {
    setLoading(false);  
  }
}


// Function to Delete a User

   const handleDelete = async () => {
    try {
      if (!selectedStudent || !selectedStudent.email) {
        console.error("No user selected for deletion");
        return;
      }

      console.log("Selected Student:", selectedStudent.email)
      setLoadingDelete(true); // Set loading state to true when starting deletion

      const response = await fetch(
        `https://api.stj-fertilityinstitute.com/api/users?email=${selectedStudent.email}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("User deleted successfully");
        // Optionally, you can refetch the updated user list after deletion
        // fetchStudents();
        setDeleteMessageVisible(true)
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoadingDelete(false); // Set loading state to false when deletion process is complete
      handleCloseDialog(); // Close the dialog regardless of success or failure
    }
    };
    



  const customLabels = {
    sur_name: 'Last Name',
    email: 'Email Address',
    other_name: 'Other name',
    frist_name: 'First name',
    marital_status: 'Marital Status',
    dob: 'Date of birth',
    pob: 'Place of birth',
    state: 'State',
    nationality: 'Nationality',
    address: 'Address',
    phone_number: 'Phone Number',
    office_number: 'Office Number',
    mailing_address: 'Mailing Address',
    institution: 'Institution',
    level: 'Level',
    subject: 'Subject',
    grade: 'Grade',
    date: 'Date',
    name: 'Name',
    nature: 'Nature',
    position: 'Position',
    rank: 'Rank',
    phone: 'Phone Number',
    explaination: 'What are you looking to achieve taking this Program',
    // Add more custom labels as needed
  };



    // Specify a custom getRowId function
    const getRowId = (row) => row._id;
    
    return (
      <Box marginTop="1rem" padding="2rem" width="80vw" height="100vh">
                    <Typography variant="h4" className="mb-4 font-bold text-gray-500">Students</Typography>


      <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setDeleteMessageVisible(false)} severity="success">
            User Deleted successfully! 
          </Alert>
        </Snackbar>



           <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Student added successfully! 
          </Alert>
            </Snackbar>
            

      
        <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Box display="flex" alignItems="center" marginBottom="1rem">
          <TextField
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              backgroundColor: "#FFE3E3",
              borderRadius: "5px",
              color: "#000",
            }}
            InputProps={{
              startAdornment: (
                <SearchOutlinedIcon style={{ marginRight: "8px" }} />
              ),
            }}
          />
          </Box>


          <Box>
             <FormControl variant="outlined" fullWidth>
        <InputLabel id="role-select-label">Role</InputLabel>
        <Select
          labelId="role-select-label"
          id="role-select"
          value={selectedRole}
          onChange={handleRoleChange}
          label="Role"
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="guest">Guest</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
          </Box>

          <Box>
      <Button variant="contained" color="primary" onClick={handleOpenAddStudentDialog}>
              + Add Student
            </Button>
     </Box>

          </Box>
    {loading ? ( // Render loader when loading is true
          <Box display="flex" justifyContent="center" alignItems="center" height={500}>
            <CircularProgress />
          </Box>
        ) : (
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              rows={data.filter(
                (row) =>
                  Object.values(row)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
              )}
              columns={columns}
              pageSize={10}
              style={{ cursor: 'pointer' }}
              onRowClick={(params) => {
                setSelectedStudent(params.row);
                handleOpenDialog();
                }}
                  components={{
          Toolbar: GridToolbar,
        }}
              getRowId={getRowId} // Specify the custom getRowId function
            />
          </div>
        )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
    <Box p={2} style={{ minWidth: '500px' }}>
      <Typography variant="h6">User Details</Typography>
      {selectedStudent && (
        <form>
      {Object.keys(selectedStudent)
      .filter(property => !["_id", "password", "createdAt", "updatedAt"].includes(property))
      .map(property => (
        <div key={property}>
          {property === 'profileimage' ? (
            <img src={selectedStudent[property]} alt="Profile" style={{ width: 100, height: 100, borderRadius: '50%' }} />
          ) : (
            <TextField
              label={property.charAt(0).toUpperCase() + property.slice(1)}
              value={selectedStudent[property]}
              fullWidth
              margin="normal"
              key={property}
            />
          )}
        </div>
                ))}
                <Box mt={2} display="flex" justifyContent="space-between">
                  <Button
      variant="outlined"
      color="primary"
       onClick={() => {
              if (validateForm()) {
                handleSubmit();
              }
            }}    >
      Save
    </Button>
                 <Button
            variant="outlined"
            color="secondary"
            onClick={handleDelete}
            disabled={loadingDelete} // Disable the button when loading
          >
            <Box display="flex" alignItems="center">
              {loadingDelete && (
                <CircularProgress size={24} color="secondary" style={{ marginRight: '8px' }} />
              )}
              Delete
            </Box>
          </Button>
                </Box>
              </form>
            )}
    </Box>
        </Dialog>
        

        {/* Dialog to Add Student */}

      <Dialog open={openAddStudentDialog} onClose={handleCloseAddStudentDialog} maxWidth="md">
        <Box p={2} style={{ minWidth: '500px' }}>
          <Typography variant="h6">Add Student</Typography>
          <form>
              <Typography style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'grey' }} variant="subtitle1">Personal Info</Typography>
              <Typography style={{fontSize: '.9rem', color: 'grey', fontFamily: 'monospace'}}>NOTE: Every single field should be filled</Typography>
            {Object.entries(formData.student_application).map(([key, value]) => (
              key !== "education" && key !== "employment" && key !== "referees" &&
              <TextField
                key={key}
                name={key}
  label={customLabels[key] || key.replace('_', ' ').toUpperCase()} // Use custom labels if available, otherwise fallback to default
                value={value}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            ))}
            <Typography style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'grey'}} variant="subtitle1">Education</Typography>
            {formData.student_application.education.map((edu, index) => (
              <div key={index}>
                {Object.entries(edu).map(([key, value]) => (
                  <TextField
                    key={key}
                    name={`education[${index}].${key}`}
  label={customLabels[key] || key.replace('_', ' ').toUpperCase()} // Use custom labels if available, otherwise fallback to default
                    value={value}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                ))}
              </div>
            ))}
            <Typography style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'grey'}} variant="subtitle1">Employment</Typography>
            {formData.student_application.employment.map((emp, index) => (
              <div key={index}>
                {Object.entries(emp).map(([key, value]) => (
                  <TextField
                    key={key}
                    name={`employment[${index}].${key}`}
  label={customLabels[key] || key.replace('_', ' ').toUpperCase()} // Use custom labels if available, otherwise fallback to default
                    value={value}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                ))}
              </div>
            ))}
            <Typography style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'grey'}} variant="subtitle1">Referees</Typography>
            {formData.student_application.referees.map((ref, index) => (
              <div key={index}>
                {Object.entries(ref).map(([key, value]) => (
                  <TextField
                    key={key}
                    name={`referees[${index}].${key}`}
  label={customLabels[key] || key.replace('_', ' ').toUpperCase()} // Use custom labels if available, otherwise fallback to default
                    value={value}
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                  />
                ))}
              </div>
            ))}
            <TextField
              name="explanation"
              label="What are you looking to achieve taking this Program"
              value={formData.student_application.explanation}
              fullWidth
              margin="normal"
              onChange={handleChange}
              />
      <Typography style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'grey'}} variant="subtitle1">Choose A Program</Typography>

              
<FormControl fullWidth margin="normal">
  <InputLabel id="program-label">Program</InputLabel>
  <Select
    labelId="program-label"
                  id="program"
                  name="program"
    value={formData.program}
    label="Program"
    onChange={handleChange}
  >
    {programOptions.map((program) => (
      <MenuItem key={program.id} value={program.id}>
        {program.title}
      </MenuItem>
    ))}
  </Select>
</FormControl>

            <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="outlined" color="primary" onClick={handleSubmit}>
                  
                   
                     <Box display='flex' justifyContent= 'center' alignItems= 'center'>
                    {loading && <CircularProgress size={20} color="inherit" />}
                  
                    Save
                    </Box>
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseDialog}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Dialog>
      </Box>
    );
  }

  export default Student;



