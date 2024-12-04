import React, { useEffect, useState } from "react";
import style from "../css/ProposalCommentContainer.module.css";
import { IComment, Post } from "../../../types";
import ProposalComment from "../ProposalComment";
import DetailPostContainer from "./DetailPostContainer";

interface props {
  onAddComment?: (newComment: Comment) => void;
  newComment?: IComment;
  postId?: string;
}
const ChildComponent = React.memo(({ value }: { value: IComment }) => {
  return <ProposalComment comment={value} />;
});
const ProposalCommentContainer: React.FC<props> = (props) => {
  const [comments, setComments] = useState<IComment[] | undefined>();
  //handletogglemodal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const url = `http://localhost:5000/api/v1/comment/getCommentsByPostId?postId=${props.postId}`;
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
      {comments && comments.length > 0 && (
        <div className={style.container}>
          <div className={style.firstComment}>
            {comments.map((comment, index) => (
              <div id={index + ""}>
                <ProposalComment comment={comment} />
              </div>
            ))}
            {props.newComment && <ChildComponent value={props.newComment} />}
          </div>
        </div>
      )}
      <DetailPostContainer open={open} handleClose={handleClose} />
    </>
  );
};

export default ProposalCommentContainer;
