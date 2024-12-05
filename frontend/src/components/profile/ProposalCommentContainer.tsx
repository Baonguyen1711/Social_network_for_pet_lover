import React, { useEffect, useState } from "react";
import style from "./css/ProposalCommentContainer.module.css";
import { IComment, Post } from "../../types";
import ProposalComment from "./ProposalComment";
import DetailPostContainer from "./ExpandComment/DetailPostContainer";
import { List } from "@mui/material";

interface props {
  onAddComment?: (newComment: IComment) => void;
  updateComments:(comments:IComment[]) => void;
  newComment?: IComment;
  postId?: string;
}
const ChildComponent = React.memo(({ value }: { value: IComment }) => {
  return <ProposalComment comment={value} />;
});
const ProposalCommentContainer: React.FC<props> = (props) => {
  const [comments, setComments] = useState<IComment[]>([]);

  //handletogglemodal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchData();
  }, [props.newComment]);
  const fetchData = async () => {
    const postId = props.postId;
    const userId = localStorage.getItem("userId");
    const url = `http://localhost:5000/api/v1/comment/getCommentsByPostId?postId=${postId}&userId=${userId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error in getting message");
      }
      const data = await response.json();
      if (data.comments.length > 0) {
        setComments(buildTree(data.comments));
        props.updateComments(data.comments);
      }
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };
  function buildTree(
    comments: IComment[],
    parentId: string | null = null
  ): IComment[] {
    return comments
      .filter((comment) => comment.parentId === parentId) // Lọc bình luận có parentId khớp
      .map((comment) => ({
        ...comment, // Sao chép tất cả thuộc tính của bình luận
        replies: buildTree(comments, comment._id), // Đệ quy để tìm các phản hồi
      }));
  }
  return (
    <>
      <div className={style.container}>
        {comments?.length>1 && (
          <div className={style.watchAll} onClick={handleOpen}>
            Xem tất cả...
          </div>
        )}
        <div className={style.firstComment}>
          {comments?.length>0 && <ProposalComment comment={comments?.at(0)} />}
        </div>
      </div>
      <DetailPostContainer open={open} handleClose={handleClose} />
    </>
  );
};

export default ProposalCommentContainer;
