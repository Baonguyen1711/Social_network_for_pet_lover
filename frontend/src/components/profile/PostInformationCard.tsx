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
} from "@mui/icons-material";
import style from "./css/PostInformationCard.module.css";
import { Like, Post, IComment } from "../../types";
import CommentBar from "./CommentBar";
import ProposalComment from "./ProposalCommentContainer";
import ProposalCommentContainer from "./ProposalCommentContainer";
import CommentContainer from "./CommentContainer";
import { getTimeAgo } from "../../helper";
import ExpandCommentContainer from "./ExpandComment/ExpandCMTContainer";
import ExpandComment from "./ExpandComment/ExpandComment";

interface Props {
  post?: Post;
  type: number;
  updatePostsState?: (returnPost: Post | undefined) => void;
}
const PostInformationCard: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentPost, setCurrentPost] = useState(props.post);
  const open = Boolean(anchorEl);
  const commentRef = useRef<HTMLInputElement>(null);
  const [bonusComment, setBonusComment] = useState<IComment>();
  const handleAddComment = (newComment: IComment) => {
    setBonusComment(newComment);
  };
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
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
            postId: currentPost?._id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const result = await response.json();
      setCurrentPost(result.updatedPost);
      props.updatePostsState?.(result.updatedPost)
    } catch (e) {
      console.error(e);
    }
  };
  const handleCommentClick = () => {
    // Cuộn đến phần tử bình luận
    commentRef.current?.scrollIntoView({
      behavior: "smooth", // Cuộn mượt
      block: "start", // Cuộn tới đầu phần tử
    });

    // Focus vào trường nhập bình luận
    commentRef.current?.focus();
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
            {props.post?.isLiked == null ? <ThumbUp /> : <ThumbUp color="primary" />}
          </IconButton>
          <Typography variant="body2">
            {props.post?.likedUserInfo.length}{" "}
            {props.post && props.post.likedUserInfo.length > 0
              ? props.post.likedUserInfo.at(0)?._id !== props.post.isLiked.userId
                ? props.post.likedUserInfo.at(0)?.firstname +
                  " " +
                  props.post.likedUserInfo.at(0)?.lastname
                : "You "
              : ""}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} ml="auto">
          <IconButton onClick={handleCommentClick}>
            <Comment />
          </IconButton>
          <Typography variant="body2">10 comments</Typography>
          <IconButton>
            <BookmarkBorder />
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </Stack>
      </CardActions>
      <CardContent sx={{ paddingBottom: "0px !important" }}>
        {props.post &&
          (props.type == 1 ? (
            <ProposalCommentContainer
              newComment={bonusComment}
              postId={props.post._id}
            />
          ) : (
            <ExpandComment newComment={bonusComment} postId={props.post._id} />
          ))}
        {props.post && <CommentBar  post={props.post} onAddComment={handleAddComment} />}
      </CardContent>
    </Card>
  );
};

export default PostInformationCard;
