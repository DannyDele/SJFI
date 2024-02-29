import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, TablePagination, Box } from '@mui/material';

const ViewPost = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [posts, setPosts] = useState([
    { "id": 1, "content": "The sky is blue.", "user": "User 1", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 2, "content": "Water boils at 100 degrees Celsius.", "user": "User 2", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 3, "content": "Plants need sunlight to grow.", "user": "User 3", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 4, "content": "Gravity pulls objects towards the Earth.", "user": "User 4", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 5, "content": "The Earth orbits around the Sun.", "user": "User 5", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 6, "content": "Oxygen is essential for human life.", "user": "User 6", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 7, "content": "Photosynthesis is the process by which plants make their own food.", "user": "User 7", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 8, "content": "The human body is made up of cells.", "user": "User 8", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 9, "content": "The Earth has four layers: crust, mantle, outer core, and inner core.", "user": "User 9", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 10, "content": "Light travels faster than sound.", "user": "User 10", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 11, "content": "The human brain is responsible for coordinating bodily functions.", "user": "User 11", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 12, "content": "Rocks are classified into three types: igneous, sedimentary, and metamorphic.", "user": "User 12", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 13, "content": "The water cycle involves evaporation, condensation, and precipitation.", "user": "User 13", "imageUrl": "https://via.placeholder.com/150" },
    { "id": 14, "content": "The human skeleton provides structure and support for the body.", "user": "User 14", "imageUrl": "https://via.placeholder.com/150" }
    ]);

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

    const handleDeletePost = (postId) => {
        setPosts(posts.filter(post => post.id !== postId));
    };

    // Filter posts based on search term
    const filteredPosts = posts.filter(post =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box p={2}>
            {/* <Typography variant="h4" gutterBottom>View Posts</Typography> Added header here */}
            <Typography variant="h5" gutterBottom className='text-gray-500'>All User Posts</Typography>
            <TextField
                label="Search posts"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '1rem' }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Content</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPosts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <img src={post.imageUrl} alt="Post" style={{ marginRight: '10px', width: '50px', height: '50px' }} />
                                        <Typography>{post.content}</Typography>
                                    </div>
                                </TableCell>
                                <TableCell>{post.user}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => handleDeletePost(post.id)}
                                    >
                                        Delete
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
        </Box>
    );
};

export default ViewPost;
