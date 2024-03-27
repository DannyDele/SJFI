import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  DialogTitle,
  DialogContent,
  TextField,
    IconButton,
  DialogActions,
    Typography
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../../assets/styles/Announcement.css'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';






// Store the endpoint in a variable
const API_ENDPOINT = "https://fis.metaforeignoption.com";


// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';



function Announcement() {
    const [token, setToken] = useState('');

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [trends, setTrends] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
      const [loadingDelete, setLoadingDelete] = useState(false); // State to track delete loading
  const [loadingUpdate, setLoadingUpdate] = useState(false); // State to track delete loading
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
    const [isUpdateMessageVisible, setUpdateMessageVisible] = useState(false);


  const [submitting, setSubmitting] = useState(false); // Added submitting state
  const [selectedTrend, setSelectedTrend] = useState(null);
  // Add a state variable to store the fetched usernames
  const [authorOptions, setAuthorOptions] = useState([]);
    const [formData, setFormData] = useState({
    title: '',
    category: '',
    // icon: null,
    cover_image: '',
    details: '',
    author: '',
  });
  
    const [formValid, setFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // Added formSubmitted state


  
useEffect(() => {
  // Check form validity whenever programData changes
  if(formSubmitted){
  const isValid = Object.entries(formData).every(([key, value]) => {
    // If value is a string, trim and check for empty string
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    // // If value is a number (like price), check for non-zero
    // if (typeof value === 'number') {
    //   return value !== 0;
    // }
    // For other types of values, consider them valid
    return true;
  });
    setFormValid(isValid);
    }
  }, [formData, formSubmitted]);






  

// Add a new useEffect hook to fetch teachers when the component mounts
  useEffect(() => {
      const authToken = Cookies.get('authToken');

   if (authToken) {
      setToken(authToken);
      console.log(' Author Token:', authToken)
    }
  fetchAuthors(authToken);
}, []); // Empty dependency array ensures the effect runs only once when the component mounts



  
// Modify the fetchTeachers function
  const fetchAuthors = async (authToken) => {
  
    console.log(
      `
      token: ${authToken}
      `
    )
  try {
    const response = await fetch(`${API_ENDPOINT}/api/users?type=admin`,
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
    const authorUsernames = data.map(user => ({
      id: user._id,
      username: user.username
    }));

    // Update the state with the fetched usernames
    setAuthorOptions(authorUsernames);
  } catch (error) {
    console.error('Error fetching teachers:', error);
  }
};
  
    

    useEffect(() => {
      
        const sendTrend = async () => {
            const trend = await fetch(`${API_ENDPOINT}/api/subjects`, {
                method: 'GET',
                headers: {
                    "accept": "application/json"
                }
            })

          const trendData = await trend.json();
          console.log('Trends Data:', trendData)
          setTrends(trendData)
                          setLoading(false); // Set loading to false once data is fetched

        }

        sendTrend()
    }, [])



  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setFormData({
      title: '',
      category: '',
      // icon: null,
      cover_image: '',
      details: '',
      author: '',
    });

    setOpenAddModal(false);
  };

  const handleViewModalOpen = () => {
    setOpenViewModal(true);
  };

  const handleViewModalClose = () => {
    setOpenViewModal(false);
  };

  const handleFormChange = (event) => {
    if (event.target.name === 'cover_image') {
      const file = event.target.files[0];
      setFormData({
        ...formData,
        cover_image: file,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };


const handleFormSubmit = async () => {
  try {
    setSubmitting(true)
    // Step 1: Upload Image
    const imageFormData = new FormData();
    imageFormData.append('file', formData.cover_image);

    const imageUploadResponse = await fetch(`${API_ENDPOINT}/upload`, {
      method: 'POST',
      body: imageFormData,
    });

    if (!imageUploadResponse.ok) {
      console.error('Error uploading image:', imageUploadResponse.status, imageUploadResponse.statusText);
      return;
    }

    const imageData = await imageUploadResponse.json();
    console.log('Cover Image:', imageData)

    // Step 2: Submit Trend Data
    const trendResponse = await fetch(`${API_ENDPOINT}/api/subjects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        cover_image: `${API_ENDPOINT}/file/${imageData.path}`,
      }),
    });

    if (trendResponse.ok) {
      const trendData = await trendResponse.json();

      console.log('Cover Image Form Data:', trendData);
      setSuccessMessageVisible(true)

      // Step 3: Fetch the image separately and update the state
      const imagePath = trendData.cover_image;
      // const imageUrl = `${API_ENDPOINT}/file/${imagePath}`;

      const imageResponse = await fetch(imagePath);
      if (imageResponse.ok) {
        // Assuming the response is an image, you may need to adjust the logic accordingly
        const blob = await imageResponse.blob();
        const imageUrlObject = URL.createObjectURL(blob);

        // Update state with the image URL
        setTrends((prevTrends) => [...prevTrends, { ...trendData, cover_image: imageUrlObject }]);

        // Close the modal and reset the form data
        setFormData({
          title: '',
          category: '',
          // icon: null,
          cover_image: '',
          details: '',
          author: '',
        });
        setOpenAddModal(false);

        console.log('Trend data submitted successfully!');
      } else {
        console.error('Error fetching image:', imageResponse.status, imageResponse.statusText);
      }
    } else {
      console.error('Error submitting trend data:', trendResponse.status, trendResponse.statusText);
    }
  } catch (error) {
    console.error('Error submitting trend data:', error.message);
  } finally {
    setSubmitting(false)
  }
  };
  

  // Function call to submit form
    const handleSubmit = () => {
    // Set formSubmitted to true when attempting to submit the form
    setFormSubmitted(true);
    // If form is valid, proceed with adding new program
    if (formValid) {
      handleFormSubmit();
    }
  };



  // Function to delete Trend


  const handleSelectTrend = (trend) => {
    setSelectedTrend(trend);
  };

  // Funtion to delete Trend
  const handleDeleteTrend = async () => {
  try {
    // Set submitting to true when the form is being submitted
    setLoadingDelete(true);

    if (!selectedTrend) {
      // If no trend is selected, do nothing
      return;
    }

    const apiUrl = `${API_ENDPOINT}/api/subjects/${selectedTrend._id}`;

    const response = await fetch(apiUrl, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error deleting trend');
    }

    // Remove the selected trend from trends
    const updatedTrends = trends.filter((trend) => trend._id !== selectedTrend._id);
    setTrends(updatedTrends);

    // Reset the form data or other state related to the deleted trend if needed
    setOpenViewModal(false)
    setDeleteMessageVisible(true)
    console.log('Trend deleted successfully!');
  } catch (error) {
    console.error('Error deleting trend:', error);
    // Handle the error appropriately (e.g., show an error message to the user)
  } finally {
    // Set submitting back to false whether the submission was successful or not
    setLoadingDelete (false);
  }
};



 const handleViewDetails = (data) => {
  console.log('View details for row:', data);
  setFormData(data);
  setOpenViewModal(true);
  setIsEditMode(true);
  setEditIndex(trends.findIndex((trend) => trend._id === data._id));
};



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      cover_image: file,
    });
  };


  // Function to update Trend
const handleEditFormSubmit = async () => {
  try {
    setLoadingUpdate(true)
    // Your code for updating the data goes here
    const apiUrl = `${API_ENDPOINT}/api/subjects/${formData._id}`;

    const response = await fetch(apiUrl, {
      method: 'PUT', // Assuming you use the PUT method for updating data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Error updating trend data');
    }

    console.log('Trend data updated successfully!');


     // Update the local state with the modified data
    setTrends((prevTrends) => {
      const updatedTrends = [...prevTrends];
      const updatedIndex = updatedTrends.findIndex((trend) => trend._id === formData._id);
      updatedTrends[updatedIndex] = formData;
      return updatedTrends;
    });
    setUpdateMessageVisible(true)

    // Close the modal and reset the form data
    setOpenViewModal(false);
    setFormData({
      title: '',
      category: '',
      // icon: null,
      cover_image: '',
      details: '',
      author: '',
    });
    setIsEditMode(false);
  } catch (error) {
    console.error('Error updating trend data:', error.message);
    // Handle the error appropriately (e.g., show an error message to the user)
        setLoadingUpdate(false)

  } finally {
    setLoadingUpdate(false)
  }
};

    
    
  const [expandedImage, setExpandedImage] = useState(null);

    const handleExpandImage = (image) => {
                setOpenViewModal(false);

      setExpandedImage(image);

  };

    const handleCloseExpandedImage = () => {
    setOpenViewModal(false);
      setExpandedImage(null);

  };

  const handleDeleteImage = () => {
    // Implement logic to delete the image
    // You may want to ask for confirmation before deleting
    // Update trends state after deleting the image
    setTrends((prevTrends) => {
      const updatedTrends = [...prevTrends];
      updatedTrends[editIndex].cover_image = null; // Set the icon to null to remove the image
      return updatedTrends;
    });
    handleCloseExpandedImage();
  };

  const handleChangeImage = () => {
    // Implement logic to change the image
    // You may want to open a file input or trigger a file selection
    // Update trends state after changing the image
    // For simplicity, let's assume it's similar to adding a new trend with a new image
    handleAddModalOpen();
    handleCloseExpandedImage();
  };


// Function to get Row ID
const getRowId = (row) => row._id;

  return (
    <div className="container mx-auto p-6" style={{ marginLeft: '20px', width:"80vw", padding:"2rem 4rem 4rem 4rem" }}>
      <h1 className="text-3xl font-bold text-gray-500 mb-6" >Trends</h1>



   {/* Snackbar for Success Message */}
        <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Announcement post successful! 
          </Alert>
      </Snackbar>
      
   {/* Snackbar for Delete Message */}
        <Snackbar
          open={isDeleteMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setDeleteMessageVisible(false)}
        >
          <Alert onClose={() => setDeleteMessageVisible(false)} severity="success">
            Announcement deleted successfully! 
          </Alert>
        </Snackbar>

   {/* Snackbar for Update Message */}
        <Snackbar
          open={isUpdateMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setUpdateMessageVisible(false)}
        >
          <Alert onClose={() => setUpdateMessageVisible(false)} severity="success">
            Announcement Updated Successfully! 
          </Alert>
        </Snackbar>




      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (<Box >
        <Button style={{marginBottom: '10px'}} variant="contained" className='All-buttons' onClick={handleAddModalOpen}>
          Add Trend
        </Button>

       
        {trends.length > 0 && (
          <DataGrid
  rows={trends}
  columns={[
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    {
      field: 'author',
      headerName: 'Author',
      flex: 1,
    },


    {
      field: 'cover_image',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => (
        params.row.cover_image && (
          <img
            src={params.row.cover_image}
            alt="Trend Image"
            style={{ maxWidth: '50px', maxHeight: '50px', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              handleExpandImage(params.row.cover_image);
            }}
          />
        )
      ),
    },
  ]}
  pageSize={10} // Set the number of rows per page
  onRowClick={(params) => {
  const clickedRowId = params.row._id;
  const clickedRowData = trends.find((row) => getRowId(row) === clickedRowId);

  if (clickedRowData) {
    console.log('Clicked row data:', clickedRowData);
    handleViewDetails(clickedRowData);
    handleSelectTrend(clickedRowData);
  } else {
    console.error('Row data not found for id:', clickedRowId);
  }
}}


              getRowId={getRowId} // Add this line
                       components={{
          Toolbar: GridToolbar,
        }}
              className="custom-hover-rows"
              


/>

        )}

        <Dialog open={openAddModal} onClose={handleAddModalClose}>
          <DialogTitle>Add Trend</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                fullWidth
                  margin="normal"
                  error={formSubmitted && !formData.title.trim()}
  helperText={formSubmitted && !formData.title.trim() && "Trends title cannot be empty"}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Category</InputLabel>

                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  fullWidth
                    margin="normal"
                    error={formSubmitted && !formData.category.trim()}
  helperText={formSubmitted && !formData.category.trim() && "Trends category cannot be empty"}
                >
                  <MenuItem value="trending">trending</MenuItem>
                  <MenuItem value="featured">featured</MenuItem>
                  <MenuItem value="recommended">recommended</MenuItem>
                  {/* Add more MenuItem components for additional categories */}
                </Select>
              </FormControl>
              {/* <TextField
                label="Cover Image"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              /> */}
              <TextField
                label="Details"
                name="details"
                value={formData.details}
                onChange={handleFormChange}
                fullWidth
                multiline
                rows={4}
                  margin="normal"
                  error={formSubmitted && !formData.details.trim()}
  helperText={formSubmitted && !formData.details.trim() && "Trends details cannot be empty"}
              />
                
      <FormControl fullWidth margin="normal">
    <InputLabel>Select Author</InputLabel>
    <Select
                name="author"
                value={formData.author}
                    onChange={handleFormChange}
                    error={formSubmitted && !formData.author.trim()}
  helperText={formSubmitted && !formData.author.trim() && "Trends author cannot be empty"}
    >
      {authorOptions.map((author, index) => (
        <MenuItem key={index} value={author.username}>
          {author.username}
        </MenuItem>
      ))}
    </Select>
  </FormControl>



              <label htmlFor="fileInput" style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" component="span">
                  <CloudUploadIcon />
                </IconButton>
                <span style={{ marginLeft: '8px', fontSize: '14px', color: '#555555' }}>
                  {formData.cover_image ? `Selected file: ${formData.cover_image.name}` : 'Choose an Image'}
                </span>
              </label>
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                  <Box display='flex' justifyContent='center' alignItems='center'>
                    {submitting && <CircularProgress size={20} color="inherit" />}
                    Submit
                    </Box>
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        {/* View Trend Details Modal */}
        <Dialog open={openViewModal} onClose={handleViewModalClose}>
          <DialogTitle>{isEditMode ? 'Edit' : 'View'} Trend</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Select Category</InputLabel>

                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="trending">trending</MenuItem>
                  <MenuItem value="featured">featured</MenuItem>
                  <MenuItem value="recommended">recommended</MenuItem>
                  {/* Add more MenuItem components for additional categories */}
                </Select>
              </FormControl>
              {/* <TextField
                label="Icon"
                name="icon"
                value={formData.icon}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              /> */}
              {/* <TextField
                label="Cover Image"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              /> */}
              <TextField
                label="Details"
                name="details"
                value={formData.details}
                onChange={handleFormChange}
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
             <FormControl fullWidth margin="normal">
    <InputLabel>Select Author</InputLabel>
    <Select
                name="author"
                value={formData.author}
                onChange={handleFormChange}
    >
      {authorOptions.map((author, index) => (
        <MenuItem key={index} value={author.id}>
          {author.username}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

              {/* Conditionally render the submit button based on the form mode */}
                {isEditMode ? (
                  <Box>
                <Button  color="primary"  onClick={handleEditFormSubmit}>
<Box display="flex" alignItems="center">
              {loadingUpdate && (
                <CircularProgress size={24} color="secondary" style={{ marginRight: '8px' }} />
              )}
              Update
            </Box>                      </Button>
                <Button  style={{color: 'red'}} onClick={handleDeleteTrend}>
 <Box display="flex" alignItems="center">
              {loadingDelete && (
                <CircularProgress size={24}  style={{ marginRight: '8px', color: 'inherit' }} />
              )}
              Delete
            </Box>                    </Button>
                    </Box>
              ) : null}          </form>
          </DialogContent>
        </Dialog>


        <Dialog open={!!expandedImage} onClose={handleCloseExpandedImage}>
          <DialogTitle>Expanded Image</DialogTitle>
          <DialogContent>
            {expandedImage && (
              <img
                src={expandedImage}
                alt="Expanded Trend Image"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseExpandedImage} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      )}
    </div>
  );
}

export default Announcement;
