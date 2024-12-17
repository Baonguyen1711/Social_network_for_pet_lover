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
  ImageList,
  ImageListItem,
} from "@mui/material";
import {
  AddReaction,
  AddPhotoAlternate,
  Comment,
  Share,
  MoreVert,
  ThumbUp,
  Edit,
  Delete,
  VisibilityOff,
  MoreHoriz,
  BookmarkBorder,
} from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import clsx from "clsx";
import style from "../css/PostInformationCard.module.css";
import { Like, Post, IComment } from "../../../types";
import CommentBar from "../CommentBar";
import ProposalCommentContainer from "./ProposalCommentContainer";
import { getTimeAgo } from "../../../helper";
import DetailPostContainer from "../ExpandComment/DetailPostContainer";
import DetaiLikesModal from "./DetailLikesModal";
import { PostContext } from "./PostContext";
import { createPostUserRelationship } from "../../../sercives/api";
import { useNavigate } from "react-router-dom";
interface Props {
  updatePostsState: () => void;
}
const PostInformationCard: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { post, setPost } = useContext(PostContext)!;
  const [isCommentBarDisplay, setIsCommentBarDisplay] = useState(false);
  const open = Boolean(anchorEl);
  const commentRef = useRef<HTMLInputElement>(null);
  const [bonusComment, setBonusComment] = useState<IComment>();
  const [countComment, setCountComment] = useState<number>(0);
  const [openDetailLikes, setOpenDetailLikes] = useState(false);
  const navigate = useNavigate();

  //const [isSaved, setIsSaved] = useState(props.post?.isSaved);
  //const [isLiked, setIsLiked] = useState(props.post?.isLiked);
  //handletogglemodal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleAddComment = (newComment: IComment | undefined) => {
    setBonusComment(newComment);
    setCountComment(countComment + 1);
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
        `http://localhost:5000/api/v1/post/delete?postId=${post?._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      const result = await response.json();
      setAnchorEl(null);
      props.updatePostsState?.();
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
            targetId: post?._id,
            targetType: "post",
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      const result = await response.json();
      //setCurrentPost(result.updatedPost);
      //setPost(result.updatedPost);
      //setIsLiked(result.updatedPost.isLiked)
      props.updatePostsState?.();
    } catch (e) {
      console.error(e);
    }
  };
  const handleCommentClick = () => {
    setIsCommentBarDisplay(true);
    // Focus vào trường nhập bình luận
    if (commentRef) commentRef.current?.focus();
  };
  const handleOpenDetailLikes = () => {
    setOpenDetailLikes(true);
  };
  const handleCloseDetailLikes = () => {
    setOpenDetailLikes(false);
  };
  const handleSavePost = async () => {
    const reponse = await createPostUserRelationship(post?._id);
    props.updatePostsState();
  };
  const handleNavigateToProfile = () => {
    navigate(`/profile/${post?.userId}`);
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
        avatar={
          <Avatar
            alt="User Avatar"
            src={post?.userInfo.avatar}
            className={clsx(style.avatar)}
            onClick={handleNavigateToProfile}
          />
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
              {post?.userInfo._id === localStorage.getItem("userId") ? (
                <MenuItem
                  sx={{ justifyContent: "flex-start" }}
                  onClick={handleEdit}
                >
                  <Edit />
                  Edit
                </MenuItem>
              ) : (
                ""
              )}
              {post?.userInfo._id === localStorage.getItem("userId") ? (
                <MenuItem
                  sx={{ justifyContent: "flex-start" }}
                  onClick={handleDelete}
                >
                  <Delete />
                  Delete
                </MenuItem>
              ) : (
                ""
              )}

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
        title={<p className={style.userName} onClick={handleNavigateToProfile}>{post?.userInfo.firstname + " " + post?.userInfo.lastname}</p>}
        subheader={post?.createdAt && getTimeAgo(post.createdAt)}
      />
      <CardContent>
        {post?.title && (
          <Typography variant="body1" sx={{ mb: 2, fontWeight: "bold" }}>
            {post?.title}
          </Typography>
        )}
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post?.content}
        </Typography>
        {post?.images != undefined && post.images.length > 0 && (
          <ImageList variant="masonry" cols={post.images.length} gap={8}>
            {post.images.map((url, i) => {
              return (
                <ImageListItem key={i + ""}>
                  <img
                    src={`${url}?w=248&fit=crop&auto=format&dpr=2`}
                    loading="lazy"
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton onClick={handleLike}>
            {post?.isLiked ? <ThumbUp color="primary" /> : <ThumbUp />}
          </IconButton>
          <div onClick={handleOpenDetailLikes}>
            <Typography variant="body2" className={style.countLike}>
              {post && post.likedUserInfo.length > 0
                ? `${
                    post.isLiked
                      ? "You"
                      : `${post.likedUserInfo[0]?.firstname} ${post.likedUserInfo[0]?.lastname}`
                  }${
                    post.likedUserInfo.length > 1
                      ? ` and ${post.likedUserInfo.length - 1} other${
                          post.likedUserInfo.length - 1 > 1 ? "s" : ""
                        }`
                      : ""
                  }`
                : ""}
            </Typography>
          </div>
          <DetaiLikesModal
            open={openDetailLikes}
            onClose={handleCloseDetailLikes}
            likedUserInfo={post?.likedUserInfo}
          />
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
            onClick={handleOpenModal}
          >
            {countComment} comments
          </Typography>
          <IconButton onClick={handleSavePost}>
            {post?.isSaved ? (
              <BookmarkIcon style={{ color: "#F17826" }} />
            ) : (
              <BookmarkBorder />
            )}
          </IconButton>
          <IconButton>
            <Share />
          </IconButton>
        </Stack>
      </CardActions>
      <CardContent
        sx={{ paddingBottom: "0px !important", position: "relative",justifySelf:"left" }}
      >
        <ProposalCommentContainer
          newComment={bonusComment}
          postId={post?._id}
          updateComments={updateComments}
          handleLike={handleLike}
          handleSave={handleSavePost}
        />
        {post && isCommentBarDisplay && (
          <CommentBar
            ref={commentRef}
            postId={post._id}
            onAddComment={handleAddComment}
          />
        )}
      </CardContent>
      <DetailPostContainer
        updatePostsState={props.updatePostsState}
        open={openModal}
        handleClose={handleCloseModal}
        handleLike={handleLike}
        handleSave={handleSavePost}
      />
    </Card>
  );
};

export default PostInformationCard;
