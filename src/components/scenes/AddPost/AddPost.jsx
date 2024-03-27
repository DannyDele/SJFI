import React, {useState} from 'react';
import { Grid } from '@mui/material';
import Add from './Add';
import ManagePost from './ManagePost';

const AddPost = () => {
    const [posts, setPosts] = useState([]);

  return (
    <div style={{padding:"2rem 4rem 4rem 4rem", width:"80vw", height:"100vh"}}>
      <div className="min-w-fit max-w-5xl flex">
        <div className="w-1/2 p-4">
          <Add posts={posts} updatePosts={setPosts}  />
        </div>
        <div className="w-1/2 p-4">
          <ManagePost posts={posts} updatePosts={setPosts} />
        </div>
      </div>
    </div>
  );
};

export default AddPost;
