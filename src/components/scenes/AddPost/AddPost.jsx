import React from 'react';
import { Grid } from '@mui/material';
import Add from './Add';
import ManagePost from './ManagePost';

const AddPost = () => {
  return (
    <div className="min-h-2/4  max-w-5xl flex items-center justify-center">
      <div className="min-w-fit max-w-5xl flex">
        <div className="w-1/2 p-4">
          <Add />
        </div>
        <div className="w-1/2 p-4">
          <ManagePost />
        </div>
      </div>
    </div>
  );
};

export default AddPost;