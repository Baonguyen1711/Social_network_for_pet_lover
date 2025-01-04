import React, { useEffect, useState } from "react";
import clsx from "clsx";

import { Avatar, AvatarGroup, Button } from "@mui/material";
import { Event } from "../../../../types";
import style from "./UpCommingEvent.module.css";
import {formatDate} from '../../../../helper'
const CardUpCommingEvent = () => {
  const [chatsList, setChatsList] = useState<Event[]>();
  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_API_URL}/api/v1/event/all`;

      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error in getting message");
        }
        const data = await response.json();
        if (data.upcomingEvent.length > 0) {
          setChatsList(data.upcomingEvent);
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
    <>
      { chatsList?.map((chat,index) => {
        return (
          <div key={index} className={style.upcomingEventCard}>
            <div className={style.headerCard}>
              <Avatar src={chat.imageUrl} />
              <div className={style.headerContent}>
                <h5>{chat.eventName}</h5>
                <h4 className={style.location}>{chat.location}</h4>
                <h6>{formatDate(chat.dateTime.toString())}</h6>
              </div>
            </div>
            <div className={style.contentCard}>
              {chat.description}
            </div>
            <div></div>
          </div>
        );
      })}
    </>
  );
};

export default CardUpCommingEvent;
