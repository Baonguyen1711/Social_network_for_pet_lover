import React, { useState } from "react";
import style from "./css/CommentBar.module.css";
import {
  Avatar,
  Button,
  IconButton,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { PostComment,IComment ,Post, UserInfo } from "../../types";
import { Share } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

interface Props {
  post: Post;
  onAddComment?: ((newComment: IComment) => void)|undefined;
}
const CommentBar: React.FC<Props> = (props) => {
  const [fields, setFields] = useState<PostComment>({
    content: "",
    postId: "",
    userId: "",
    parentId: "",
  });
  const [loading, setLoading] = useState(false);
  const handlePostComment = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/v1/comment/create`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: fields.content,
          postId: props.post._id,
          userId: localStorage.getItem("userId"),
          parentId: fields.parentId,
        }),
      });
      if (response.ok) {
        const data = await response.json()
        console.log("datareturn",data)
        props.onAddComment?.(data.newComment)
        console.log("Comment posted successfully");
        setFields({ content: "", postId: "", userId: "", parentId: "" });
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
      <Avatar src={props.post.userInfo.avatar} />
      <div className={style.inputContent}>
        <TextField
          id="content"
          placeholder={
            "Đang bình luận dưới tên " +
            props.post.userInfo.firstname +
            " " +
            props.post.userInfo.lastname
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
};

export default CommentBar;
