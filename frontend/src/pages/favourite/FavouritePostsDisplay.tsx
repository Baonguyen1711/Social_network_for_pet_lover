import React, { useEffect, useState } from "react";
import { Post, PostFavourite } from "../../types";
import clsx from "clsx";
import {
  handleDeletePostUserById,
  handleGetFavouritedPostByUserId,
  handleGetPostByPostId,
} from "../../sercives/api";
import PostCard from "../../components/favourite/post/PostCard";
import NotFoundComponent from "./NotFoundComponent";

import style from "./css/FavouritePostsDispaly.module.css";
import PostModal from "../../components/favourite/post/PostModal";
import DetailPostContainer from "../../components/profile/ExpandComment/DetailPostContainer";
import { Provider } from "react-redux";
import { PostProvider } from "../../components/profile/Post/PostContext";

const FavouritePostsDisplay = () => {
  const [posts, setPosts] = useState<PostFavourite[]>();
  const [openModal, setOpenModal] = useState(false);
  const [postId,setPostId] = useState<String>();  
  const [post, setPost] = useState<Post|null|undefined>();
  const handleOpenModal = (id:String|undefined) => {
    //console.log(id,"aaaaaaaaa")
    setPostId(id)
    setOpenModal(true);
  } 
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await handleGetFavouritedPostByUserId();
      setPosts(result);
    };
    fetchData();
  }, []);
  const onDelete = async (postUserId: String | undefined) => {
    const response = await handleDeletePostUserById(postUserId);
    if (response.deletedPetUser) {
      alert("Xoá thành công");
      setPosts((prevPets) => prevPets?.filter((pet) => pet._id !== postUserId));
    } else {
      alert("Lỗi gì đó");
    }
  };
  useEffect(() => {
    const fetchData= async() =>
    {
        const userId = localStorage.getItem("userId")
        const response = await handleGetPostByPostId(postId,userId)
        //console.log("abc",response)
        setPost(response)
    }
    fetchData()
  }, [postId]);
  return (
    <div className={clsx(style.container)}>
      <p className={clsx(style.all)}>Tất cả</p>
      {posts && posts.length > 0 ? (
        posts.map((post, index) => (
          <PostCard
            key={index}
            data={post}
            onDelete={onDelete}
            handleOpenModal={handleOpenModal}
          />
        ))
      ) : (
        <NotFoundComponent />
      )}
      {post !== undefined &&
        <PostProvider
        post={post?post:null}
      >
      <DetailPostContainer open={openModal} handleClose={handleCloseModal}/>
      </PostProvider>
      }
      
    </div>
  );
};

export default FavouritePostsDisplay;
