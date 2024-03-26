import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
  import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import { usePostContext } from './PostContext';




// Store the endpoint in a variable
const API_ENDPOINT = "https://fis.metaforeignoption.com";



// Function to style the Snackbar Alert
const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';



const AddPost = () => {
  const [token, setToken] = useState('');
  

  
   const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [loading, setLoading] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading
  const [loadingDelete, setLoadingDelete] = useState(false); // State to track delete loading
  const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);



  // Initialize state for post data
  const [postData, setPostData] = useState({
    post: '',
    media: [],
  });

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
    // Update post data state
    setPostData((prevData) => ({ ...prevData, post: event.target.value }));
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  // const handleTagsChange = (event) => {
  //   setTags(event.target.value);
  // };




  const handleSubmit = async (event) => {
  const authToken = Cookies.get('authToken');

     if (authToken) {
      setToken(authToken);
      console.log('Token:', authToken)
    }

    event.preventDefault();

    // Custom form validation
    if (postContent.length < 10) {
      setErrorMessage('Post content must be at least 10 characters.');
      return;
    }

    // if (!tags.trim()) {
    //   setErrorMessage('Please enter at least one tag.');
    //   return;
    // }

   

    try {
       // Set loading to true to indicate that the request is in progress
    setLoading(true);

       // Check if an image is selected
      if (image) {

 const formData = new FormData();
    formData.append('file', image); // Use 'file' as the property name

        // Upload image directly using the image state
        const uploadResponse = await fetch(`${API_ENDPOINT}/upload`, {
          method: 'POST',
          body: formData,
        });
      

      if (!uploadResponse.ok) {
        throw new Error('Image upload failed');
      }

      const uploadData = await uploadResponse.json();
      const imageLink = uploadData.path; // Assuming the response structure is similar

      // Update post data state with the image link
      setPostData((prevData) => ({ ...prevData, media: [imageLink] }));

      // Make the POST request
      const response = await fetch(`${API_ENDPOINT}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(postData),
      });

      // Check if the request was successful
        if (response.ok) {
        
    // Show the success message
      setSuccessMessageVisible(true);
       // Optionally, hide the success message after a certain duration
    setTimeout(() => {
      setSuccessMessageVisible(false);
    }, 5000); // Hide the message after 5 seconds (adjust the duration as needed)


        console.log('Post submitted successfully!');
        // Reset form fields after successful submission
        setPostContent('');
        setImage(null);
        setTags('');
        setErrorMessage('');
      } else {
        // Handle errors here (e.g., display an error message)
        console.error('Error submitting post:', response.status);
      }
      }
    } catch (error) {
      console.error('Error submitting post:', error.message);
      setLoading(false);
    } finally {
      // Set loading back to false, regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div> {/* Adjust the left margin according to your requirement */}
      
   {/* Add Program Message */}
         <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Post made successfully! 
          </Alert>
      </Snackbar>



      <h2 className='text-gray-500'>Add Post</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="postContent"
              label="What's on your mind"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={postContent}
              onChange={handlePostContentChange}
              margin="normal"
              error={errorMessage && postContent.length < 10}
              helperText={errorMessage && 'Post content must be at least 10 characters.'}
              style={{ maxWidth: 'calc(100vw - 250px)' }} // Adjust this value according to your sidebar width
            />
          </Grid>
          <Grid item xs={12}>
            <input
              accept="image/*"
              id="file"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="file">
              <Button variant="outlined" component="span">
                Upload Image
              </Button>
            </label>
            {image && <p>Selected Image: {image.name}</p>}
          </Grid>
      
          <Grid item xs={12}>

            <Button type="submit" variant="outlined" color="primary">
  <div style={{ display: 'flex', alignItems: 'center', color: '#3B8AD8' }}>
                 {loading && <CircularProgress size={20} style={{ marginLeft: '8px', color:'#3B8AD8' }} />}
                Post
                </div>
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPost;
