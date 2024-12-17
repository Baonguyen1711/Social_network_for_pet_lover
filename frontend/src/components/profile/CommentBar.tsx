import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import style from "./css/CommentBar.module.css";
import {
  Avatar,
  Button,
  IconButton,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { PostComment,IComment ,Post, UserInfo, User } from "../../types";
import { Share } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { getUserByUserId } from "../../sercives/api";

interface Props {
  postId:string|undefined|null
  parentId?:string|undefined|null
  onAddComment?: (newComment: IComment|undefined) => void
  content?: string|null
}
const CommentBar = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [fields, setFields] = useState<PostComment>({
    content: "",
    postId: props.postId?props.postId:"",
    userId: "",
    parentId: props.parentId?props.parentId:"",
  });
  const [loading, setLoading] = useState(false);
  const [currentUser,setCurrentUser] = useState<User>();
  useEffect(()=>{
    fetchUserData()
  },[])
  //
  const fetchUserData = async () => { 
    const userId = localStorage.getItem("userId")
    setCurrentUser(await getUserByUserId(userId))
  };
  const handlePostComment = async () => {
    if(fields.content==="") 
    {
      return;
    }
    console.log("dsadsajasdskdajkdjsadkjs",fields)
    //setLoading(true);
    try {
      const url = `http://localhost:5000/api/v1/comment/create`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: fields.content,
          postId: fields.postId,
          userId: localStorage.getItem("userId"),
          parentId: fields.parentId,
        }),
      });
      if (response.ok) {
        const data = await response.json()
        //console.log("dasdkajkasjdksdjasksajask",data.newComment)
        props.onAddComment?.(data.newComment)
        //console.log("Comment posted successfully");
        setFields((prev)=>({ ...prev,content: "" }));
      }
    } catch (e) {
      console.log("Error: ", e);
    } 
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const id = target.id;
    const value = target.value;
    setFields((fields) => ({
      ...fields,
      ...{
        [id]: value,
      },
    }));
  };
  return (
    <div className={style.container}>
      <Avatar src={currentUser?.avatar} />
      <div className={style.inputContent}>
        <TextField
          id="content"
          inputRef={ref}
          placeholder={
            "Đang bình luận dưới tên " +
            currentUser?.firstname +
            " " +
            currentUser?.lastname
          }
          sx={{
            flexGrow: 1,
            border: "0px",
            borderRadius: 2,
          }}
          value={fields.content}
          multiline
          maxRows={6}
          fullWidth
          onChange={onChange}
        />
      </div>
      <IconButton onClick={handlePostComment}>
        <SendIcon />
      </IconButton>
    </div>
  );
})

export default CommentBar;
