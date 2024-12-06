import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from './css/HomeForm.module.css'
import { Post, User } from "../../types";
import PostsDisplay from "../profile/PostsDisplay";
import { HomePostsContext, HomePostsProvider } from "./HomeContext";

const HomeForm = () => {
  const [userData,setUserData] = useState<User>()
  const [isDisplayTool, setIsDisplayTool] = useState(false);
  const toggleDisplayToolBox = () => {
    setIsDisplayTool((prev) => !prev);
  };
  useEffect(() => {
    fetchData(); // Call fetchData inside useEffect
  }, []);
  const fetchData = async () => { 
    const userId = localStorage.getItem('userId')
    const url = `http://localhost:5000/api/v1/user/getbyid?userId=${userId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error in getting user");
      }
      const data = await response.json();
      setUserData(data.user);
    } catch (e) { 
      console.error("Error fetching data:", e);
    }
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
  return (
    <div className={style.coverContainer}>
      <div className={style.bodyContainer}>
        <HomePostsProvider>
        <PostsDisplay/>
        </HomePostsProvider>
        </div>
        </div>
  );
};

export default HomeForm;
