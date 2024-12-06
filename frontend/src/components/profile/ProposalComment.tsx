import React, { useContext, useState } from "react";
import { IComment } from "../../types";
import { Avatar, Card, IconButton } from "@mui/material";
import style from "./css/ProposalComment.module.css";
import { getTimeAgo } from "../../helper";
import { ThumbUp, MoreHoriz } from "@mui/icons-material";
import { PostContext, PostProvider } from "./PostContext";
import clsx from "clsx";
import CommentBar from "./CommentBar";

interface props {
  comment: IComment | undefined;
}
const Comment: React.FC<props> = (props) => {
  const [currentComment, setCurrentComment] = useState(props.comment);
  const [showReplyBar, setShowReplyBar] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const handleLikeComment = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/like/likepost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            targetId: props.comment?._id,
            targetType: "comment",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const result = await response.json();
      setCurrentComment(result.updatedComment);
      //console.log("like commment",result.updatedComment)
    } catch (e) {
      console.error(e);
    }
  };
  const onAddComment = (newComment:IComment) =>
  {
    
  }
  const handleReply = async () => {
    console.log("reply successfully");
    // try {
    //   const response = await fetch(
    //     "http://localhost:5000/api/v1/comment/reply",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         userId: localStorage.getItem("userId"),
    //         parentId: props.comment?._id,
    //         content: replyContent,
    //       }),
    //     }
    //   );
    //   if (!response.ok) {
    //     throw new Error("Failed to post reply");
    //   }
    //   setReplyContent(""); // Reset nội dung
    //   setShowReplyBar(false); // Ẩn ReplyBar sau khi gửi
    // } catch (e) {
    //   console.error(e);
    // }
  };
  return (
    <div className={style.container}>
      <Avatar src={currentComment?.userInfo.avatar} />
      <div className={style.containerRight}>
        <div className={style.card}>
          <div className={style.cardHeader}>
            <h4>
              {props.comment?.userInfo.firstname +
                " " +
                props.comment?.userInfo.lastname}
            </h4>
          </div>
          <div className={style.cardBody}>
            <p>{props.comment?.content}</p>
          </div>
        </div>
        <div className={style.cardFooter}>
          <div className={style.cardFooterActions}>
            <p style={{ fontSize: "13px", marginTop: "1px" }}>
              {currentComment?.createdAt &&
                getTimeAgo(currentComment?.createdAt)}
            </p>
            <button
              className={clsx({
                [style.like]: currentComment?.isLiked != null,
              })}
              onClick={handleLikeComment}
            >
              Like
            </button>
            <button
              className={style.replyBtn + " " + style.btn}
              onClick={() => setShowReplyBar(!showReplyBar)}
            >
              Reply
            </button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifySelf: "right",
            }}
          >
            {currentComment?.likedUserInfo ? (
              currentComment?.likedUserInfo.length > 0 ? (
                <>
                  <p style={{ fontSize: "13px" }}>
                    {currentComment?.likedUserInfo.length}{" "}
                  </p>
                  <ThumbUp sx={{ marginLeft: "5px" }} color="primary" />
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
        {showReplyBar && <CommentBar/>}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </div>
    </div>
  );
};

export default Comment;
