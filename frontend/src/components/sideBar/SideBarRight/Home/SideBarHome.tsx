import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Avatar, AvatarGroup, Button } from "@mui/material";

import RecentChatsList from "./RecentChatsList/RecentChats";
import SearchBar from "../../../shared/SearchBar/SearchBar";
import style from "./SideBarHome.module.css";
import NotFollowContainer from './NotFollowContainer'
import CardUpCommingEvent from "./CardUpCommingEvent";
import { RecentChatInSideBar } from '../../../../types';

const SideBarHome = () => {

  const [chatsList,setChatsList] = useState<RecentChatInSideBar[]>()
  const currentEmail = localStorage.getItem("email")
  useEffect(() => {
    const fetchData = async () => {
      const url = `http://localhost:5000/api/v1/message/recent?email=${currentEmail}`;

      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error in getting message");
        }
        const data  = await response.json();
        if (data.recentMessages.length > 0) {
          
          setChatsList(data.recentMessages);
        } else {
          console.log("No chats found");
        }
      } catch (e) { 
        console.error("Error fetching data:", e);
      }
    };

    fetchData(); // Call fetchData inside useEffect
  }, []);
  return (
    <div
      className={clsx(style.container)}
      style={{ position: "fixed", top: 0, height: "100vh", overflowY: "auto" }}
    >
      <SearchBar placeHolderString="Search for friend" />
      <div className={clsx(style.recent_chats_box)}  >
        <h1 className={clsx(style.title)}>Recent Chats</h1>
        <RecentChatsList chatsList={chatsList}/>
        <NotFollowContainer/>
        <div className={clsx(style.line)}></div>
        <div
          className={clsx(style.mightLikeTitle)}
          style={{ justifyContent: "space-between", display: "flex" }}
        >
          <h5>Upcoming Events</h5>
          <h5 className={style.titleClick}>See all</h5>
        </div>
        <CardUpCommingEvent/> 
      </div>
    </div>
  )
}

export default SideBarHome;
