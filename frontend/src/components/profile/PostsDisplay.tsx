import React, { useState,useEffect } from 'react'
import PostInformationCard from './PostInformationCard'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField, Stack, Typography } from "@mui/material";
import { AddReaction, AddPhotoAlternate, Comment, Share, MoreVert, ThumbUp, BookmarkBorder, Edit, Delete, VisibilityOff } from "@mui/icons-material";
import style from './css/PostsDisplay.module.css'
import PostToolDisplay from './PostToolDisplay';
import { Like, Post, User } from '../../types';
import { PostProvider } from './PostContext';
const PostsDisplay = () => {
  const [isDisplayTool, setIsDisplayTool] = useState(false);
  const [postsData,setPostsData] = useState<Post[]>([])
  const [user,setUser] = useState<User>()
  const toggleDisplayToolBox = () => {
    setIsDisplayTool((prev) => !prev);
  };
  const onCreatedPost = async (newPost: Post | undefined) =>{
    // if (newPost != undefined) {
    //   setPostsData((prevPosts) => {
    //     return [...prevPosts, newPost]; // Cập nhật postsData với bài viết mới
    //   });
    await  fetchData();
    //}
  };
  const updatePostsState = async (returnPost :Post|undefined )=>{
    try 
    {
      await fetchData()
    } 
    catch (error)
    {
      console.error("Error updating post state:", error)
    }
  }
  useEffect(() => {
    fetchData(); // Call fetchData inside useEffect
  }, []);
  const fetchData = async () => { 
    console.log("fetchhhhhh")
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:5000/api/v1/post/getpostsbyid?userId=${userId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error in getting message");
      }
      const data = await response.json();
      if (data.posts.length > 0) {
        setPostsData(data.posts);
        setUser(data.user)
      } else {
        console.log("User haven't post anything");
      }
    } catch (e) { 
      console.error("Error fetching data:", e);
    }
  };
  return (
    <Box sx={{ width: "100", mx: "auto", mt: 4 }}>
      {/* Top post input area */}
      <Card
        sx={{
          mb: 3,
          padding: 2,
          borderRadius: "20px !important",
          backgroundColor: "#F7F7F7",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center" display={"flex"}>
          <Avatar alt="User Avatar" src={user?.avatar}/>
          <TextField
            placeholder="Share something"
            sx={{
              flexGrow: 1,
              border:"0px",
              borderRadius: 2,
              }}
            multiline
            maxRows={6}
            fullWidth
            onClick={toggleDisplayToolBox}
          />
          
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Button
            className={style.btn}
            sx={{ margin: "0px 20px" }}
            startIcon={<AddPhotoAlternate />}
            onClick={toggleDisplayToolBox}
          >
            Photos
          </Button>
          <Button
            className={style.btn}
            sx={{ margin: "0px 20px" }}
            startIcon={<AddReaction />}
            onClick={toggleDisplayToolBox}
          >
            Emotion
          </Button>
        </Stack>
        {isDisplayTool&&<PostToolDisplay isOpen={isDisplayTool} onClose={toggleDisplayToolBox} onCreatedPost={onCreatedPost}/>}
      </Card>
      { ( postsData!=undefined&& postsData?.length>0 )? (postsData?.map((post,index)=>{
      return <PostProvider post={post}><PostInformationCard post={post} type= {1} updatePostsState={updatePostsState}  /></PostProvider>
      })) : "Don't have any post"}
    </Box>
  )
}

export default PostsDisplay
