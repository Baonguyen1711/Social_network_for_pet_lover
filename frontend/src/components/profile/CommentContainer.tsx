import React, { useContext, useState } from "react";
import ProposalCommentContainer from "./ProposalCommentContainer";
import CommentBar from "./CommentBar";
import { Post, IComment } from "../../types";

const CommentContainer = () => {
  const [bonusComment, setBonusComment] = useState<IComment>();
  const handleAddComment = (newComment: IComment) => {
    setBonusComment(newComment);
  };
  return (
    <div>
      {/* {post && (
        <>
          {" "}
          
        </>
      )} */}
    </div>
  );
};

export default CommentContainer;
