  import React, { useState, useEffect } from "react";
  import { DataGrid, GridHeader } from "@mui/x-data-grid";
  import {
    Box,
    Typography,
    Button,
    Dialog,
    TextField,
    Select,
    IconButton, useTheme, InputAdornment
  } from "@mui/material";
  import InputBase from "@mui/material/InputBase";
  import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
  import "../../../assets/styles/Student.css";
import CircularProgress from '@mui/material/CircularProgress';
  import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';



  function CustomHeader(props) {
    return <GridHeader {...props} className="bold-header" />;
  }




  function Student() {
    const [data, setData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(true); // State to track loading
    const [loadingDelete, setLoadingDelete] = useState(false); // State to track delete loading
      const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);



    useEffect(() => {
      fetchStudents();
    }, []); // Fetch data when the component mounts

    const columns = [
      { field: "profileimage", headerName: "Profile", width: 100, renderCell: (params) => <img src={params.value} alt="Profile" style={{ width: 50, height: 50, borderRadius: '50%' }} /> },
      { field: "username", headerName: "Username", width: 150 },
      { field: "country", headerName: "Country", width: 120 },
      { field: "phone", headerName: "Phone", width: 120 },
      { field: "vstatus", headerName: "VStatus", width: 120 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "role", headerName: "Role", width: 120 },
    ];

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRhbm55SXllIiwidXNlcklkIjoiNjVlODViNDUyNDU3N2JmZDMyMGNjMmVjIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzA5NzQwNTQ2fQ.i4K-14N5_X0dmj7GK6m8wNVJH5Fb3M14g5z20bAkDTQ";

    const fetchStudents = async () => {
      try {
        const response = await fetch(
          "https://fis.metaforeignoption.com/api/users?type=student",
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );
        const studentsData = await response.json();
        setData(studentsData);
              setLoading(false); // Set loading to false when data is fetched

      } catch (error) {
        console.error("Error fetching students:", error);
        setLoading(false); // Set loading to false when data is fetched

      }
    };

    // Specify a custom getRowId function
    const getRowId = (row) => row._id;

    const handleOpenDialog = () => {
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    };

    const handleSave = () => {
      // Handle saving logic here
      handleCloseDialog();
    };



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
        `https://fis.metaforeignoption.com/api/users?email=${selectedStudent.email}`,
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
        fetchStudents();
        setSuccessMessageVisible(true)
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
    



    return (
      <Box marginTop="1rem" padding="2rem" width="80vw" height="100vh">

      <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            User Deleted successfully! 
          </Alert>
        </Snackbar>



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
              getRowId={getRowId} // Specify the custom getRowId function
            />
          </div>
        )}

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
    <Box p={2} style={{ minWidth: '500px' }}>
      <Typography variant="h6">User Details</Typography>
      {selectedStudent && (
        <form>
      {Object.keys(selectedStudent).map((property) => (
                  <div key={property}>
                    {property === 'profileImage' ? (
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
                  <Button variant="outlined" color="primary" onClick={handleSave}>
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

      </Box>
    );
  }

  export default Student;



