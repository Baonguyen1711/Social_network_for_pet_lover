import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Stack,
  Typography,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  AddReaction,
  AddPhotoAlternate,
  Comment,
  Share,
  MoreVert,
  ThumbUp,
  BookmarkBorder,
  Edit,
  Delete,
  VisibilityOff,
  MoreHoriz
} from "@mui/icons-material";
import style from "./css/PostInformationCard.module.css";
import { Like, Post, IComment } from "../../types";
import CommentBar from "./CommentBar";
import ProposalCommentContainer from "./ProposalCommentContainer";
import { getTimeAgo } from "../../helper";
import DetailPostContainer from "./ExpandComment/DetailPostContainer";

interface Props {
  post?: Post;
  updatePostsState?: (returnPost: Post | undefined) => void;
}
const PostInformationCard: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPost, setCurrentPost] = useState(props.post);
  const [isCommentBarDisplay, setIsCommentBarDisplay] = useState(false);
  const open = Boolean(anchorEl);
  const commentRef = useRef<HTMLInputElement>(null);
  const [bonusComment, setBonusComment] = useState<IComment>();
  const [countComment, setCountComment] = useState<number>(0);

  //handletogglemodal
  const [openModal, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const handleAddComment = (newComment: IComment|undefined) => {
    setBonusComment(newComment);
    setCountComment(countComment+1)
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const updateComments = (comments: IComment[]) => {
    setCountComment(comments.length);
  };
  const handleClose = () => {
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
      props.updatePostsState?.(result.deletedPost);
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
            targetType: "post"
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const result = await response.json();
      setCurrentPost(result.updatedPost);
      props.updatePostsState?.(result.updatedPost);
    } catch (e) {
      console.error(e);
    }
  };
  const handleCommentClick = () => {
    setIsCommentBarDisplay(true);
    // Focus vào trường nhập bình luận
    if (commentRef) commentRef.current?.focus();
  };

  return (
    <Card
      sx={{
        borderRadius: "20px !important",
        backgroundColor: "#F9F9F9",
        width: "100%",
        mb: 2,
      }}
    >
      <CardHeader
        avatar={<Avatar alt="User Avatar" src={currentPost?.userInfo.avatar} />}
        action={
          <>
            {/* Nút ba chấm */}
            <IconButton onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>

            {/* Menu với các tùy chọn */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
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
        title={
          currentPost?.userInfo.firstname + " " + currentPost?.userInfo.lastname
        }
        subheader={currentPost?.createdAt && getTimeAgo(currentPost.createdAt)}
      />
      <CardContent>
        <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
          {currentPost?.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {currentPost?.content}
        </Typography>
        {currentPost?.images != undefined && currentPost.images.length > 0 && (
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {currentPost.images.map((url, i) => {
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
            {props.post?.isLiked == null ? (
              <ThumbUp />
            ) : (
              <ThumbUp color="primary" />
            )}
          </IconButton>
          <Typography variant="body2">
          {props.post && props.post.likedUserInfo.length > 0
                      ? props.post.isLiked
                        ? props.post.likedUserInfo.length > 1
                          ? `You and ${props.post.likedUserInfo.length - 1} other${
                              props.post.likedUserInfo.length - 1 > 1 ? "s" : ""
                            }`
                          : "You"
                        : `${props.post.likedUserInfo[0]?.firstname} ${
                            props.post.likedUserInfo[0]?.lastname
                          }${
                            props.post.likedUserInfo.length > 1
                              ? ` and ${props.post.likedUserInfo.length - 1} other${
                                  props.post.likedUserInfo.length - 1 > 1 ? "s" : ""
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
                textDecoration:"underline",
                cursor:"pointer"
              },
            }}
            onClick={handleOpenModal}
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
        sx={{ paddingBottom: "0px !important", position: "relative" }}
      >
        <ProposalCommentContainer
          newComment={bonusComment}
          postId={props.post?._id}
          updateComments={updateComments}
        />
        {props.post && isCommentBarDisplay && (
          <CommentBar
            ref={commentRef}
            post={props.post}
            onAddComment={handleAddComment}
          />
        )}
      </CardContent>
      <DetailPostContainer updatePostsState={props.updatePostsState} open={openModal} handleClose={handleCloseModal} />
    </Card>
  );
};

export default PostInformationCard;
