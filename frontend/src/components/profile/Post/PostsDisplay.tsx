import React, { useState, useEffect, useContext, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyData, setIsEmptyData] = useState(false);
  const { url, setUrl,targetUserId } = useContext(AccessUrlContext)!;
  const postsContainerRef = useRef<HTMLDivElement>(null);

  const toggleDisplayToolBox = () => {
    setIsDisplayTool((prev) => !prev);
  };

  const fetchData = async () => {
    if (!url|| isEmptyData || isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${url}&page=${page}&limit=10`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error in getting posts");
      }
      const data = await response.json();
      if (data.posts.length === 0) {
        console.log('fecth',data.posts)
        setIsEmptyData(true); // Dữ liệu trả về rỗng, dừng tải thêm
        setTimeout(() => setIsEmptyData(false), 1000); // Sau 0.5s cho phép tiếp tục tải nếu có dữ liệu
      }
      setPostsData((prevPosts) => [...prevPosts, ...data.posts]); // Thêm bài viết mới vào bài viết cũ
      setUser(data.user);
    } catch (e) {
      console.error("Error fetching data:", e);
    } finally {
      setIsLoading(false); // Kết thúc việc tải dữ liệu
    }
  };

  const fetchNewData = async () => {
    if (!url) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${url}&page=1&limit=10`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Error in getting posts");
      }
      const data = await response.json();
      setPostsData(data.posts);
      setUser(data.user);
    } catch (e) {
      console.error("Error fetching data:", e);
    }finally {
      setIsLoading(false); // Kết thúc việc tải dữ liệu
    }
  };

  const updatePostsState = async () => {
    try {
      fetchNewData();
    } catch (error) {
      console.error("Error updating post state:", error);
    }
  };

  const handleScroll = () => {
    if (!postsContainerRef.current) return;
    const scrollPosition =
      postsContainerRef.current.scrollTop +
      postsContainerRef.current.clientHeight;
    const bottomPosition = postsContainerRef.current.scrollHeight;
    if (scrollPosition >= bottomPosition-80&&postsData.length>0) {
      setPage((prevPage) => prevPage + 1); // Cập nhật số trang để tải thêm bài viết
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [page]);
  useEffect(() => {
    fetchNewData();
  }, [url]);
  useEffect(() => {
    const interval = setInterval(updatePostsState, 15000); // Cập nhật bài viết mỗi 15s
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  // useEffect(() => {
  //   if (postsContainerRef.current) {
  //     postsContainerRef.current.addEventListener("scroll", handleScroll); // Lắng nghe sự kiện cuộn chỉ trong container bài viết
  //   }
  //   return () => {
  //     if (postsContainerRef.current) {
  //       postsContainerRef.current.removeEventListener("scroll", handleScroll); // Dọn dẹp sự kiện khi component unmount
  //     }
  //   };
  // }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 50px)", 
        overflowY: "auto",
        mx: "auto",
        mt: 4,
      }}
      ref={postsContainerRef}
    >
      {
        localStorage.getItem("userId") !== targetUserId ?
        <PostRequestBar
        user={user}
        toggleDisplayToolBox={toggleDisplayToolBox}
        isDisplayTool={isDisplayTool}
        updatePostsState={updatePostsState}
      />:("")
      }
      
      {postsData?.length > 0
        ? (<> {postsData.map((post) => (
            <PostProvider post={post} key={post._id}>
              <PostInformationCard updatePostsState={updatePostsState} />
            </PostProvider>
          ))}
          {}
          </>)
        : "Don't have any post"}
    </Box>
  );
};

export default PostsDisplay;
