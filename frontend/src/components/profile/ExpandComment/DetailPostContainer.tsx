import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import { PostContext } from "../PostContext";
import ExpandComment from "./ExpandComment";
import {
  BookmarkBorder,
  Delete,
  Edit,
  MoreVert,
  Share,
  ThumbUp,
  VisibilityOff,
  Comment,
} from "@mui/icons-material";
import { getTimeAgo } from "../../../helper";
import { IComment, Post } from "../../../types";
import CommentBar from "../CommentBar";
interface props {
  open: boolean;
  handleClose: () => void;
  updatePostsState?: (returnPost: Post | undefined) => void;
}
const DetailPostContainer: React.FC<props> = ({
  open,
  handleClose,
  updatePostsState,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const { post, setPost } = useContext(PostContext)!;
  const [currentPost, setCurrentPost] = useState(post);
  const openAnChor = Boolean(anchorEl);
  const [countComment, setCountComment] = useState<number>(0);
  const [bonusComment, setBonusComment] = useState<IComment>();
  const handleAddComment = (newComment: IComment|undefined) => {
    setBonusComment(newComment);
    setCountComment(countComment + 1);
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const updateComments = (comments: IComment[]) => {
    setCountComment(comments.length);
  };
  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/post/delete?postId=${currentPost?._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      const result = await response.json();
      updatePostsState?.(result.deletedPost);
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleHide = () => {
    console.log("Hide clicked");
  };
  const handleLike = async () => {
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
            targetId: currentPost?._id,
            targetType: "post",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const result = await response.json();
      setCurrentPost(result.updatedPost);
      setPost(result.updatedPost);
      //updatePostsState?.(result.updatedPost);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCommentClick = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            "&.MuiBox-root": {
              padding: "0px !important", // Targeting the root specifically
            },
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            maxWidth: "700px",
            maxHeight: "80vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "10px",
              justifyContent: "space-between",
              position: "sticky",
              alignItems: "center",
            }}
          >
            <Typography sx={{ display: "inline-block" }}>
              Bài viết của{" "}
              {post?.userInfo.firstname + " " + post?.userInfo.lastname}
            </Typography>
            <Button
              onClick={handleClose}
              variant="outlined"
              sx={{ margin: "0px" }}
            >
              X
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto", // Cho phép nội dung cuộn
            }}
          >
            <Card
              sx={{
                borderRadius: "0px 0px 20px 20px !important",
                backgroundColor: "#F9F9F9",
                width: "100%",
                mb: 2,
              }}
            >
              <CardHeader
                avatar={
                  <Avatar alt="User Avatar" src={post?.userInfo.avatar} />
                }
                action={
                  <>
                    {/* Nút ba chấm */}
                    <IconButton onClick={handleMenuClick}>
                      <MoreVert />
                    </IconButton>

                    {/* Menu với các tùy chọn */}
                    <Menu
                      anchorEl={anchorEl}
                      open={openAnChor}
                      onClose={handleCloseAnchor}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                    >
                      <MenuItem
                        sx={{ justifyContent: "flex-start" }}
                        onClick={handleEdit}
                      >
                        <Edit />
                        Edit
                      </MenuItem>
                      <MenuItem
                        sx={{ justifyContent: "flex-start" }}
                        onClick={handleDelete}
                      >
                        <Delete />
                        Delete
                      </MenuItem>
                      <MenuItem
                        sx={{ justifyContent: "flex-start" }}
                        onClick={handleHide}
                      >
                        <VisibilityOff />
                        Hide
                      </MenuItem>
                    </Menu>
                  </>
                }
                title={post?.userInfo.firstname + " " + post?.userInfo.lastname}
                subheader={post?.createdAt && getTimeAgo(post.createdAt)}
              />
              <CardContent>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
                  {post?.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post?.content}
                </Typography>
                {post?.images != undefined && post.images.length > 0 && (
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {post.images.map((url, i) => {
                      return (
                        <img
                          id={i + ""}
                          src={url}
                          alt="Cat with style 1"
                          width="100%"
                          style={{
                            borderRadius: 8,
                            maxHeight: "500px",
                            maxWidth: "500px",
                            objectFit: "cover",
                          }}
                        />
                      );
                    })}
                  </Stack>
                )}
              </CardContent>
              <CardActions disableSpacing>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton onClick={handleLike}>
                    {post?.isLiked == null ? (
                      <ThumbUp />
                    ) : (
                      <ThumbUp color="primary" />
                    )}
                  </IconButton>
                  <Typography variant="body2">
                    {post && post.likedUserInfo.length > 0
                      ? post.isLiked
                        ? post.likedUserInfo.length > 1
                          ? `You and ${post.likedUserInfo.length - 1} other${
                              post.likedUserInfo.length - 1 > 1 ? "s" : ""
                            }`
                          : "You"
                        : `${post.likedUserInfo[0]?.firstname} ${
                            post.likedUserInfo[0]?.lastname
                          }${
                            post.likedUserInfo.length > 1
                              ? ` and ${post.likedUserInfo.length - 1} other${
                                  post.likedUserInfo.length - 1 > 1 ? "s" : ""
                                }`
                              : ""
                          }`
                      : ""}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  ml="auto"
                  alignItems="center"
                >
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
              <CardContent sx={{ paddingBottom: "0px !important" }}>
                {post && (
                  <ExpandComment
                    newComment={bonusComment}
                    postId={post._id}
                    updateComments={updateComments}
                  />
                )}
              </CardContent>
            </Card>
          </Box>
          <Box
            sx={{
              position: "sticky",
              width: "100%",
              backgroundColor: "background.paper",
              zIndex: 10,
              boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            }}
          >
            {post && (
              <CommentBar
                ref={commentInputRef}
                post={post}
                onAddComment={handleAddComment}
              />
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DetailPostContainer;
