import React, { useContext, useRef, useState } from "react";
import { IComment, UserInfo } from "../../../types";
import { Avatar, Card, IconButton } from "@mui/material";
import style from "../css/ProposalComment.module.css";
import { getTimeAgo } from "../../../helper";
import { ThumbUp, MoreHoriz } from "@mui/icons-material";
import { PostContext, PostProvider } from "./PostContext";
import clsx from "clsx";
import CommentBar from "../CommentBar";
import ExpandComment from "../ExpandComment/ExpandComment";
import { useNavigate } from "react-router-dom";

interface props {
  comment: IComment | undefined;
  level: number; // cấp 1, cấp 2
  handleCommentParentClick?:
    | ((user: UserInfo | null | undefined) => void)
    | undefined;
}
const Comment: React.FC<props> = (props) => {
  const [currentComment, setCurrentComment] = useState(props.comment);
  //const [countComment, setCountComment] = useState<number|undefined>(props.comment?.replies.length);
  const [showReplyBar, setShowReplyBar] = useState(false);
  const [newCommentsArray,setNewCommentsArray] = useState<IComment[]>([])
  //const [isNewComment, setIsNewComment] = useState<IComment>();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  //const [replyComments, setReplyComments] = useState<IComment[]>();
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
    } catch (e) {
      console.error(e);
    }
  };
  const onAddComment = (newComment: IComment | undefined) => {
    //setCountComment((prev)=>prev?prev+1:0)
    if (!newComment) return;
    setNewCommentsArray((prev)=>prev?[...prev,newComment]:[newComment])
    //setIsNewComment(newComment);
  };
  const updateComments = (comments: IComment[]) => {
    //console.log("lengddsdsdsth",comments.length)
    //setCountComment(comments.length);
  };
  const handleCommentClick = (user: UserInfo | null | undefined) => {
    if (props.level !== 3) setShowReplyBar(true);
    if (commentInputRef.current) {
      commentInputRef.current.focus(); // Tập trung vào input
      if (user) {
        console.log(user.firstname);
        commentInputRef.current.value = user.firstname; // Đặt giá trị cho input
      }
    }
  };
  const handleNavigateToProfile = () => {
    navigate(`/profile/${props.comment?.userId}`);
  };

  return (
    <div className={style.container}>
      <div onClick={handleNavigateToProfile}>
        <Avatar
          src={currentComment?.userInfo.avatar}
          className={style.avatar}
        />
      </div>
      <div className={style.containerRight}>
        <div className={style.card}>
          <div className={style.cardHeader}>
            <h4
              className={clsx(style.userName)}
              onClick={handleNavigateToProfile}
            >
              {props.comment?.userInfo.firstname +
                " " +
                props.comment?.userInfo.lastname}
            </h4>
          </div>
          <div className={style.cardBody}>
            <p className={style.content}>{props.comment?.content}</p>
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
              onClick={() => {
                if (props.level !== 3) setShowReplyBar(true);
                else {
                  if (props.handleCommentParentClick !== undefined) {
                    props.handleCommentParentClick(props.comment?.userInfo);
                  }
                }
                handleCommentClick(null);
              }}
            >
              Reply
            </button>
            <div
        style={{
          alignItems: "center", 
          alignSelf: "flex-start",
        }}
      >
        <IconButton>
          <MoreHoriz />
        </IconButton>
      </div>
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
        {
            <ExpandComment
              newCommentsArray={newCommentsArray}
              handleCommentParentClick={handleCommentClick}
              level={props.level}
              updateComments={updateComments}
              commentParentId={props.comment?._id}
            />
        }
        {showReplyBar && (
          <CommentBar
            onAddComment={onAddComment}
            ref={commentInputRef}
            parentId={currentComment?._id}
            postId={currentComment?.postId}
          />
        )}
      </div>
      
    </div>
  );
};

export default Comment;
