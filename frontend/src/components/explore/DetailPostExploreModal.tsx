import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ExpandComment from "../profile/ExpandComment/ExpandComment";
import { BookmarkBorder, Share, Comment, ThumbUp } from "@mui/icons-material";
import { handleLikePost } from "../../sercives/api";
import style from "./css/DetailPostExploreModal.module.css";
import { IComment, Post } from "../../types";
import { getTimeAgo } from "../../helper";
import CommentBar from "../profile/CommentBar";
interface Props {
  post: Post;
  onClose: () => void;
}
const DetailPostExploreModal: React.FC<Props> = ({ post, onClose }) => {
  const [countComment, setCountComment] = useState<number>(0);
  const [currentPost, setCurrentPost] = useState<Post>(post);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [newCommentsArray, setNewCommentsArray] = useState<IComment[]>();

  const updateComments = (comments: IComment[]) => {
    setCountComment(comments.length);
  };
  const handleLike = async () => {
    const updatedPost = await handleLikePost(post?._id);
    setCurrentPost(updatedPost);
  };
  const handleCommentClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };
  const handleAddComment = (newComment: IComment | undefined) => {
    if (!newComment) return;
    setNewCommentsArray((prev)=>prev?[...prev,newComment]:[newComment])
    //setCountComment(countComment + 1);
  };
  return (
    <div className={style.modal_container}>
      <div className={style.modal_contentBox}>
        <div style={{ position: "absolute" }}>
          <Button onClick={onClose} variant="outlined" sx={{ margin: "0px" }}>
            X
          </Button>
        </div>
        <Box
          sx={{
            height: "100%",
            margin: "0px",
            marginTop: "40px",
            width: "100%",
          }}
        >
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                alignItems: "center",
                borderBottom: "1px solid #708258",
                padding: "5px",
              }}
            >
              <div style={{ display: "flex" }}>
                <Avatar src={currentPost.userInfo.avatar}></Avatar>
                <div style={{ marginLeft: "20px" }}>
                  <p style={{ fontWeight: "500" }}>
                    {currentPost.userInfo.firstname +
                      " " +
                      currentPost.userInfo.lastname}
                  </p>
                  <p>{getTimeAgo(currentPost.createdAt)}</p>
                </div>
              </div>
              <div style={{ margin: "5px 0px" }}>
                <p style={{ fontSize: "18px", fontWeight: "600" }}>
                  {currentPost.title}
                </p>
                <Typography sx={{ fontSize: "16px" }} variant="body2">
                  {currentPost.content}
                </Typography>
              </div>
            </Box>

            <CardActions
              disableSpacing
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "background.paper",
                zIndex: 10,
                borderBottom: "2px solid #708258",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton onClick={handleLike}>
                  {currentPost?.isLiked == null ? (
                    <ThumbUp />
                  ) : (
                    <ThumbUp color="primary" />
                  )}
                </IconButton>
                <Typography variant="body2">
                  {/* Hiển thị số lượt thích */}
                  {currentPost && currentPost.likedUserInfo.length > 0
                    ? currentPost.isLiked
                      ? currentPost.likedUserInfo.length > 1
                        ? `You and ${
                            currentPost.likedUserInfo.length - 1
                          } other${
                            currentPost.likedUserInfo.length - 1 > 1 ? "s" : ""
                          }`
                        : "You"
                      : `${currentPost.likedUserInfo[0]?.firstname} ${
                          currentPost.likedUserInfo[0]?.lastname
                        }${
                          currentPost.likedUserInfo.length > 1
                            ? ` and ${
                                currentPost.likedUserInfo.length - 1
                              } other${
                                currentPost.likedUserInfo.length - 1 > 1
                                  ? "s"
                                  : ""
                              }`
                            : ""
                        }`
                    : ""}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1} ml="auto" alignItems="center">
                <IconButton onClick={handleCommentClick}>
                  <Comment />
                </IconButton>
                <Typography
                  variant="body2"
                  sx={{
                    margin: "0px 0px 0px 5px !important",
                    "&:hover": {
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                >
                  {countComment} comments
                </Typography>
                <IconButton>
                  <BookmarkBorder />
                </IconButton>
                <IconButton>
                  <Share />
                </IconButton>
              </Stack>
            </CardActions>

            <CardContent
              sx={{
                flexGrow: 1,
                display: "inline-block",
                maxHeight: "65%",
                overflowY: "scroll",
                scrollbarWidth: "thin",
                "&::-webkit-scrollbar": {
                  width: "0.4em",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#888",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {post && (
                <Box>
                  <ExpandComment
                    level={0}
                    newCommentsArray={newCommentsArray}
                    postId={post._id}
                    updateComments={updateComments}
                  />
                </Box>
              )}
            </CardContent>

            <Box
              sx={{
                position: "sticky",
                backgroundColor: "background.paper",
                boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
              }}
            >
              {post && (
                <CommentBar
                  ref={commentInputRef}
                  postId={post._id}
                  onAddComment={handleAddComment}
                />
              )}
            </Box>
          </Card>
        </Box>
      </div>
      <div className={style.modal_img}>
        <img src={currentPost.images.at(0)} alt={currentPost.content} />
      </div>
    </div>
  );
};

export default DetailPostExploreModal;
