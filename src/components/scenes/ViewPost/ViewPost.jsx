import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, TablePagination, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
  import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Cookies from 'js-cookie';




// Store the endpoint in a variable
const API_ENDPOINT = "https://api.stj-fertilityinstitute.com";


const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));
Alert.displayName = 'CustomAlert';



const ViewPost = () => {
      const [token, setToken] = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false); // New state for loading detail
    const [isSuccessMessageVisible, setSuccessMessageVisible] = useState(false);
    const [loadingDeleteMap, setLoadingDeleteMap] = useState({}); // Use an object to track loading state for each row
      const [loadingDelete, setLoadingDelete] = useState(false); // State to track delete loading




  
    
    
    
  // useEffect to fetch data on component mount
  useEffect(() => {

    const authToken = Cookies.get('authToken');

     if (authToken) {
      setToken(authToken);
      console.log('Post Token:', authToken)
    }
   

// Before making the fetch call
console.log('Using Auth Token:', authToken);


    const fetchData = async (authToken) => {
       
// Inside the fetch call
console.log('Request Headers:', {
  "Authorization": `Bearer ${authToken}`,
  "Content-Type": "application/json"
});


          setLoading(true);

       try {

        const response = await fetch(`${API_ENDPOINT}/api/posts`, {
          headers: {
            "Authorization": `bearer ${authToken}`,
              "Content-Type": "application/json"



          }
        });
        const postData = await response.json();

        const adminPost = postData.filter(post => post.userId?.role !== 'admin' ) 
        console.log("All Post:", postData)

        setPosts(adminPost);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false)

      } finally {
        setLoading(false)
      }
    };






    fetchData(authToken);
  }, []); // Empty dependency array means it will run only once on component mount
  
    
    



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

  


 
  // Function to handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
  // Set loading state for the clicked row to true
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
        setPosts(posts.filter(post => post._id !== postId));
        // Optionally, you can show a success message using a Snackbar or similar component
        // Example: showSnackbar('Post deleted successfully', 'success');
        // fetchData()
        console.log("Post Delete Successfully!");
        setSuccessMessageVisible(true)

      } else {
        // Handle error case
        // Optionally, you can show an error message using a Snackbar or similar component
        // Example: showSnackbar('Error deleting post', 'error');
                console.error("Failed to delete psot", response.status);

      }
    } catch (error) {
      console.error('Error deleting post:', error);
      setLoadingDelete(false)

    } finally {
 setLoadingDeleteMap((prevLoadingDeleteMap) => ({
        ...prevLoadingDeleteMap,
        [postId]: false,
      }));    }
    };
    


    // Filter posts based on search term
    const filteredPosts = posts.filter(post =>
        post.userId?.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.userId?.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box className="container mx-auto p-6" style={{ width:"80vw", padding:"2rem 4rem 4rem 4rem" }}>
            

<Snackbar
          open={isSuccessMessageVisible}
          autoHideDuration={5000} // Hide the message after 5 seconds
          onClose={() => setSuccessMessageVisible(false)}
        >
          <Alert onClose={() => setSuccessMessageVisible(false)} severity="success">
            Post Deleted successfully! 
          </Alert>
        </Snackbar>


            {/* <Typography variant="h4" gutterBottom>View Posts</Typography> Added header here */}
            <h1 className="text-3xl font-bold text-gray-500 mb-6">All User Posts</h1>
            <TextField
                label="Search posts"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '1rem' }}
            />

            {loading ?  (
                   <CircularProgress
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '25vh auto',
          }}
        />
             ): (

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Content</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={post.userId?.profileimage} alt="Post" style={{ marginRight: '10px', width: '50px', height: '50px' }} />
                                        <Typography>{post.post}</Typography>
                                    </div>
                                </TableCell>
                                <TableCell>{post.userId?.username}</TableCell>
                                <TableCell>{post.userId?.role}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeletePost(post._id)}
                                    >
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                             {loadingDeleteMap[post._id] && <CircularProgress color="inherit" size={16} style={{ marginRight: 8 }} />}
                                 Delete
                                        </div>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={filteredPosts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
        </TableContainer>
       ) }
        </Box>
    );
};

export default ViewPost;
