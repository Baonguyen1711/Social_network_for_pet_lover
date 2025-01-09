import React, { useState, useEffect, useContext } from "react";
import PostInformationCard from "./PostInformationCard";
import { Box } from "@mui/material";
import { PostProvider } from "./PostContext";
import PostRequestBar from "./PostRequestBar";
import { AccessUrlContext } from "../AccessUrlContext";
import { User, Post } from "../../../types";

const PostsDisplay = () => {
  const [isDisplayTool, setIsDisplayTool] = useState(false);
  const [postsData, setPostsData] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();
  const [page, setPage] = useState(1); // Thêm state phân trang
  const { url, setUrl } = useContext(AccessUrlContext)!;

  const toggleDisplayToolBox = () => {
    setIsDisplayTool((prev) => !prev);
  };

  const fetchData = async () => {
    if (!url) return;
    console.log("asdad")
    try {
      const response = await fetch(`${url}&page=${page}&limit=10`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error in getting posts");
      }
      const data = await response.json();
      setPostsData((prevPosts) => [...prevPosts, ...data.posts]); // Thêm bài viết mới vào bài viết cũ
      setUser(data.user);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const updatePostsState = async () => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error updating post state:", error);
    }
  };

  const handleScroll = () => {
    const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
    const bottomPosition = document.documentElement.offsetHeight;
    if (scrollPosition >=  bottomPosition / 2) {
      setPage((prevPage) => prevPage + 1); // Cập nhật số trang để tải thêm bài viết
    }
  };

  useEffect(() => {
    //console.log("fetch")
    fetchData(); // Call fetchData inside useEffect when URL or page changes
  }, [url, page]);

  useEffect(() => {
    const interval = setInterval(updatePostsState, 15000); // Cập nhật bài viết mỗi 15s
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Thêm sự kiện cuộn vô hạn
    return () => {
      window.removeEventListener("scroll", handleScroll); // Dọn dẹp sự kiện khi component unmount
    };
  }, []);

  return (
    <Box sx={{ width: "100%", mx: "auto", mt: 4  }}>
      <PostRequestBar
        user={user}
        toggleDisplayToolBox={toggleDisplayToolBox}
        isDisplayTool={isDisplayTool}
        updatePostsState={updatePostsState}
      />
      {postsData?.length > 0
        ? postsData.map((post) => (
            <PostProvider post={post} key={post._id}>
              <PostInformationCard updatePostsState={updatePostsState} />
            </PostProvider>
          ))
        : "Don't have any post"}
    </Box>
  );
};

export default PostsDisplay;
