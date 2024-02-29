import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, TablePagination, Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const ManagePosts = () => {
  // Dummy posts data
  const dummyPosts = [
    { id: 1, content: 'Welcome to my show.', tags: ['#new', '#start'], imageUrl: 'https://via.placeholder.com/150', date: '2022-02-13' },
    { id: 2, content: 'This is a new beginning.', tags: ['#wow', '#fire'], imageUrl: 'https://via.placeholder.com/150', date: '2022-02-12' },
    // Add more dummy posts here
    { id: 3, content: 'Another post.', tags: ['#another', '#post'], imageUrl: 'https://via.placeholder.com/150', date: '2021-12-25' },
    { id: 4, content: 'Yet another post.', tags: ['#yet', '#another'], imageUrl: 'https://via.placeholder.com/150', date: '2021-10-15' },
    { id: 5, content: 'One more post.', tags: ['#one', '#more'], imageUrl: 'https://via.placeholder.com/150', date: '2021-08-30' },
   ];

  // State to store the list of posts
  const [posts, setPosts] = useState(dummyPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [isViewClicked, setIsViewClicked] = useState(false); // New state for tracking view button click
  const classes = useStyles();

  // Function to handle deleting a post
  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  // Function to handle view post
  const handleViewPost = (post) => {
    setSelectedPost(post);
    setEditMode(false); // Reset edit mode when viewing post
    setEditRowId(null);
    setIsViewClicked(true); // Set view clicked to true
  };

  // Function to handle edit post
  const handleEditPost = (postId) => {
    const postToEdit = posts.find(post => post.id === postId);
    setSelectedPost(postToEdit);
    setEditMode(true);
    setEditRowId(postId);
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

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="ml-10 w-full">
      <Typography variant="h6" className="mb-4 font-bold text-gray-500">Manage Posts</Typography>
      <TextField
        label="Search posts"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={isViewClicked ? classes.deeperColor : ''}>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell className={classes.actionButtons}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(post => (
              <TableRow key={post.id}>
                <TableCell>{post.content}</TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell className={classes.actionButtons}>
                  <div className={classes.buttonContainer}>
                    <Button variant="outlined" color="primary" onClick={() => handleViewPost(post)}>View</Button>
                    {!editMode && editRowId !== post.id && (
                      <Button variant="outlined" color="primary" onClick={() => handleEditPost(post.id)}>Edit</Button>
                    )}
                    <Button variant="outlined" color="error" onClick={() => handleDeletePost(post.id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPosts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Dialog open={selectedPost !== null} onClose={handleCloseViewPost}>
        <DialogContent className={classes.dialogContent} sx={{ padding: '20px' }}>
          {!editMode ? (
            <>
              <DialogContentText>
                {selectedPost && selectedPost.content}
              </DialogContentText>
              <DialogContentText>
                <img src={selectedPost && selectedPost.imageUrl} alt="Post" />
              </DialogContentText>
            </>
          ) : (
            <div style={{ width: '100%' }}>
              <TextField
                label="Content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={selectedPost && selectedPost.content}
                onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                className="mb-4"
                style={{ marginBottom: '20px' }} 
              />
              <TextField
                label="Image URL"
                variant="outlined"
                fullWidth
                disabled
                value={selectedPost && selectedPost.imageUrl}
                className="mb-4"
                style={{ marginBottom: '20px' }} 
              />
              <Button variant="outlined" component="label">
                Upload Image
                <input type="file" hidden />
              </Button>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewPost} color="primary">
            Cancel
          </Button>
          {editMode && (
            <Button onClick={handleCloseViewPost} color="primary">
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManagePosts;
