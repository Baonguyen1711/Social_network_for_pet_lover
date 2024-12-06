import React, { createContext, ReactNode, useState } from 'react'
import { Post,IComment } from '../../types';

interface PostContextType {
    post: Post | null; // Giá trị post hiện tại
    setPost: (post: Post) => void; // Hàm cập nhật post
    setComment: (comment:IComment) => void; // Hàm cập nhật post
    userId: String|null
    comment?: IComment | null
  } 

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider: React.FC<{ children: ReactNode; post: Post; userId:string,comment?:IComment }> = ({ children, post,userId,comment }) => {
    const [currentPost, setCurrentPost] = useState<Post>(post);
    const [currentComment, setCurrentComment] = useState<IComment|undefined>(comment);
    return (
      <PostContext.Provider value={{ post: currentPost, setPost: setCurrentPost, userId: userId,comment:currentComment,setComment: setCurrentComment }}>
        {children}
      </PostContext.Provider>
    );
  };
