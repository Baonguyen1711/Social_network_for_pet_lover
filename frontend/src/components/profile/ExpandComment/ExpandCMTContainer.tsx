import React, { useContext, useState } from "react";
import CommentBar from "../CommentBar";
import { Post, IComment } from "../../../types";
import ExpandComment from "./ExpandComment";

const CommentContainer = () => {
  // const { post } = useContext(PostContext)!;
  // const [bonusComment, setBonusComment] = useState<Comment>();
  // const handleAddComment = (newComment: IComment) => {
  //   setBonusComment(newComment);
  // };
  return (
    <div>
      {/* {post && (
        <div >
          <ExpandComment
            newComment={bonusComment}
            postId={post._id}
          />
          <CommentBar post={post} onAddComment={handleAddComment} />
        </div>
      )} */}
    </div>
  );
};

export default CommentContainer;
