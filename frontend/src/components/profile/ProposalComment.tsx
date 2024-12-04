import React from "react";
import { IComment } from "../../types";
import { Avatar, Card } from "@mui/material";
import style from "./css/ProposalComment.module.css";
import { getTimeAgo } from "../../helper";
import { ThumbUp } from "@mui/icons-material";

interface props {
  comment: IComment | undefined;
}
const ProposalComment: React.FC<props> = (props) => {
  return (
    <div className={style.container}>
      <Avatar src={props.comment?.userInfo.avatar} />
      <div className={style.containerRight}>
        <div className={style.card}>
          <div className={style.cardHeader}>
            <h4>{props.comment?.userInfo.firstname+" "+props.comment?.userInfo.lastname}</h4>
          </div>
          <div className={style.cardBody}>
            <p>{props.comment?.content}</p>
          </div>
        </div>
        <div className={style.cardFooter}>
          <div className={style.cardFooterActions}>
            <p style={{ fontSize: "13px" }}>
              {props.comment?.createdAt && getTimeAgo(props.comment?.createdAt)}
            </p>
            <button className={style.likeBtn + " " + style.btn}>Thích</button>
            <button className={style.replyBtn + " " + style.btn}>Phản hồi</button>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifySelf: "right",
            }}
          >
            <p style={{ fontSize: "13px" }}>128 </p>
            <ThumbUp sx={{ marginLeft: "5px" }} color="primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalComment;
