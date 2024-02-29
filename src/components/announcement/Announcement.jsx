import  { useState, useEffect } from 'react';
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
    DialogActions
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';


function Announcement() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [trends, setTrends] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [submitting, setSubmitting] = useState(false); // Added submitting state
    const [selectedTrend, setSelectedTrend] = useState(null);



    

    useEffect(() => {
      
        const sendTrend = async () => {
            const trend = await fetch('https://fis.metaforeignoption.com/api/subjects', {
                method: 'GET',
                headers: {
                    "accept": "application/json"
                }
            })

            const trendData = await trend.json();
          setTrends(trendData)
                          setLoading(false); // Set loading to false once data is fetched

        }

        sendTrend()
    }, [])

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    icon: null,
    cover_image: '',
    details: '',
    author: '',
  });

  const handleAddModalOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddModalClose = () => {
    setFormData({
      title: '',
      category: '',
      icon: null,
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
    if (event.target.name === 'icon') {
      const file = event.target.files[0];
      setFormData({
        ...formData,
        icon: file,
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
    // Step 1: Upload Image
    const imageFormData = new FormData();
    imageFormData.append('file', formData.icon);

    const imageUploadResponse = await fetch('https://fis.metaforeignoption.com/upload', {
      method: 'POST',
      body: imageFormData,
    });

    if (!imageUploadResponse.ok) {
      console.error('Error uploading image:', imageUploadResponse.status, imageUploadResponse.statusText);
      return;
    }

    const imageData = await imageUploadResponse.json();

    // Step 2: Submit Trend Data
    const trendResponse = await fetch('https://fis.metaforeignoption.com/api/subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        icon: imageData.path,
      }),
    });

    if (trendResponse.ok) {
      const trendData = await trendResponse.json();

      // Step 3: Fetch the image separately and update the state
      const imagePath = trendData.icon;
      const imageUrl = `https://fis.metaforeignoption.com/file/${imagePath}`;

      const imageResponse = await fetch(imageUrl);
      if (imageResponse.ok) {
        // Assuming the response is an image, you may need to adjust the logic accordingly
        const blob = await imageResponse.blob();
        const imageUrlObject = URL.createObjectURL(blob);

        // Update state with the image URL
        setTrends((prevTrends) => [...prevTrends, { ...trendData, icon: imageUrlObject }]);

        // Close the modal and reset the form data
        setFormData({
          title: '',
          category: '',
          icon: null,
          coverImage: '',
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
  }
};


  // Function to delete Trend


  const handleSelectTrend = (trend) => {
    setSelectedTrend(trend);
  };

  const handleDeleteTrend = async () => {
  try {
    // Set submitting to true when the form is being submitted
    setSubmitting(true);

    if (!selectedTrend) {
      // If no trend is selected, do nothing
      return;
    }

    const apiUrl = `https://fis.metaforeignoption.com/api/subjects/${selectedTrend._id}`;

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
    console.log('Trend deleted successfully!');
  } catch (error) {
    console.error('Error deleting trend:', error);
    // Handle the error appropriately (e.g., show an error message to the user)
  } finally {
    // Set submitting back to false whether the submission was successful or not
    setSubmitting(false);
  }
};



  const handleViewDetails = (index) => {
    setFormData(trends[index]);
    setOpenViewModal(true);
    setIsEditMode(true);
    setEditIndex(index);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      icon: file,
    });
  };

  const handleEditFormSubmit = () => {
    setTrends((prevTrends) => {
      const updatedTrends = [...prevTrends];
      updatedTrends[editIndex] = formData;
      return updatedTrends;
    });

    setOpenViewModal(false);

    setFormData({
      title: '',
      category: '',
      icon: null,
      cover_image: '',
      details: '',
      author: '',
    });
    setIsEditMode(false);
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
      updatedTrends[editIndex].icon = null; // Set the icon to null to remove the image
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

  return (
    <div>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (<Box marginTop='1rem' padding='2rem' width='80vw' height='100vh'>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAddModalOpen}>
          Add Announcement
        </Button>

       
        {trends.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Image</TableCell> {/* Added Image header */}

                </TableRow>
              </TableHead>
              <TableBody>
                {trends.map((trend, index) => (
<TableRow key={index} onClick={() => { handleViewDetails(index); handleSelectTrend(trend); }} style={{ cursor: 'pointer' }}>
                    <TableCell>{trend.title}</TableCell>
                    <TableCell>{trend.category}</TableCell>
                    <TableCell>
                      {trend.icon && (
                        <img
                          src={trend.icon}
                          alt="Trend Image"
                          style={{ maxWidth: '50px', maxHeight: '50px', cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleExpandImage(trend.icon)
                          }}
                        />
                      )}
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
                  <MenuItem value="Trending">Trending</MenuItem>
                  <MenuItem value="Featured">Featured</MenuItem>
                  <MenuItem value="Recommended">Recommended</MenuItem>
                  {/* Add more MenuItem components for additional categories */}
                </Select>
              </FormControl>
              <TextField
                label="Cover Image"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
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
              <TextField
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
              <label htmlFor="fileInput" style={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" component="span">
                  <CloudUploadIcon />
                </IconButton>
                <span style={{ marginLeft: '8px', fontSize: '14px', color: '#555555' }}>
                  {formData.icon ? `Selected file: ${formData.icon.name}` : 'Choose an Icon'}
                </span>
              </label>
              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
              <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                Submit
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
                  <MenuItem value="Trending">Trending</MenuItem>
                  <MenuItem value="Featured">Featured</MenuItem>
                  <MenuItem value="Recommended">Recommended</MenuItem>
                  {/* Add more MenuItem components for additional categories */}
                </Select>
              </FormControl>
              <TextField
                label="Icon"
                name="icon"
                value={formData.icon}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Cover Image"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />
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
              <TextField
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleFormChange}
                fullWidth
                margin="normal"
              />

              {/* Conditionally render the submit button based on the form mode */}
                {isEditMode ? (
                  <Box>
                <Button  color="primary"  onClick={handleEditFormSubmit}>
                  Update
                  </Button>
                <Button  color="secondary" onClick={handleDeleteTrend}>
                    Delete
                    </Button>
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
