import React, { createContext, ReactNode, useState } from 'react'
import { Post } from '../../types';

interface PostContextType {
    post: Post | null; // Giá trị post hiện tại
    setPost: (post: Post) => void; // Hàm cập nhật post
  }

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode; post: Post }> = ({ children, post }) => {
    const [currentPost, setCurrentPost] = useState<Post>(post);
  
    return (
      <PostContext.Provider value={{ post: currentPost, setPost: setCurrentPost }}>
        {children}
      </PostContext.Provider>
    );
  };
