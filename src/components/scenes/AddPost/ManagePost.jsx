import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Dialog,
 Box
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';
  import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Cookies from 'js-cookie';





// Store the endpoint in a variable
const API_ENDPOINT = "https://fis.metaforeignoption.com";


const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';


const useStyles = makeStyles({
  actionButtons: {
    '& button': {
      marginRight: '8px',
    },
  },
  dialogContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center align content
    gap: '16px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
  },
  deeperColor: {
    color: '#333', // Adjust the color code as needed
  },
});

const ManagePosts = ({ posts, updatePosts }) => { // Accept updatePosts prop

    const [token, setToken] = useState('');
    

  const classes = useStyles(); // Make sure to initialize useStyles and get the classes object


  // State to store the list of posts
 // State to store the list of posts
  // const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [isViewClicked, setIsViewClicked] = useState(false); // New state for tracking view button click
  const [loading, setLoading] = useState(false); // New state for loading detail
   const [loadingUpdate, setLoadingUpdate] = useState(false); // State to track delete loading
  const [loadingDelete, setLoadingDelete] = useState(false); // State to track delete loading
   const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
  const [isDeleteMessageVisible, setDeleteMessageVisible] = useState(false);
  const [isUpdateMessageVisible, setUpdateMessageVisible] = useState(false);
  const [loadingDeleteMap, setLoadingDeleteMap] = useState({}); // Use an object to track loading state for each row
  
  
  // Define state variable to store the edited post content
const [editedPostContent, setEditedPostContent] = useState('');



  
  
// useEffect to fetch data on component mount
  useEffect(() => {
    const authToken = Cookies.get('authToken');
      if (authToken) {
      setToken(authToken);
      console.log('Token:', token)
    }

    const fetchData = async (authToken) => {
          setLoading(true);

  try {
    const response = await fetch(`${API_ENDPOINT}/api/posts`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    });
    const postData = await response.json();
    console.log('Admin Post:', postData)

    const adminPost = postData.filter(post => post.userId?.role === 'admin');
    console.log("All Post:", postData);
        console.log("Admin Posts:", adminPost);


    updatePosts(adminPost); // Update posts using updatePosts prop
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    setLoading(false);
  }
};


  fetchData(authToken);
}, []); // Empty dependency array means it will run only once on component mount
  
  
  






  
  
  
  
  
  


// Function to handle view post
  const handleViewPost = async (postId) => {
    try {
      setIsViewClicked(true);
      setLoading(true);

      // Make an API request to fetch the detailed information of the selected post
      const response = await fetch(`${API_ENDPOINT}/api/posts/${postId}`);
      const postData = await response.json();
      
        // Update the editedPostContent state with the post content
    // setEditedPostContent(postData.post);

      setSelectedPost(postData);
    } catch (error) {
      console.error('Error fetching post details:', error);
    } finally {
      setLoading(false);
    }
  };



 
  // Function to handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
        setLoadingDeleteMap((prevLoadingDeleteMap) => ({
            ...prevLoadingDeleteMap,
            [postId]: true,
        }));

        const response = await fetch(`${API_ENDPOINT}/api/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "Authorization": `bearer ${token}`,
            }
        });

        if (response.ok) {
            updatePosts(posts.filter(post => post._id !== postId)); // Update posts using updatePosts prop
            setSuccessMessageVisible(true);
        } else {
            console.error("Failed to delete post", response.status);
        }
    } catch (error) {
        console.error('Error deleting post:', error.message);
    } finally {
        setLoadingDeleteMap((prevLoadingDeleteMap) => ({
            ...prevLoadingDeleteMap,
            [postId]: false,
        }));
    }
};



  const [openDialog, setOpenDialog] = useState(false); // New state for dialog

  // Function to open the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPost(null);
    setEditMode(false);
    setEditRowId(null);
  };


  // Function to handle input change for the post field
const handlePostInputChange = (e) => {
  setEditedPostContent(e.target.value);
};
  
  

 

 // Function to handle edit post
  const handleEditPost = (postId) => {
    const postToEdit = posts.find(post => post._id === postId);
    if (postToEdit) {
      // Update the editedPostContent state with the post content
      setEditedPostContent(postToEdit.post);
    
      setSelectedPost(postToEdit);
      setEditMode(true);
      setEditRowId(postId);
      setOpenDialog(true); // Open the dialog when editing
      handleOpenDialog(); // Open the dialog when editing
    }
  }


    // Function to handle save edit
 const handleSaveEdit = async () => {
  try {
    setLoadingUpdate(true); // Set loading state to true while the update is in progress
    console.log('Selected post:', selectedPost._id)

    const response = await fetch(`${API_ENDPOINT}/api/posts/${selectedPost._id}`, {
      method: 'PUT', // Assuming you want to perform a PUT request to update the post
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ 
        // You may need to construct the body payload based on the data you want to update
        // For example, if you want to update the post content, comments, likes, and media, you can do:
        post: selectedPost.post,
      }),
    });

    if (response.ok) {
      // Optionally, you can handle success scenarios here, such as showing a success message
      console.log('Post updated successfully!');
      setUpdateMessageVisible(true);
      // You may also want to refetch the data to update the post list
    } else {
      // Handle error cases
      console.error('Failed to update post:', response.status);
      // Optionally, show an error message
    }
  } catch (error) {
    console.error('Error updating post:', error.message);
  } finally {
    setLoadingUpdate(false); // Reset loading state
    handleCloseDialog(); // Close the dialog regardless of success or failure
  }
};




  // Function to close the view post dialog
  const handleCloseViewPost = () => {
    setSelectedPost(null);
    setEditMode(false);
    setEditRowId(null);
    setIsViewClicked(false); // Reset view clicked
  };

  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

 


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

 const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};


   // Map your data to include an 'id' property
  const postsWithId = posts.map((post) => ({
    ...post,
    id: post._id, // Use _id as the id property
  }));

   const filteredPosts = postsWithId.filter((post) => {
    const postContent = post.post && post.post.toLowerCase();
    return postContent.includes(searchTerm?.toLowerCase());
  });

const columns = [
    { field: 'post', headerName: 'Title', flex: 1 },
  {
    field: 'createdAt',
    headerName: 'Date',
    flex: 1,
    renderCell: (params) => (
  <span>
        {params.row.userId &&
          formatDate(params.row.createdAt)}
      </span>    ),
  },    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <div className={classes.buttonContainer}>
     
          {!editMode && editRowId !== params.id && (
            <Button
              color="primary"
  onClick={() => handleEditPost(params.id)} // Call handleViewPost instead of handleEditPost
            >
              View
            </Button>
          )}
  <Button
            onClick={() => handleDeletePost(params.id)}
            color="secondary"
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
              {loadingDeleteMap[params.id] && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}
              Delete
            </div>
          </Button>
        </div>
    ),
      
    },
  ];


  // Function to format date
const formatDate = (dateTimeString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
  const formattedDate = new Date(dateTimeString).toLocaleDateString(undefined, options);
  return formattedDate;
};




  return (
    <div >

      
      {/* Delete Success Message */}
    <Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Post Deleted successfully! 
          </Alert>
      </Snackbar>
      

      {/*Update Success Message  */}
    <Snackbar
          open={isUpdateMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setUpdateMessageVisible(false)}
        >
          <Alert onClose={() => setUpdateMessageVisible(false)} severity="success">
            Post Updated successfully! 
          </Alert>
        </Snackbar>



      <h2 variant="h6" className="mb-4 font-bold text-gray-500">Manage Posts</h2>
      <TextField
        label="Search posts"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
        style={{marginBottom:'1rem'}}
      />


     {loading ? (
        <CircularProgress
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '25vh auto',
          }}
        />
      ) : (
        <div style={{ height: 400, width: '110%' }}>
          <DataGrid
            rows={postsWithId} // Use the data with the 'id' property
            columns={columns}
            pageSize={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[rowsPerPage]}
              rowCount={filteredPosts.length}
               components={{
          Toolbar: GridToolbar,
        }}
          />
        </div>
      )}
           <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md">
        <Box p={2} style={{ minWidth: '500px' }}>
          <Typography variant="h6">View Post</Typography>
          {selectedPost && (
            <form>
          <TextField
  label="Post"
  name="post"
  value={editedPostContent}
  fullWidth
  margin="normal"
  onChange={handlePostInputChange}
/>
        <TextField
          label="Comments"
          value={selectedPost.comments}
          fullWidth
          margin="normal"
        />
      
      
              <Box mt={2} display="flex" justifyContent="space-between">
                <Button variant="outlined" color="primary" onClick={handleSaveEdit}>
                {loadingUpdate && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}

                  Update
                </Button>
                {/* ... (previous code) */}
              </Box>
            </form>
          )}
        </Box>
      </Dialog>
    </div>
  );
};

export default ManagePosts;
