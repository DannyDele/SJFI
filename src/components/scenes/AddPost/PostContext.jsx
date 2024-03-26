import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const updatePosts = (newPosts) => {
    setPosts(newPosts);
  };

  return (
    <PostContext.Provider value={{ posts, updatePosts }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
