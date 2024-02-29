import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const AddPost = () => {
  const [postContent, setPostContent] = useState('');
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePostContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };

  const handleTagsChange = (event) => {
    setTags(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Custom form validation
    if (postContent.length < 10) {
      setErrorMessage('Post content must be at least 10 characters.');
      return;
    }

    if (!tags.trim()) {
      setErrorMessage('Please enter at least one tag.');
      return;
    }

    // Here you can submit the post data to your backend or perform any other action
    console.log('Post Content:', postContent);
    console.log('Image:', image);
    console.log('Tags:', tags);
    // Reset form fields after submission
    setPostContent('');
    setImage(null);
    setTags('');
    setErrorMessage('');
  };

  return (
    <div style={{ marginLeft: '50px' }}> {/* Adjust the left margin according to your requirement */}
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
              id="image-upload"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span">
                Upload Image
              </Button>
            </label>
            {image && <p>Selected Image: {image.name}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="tags"
              label="Tags"
              variant="outlined"
              fullWidth
              value={tags}
              onChange={handleTagsChange}
              margin="normal"
              error={errorMessage && !tags.trim()}
              helperText={errorMessage && 'Please enter at least one tag.'}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="outlined" color="primary">
              Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPost;
