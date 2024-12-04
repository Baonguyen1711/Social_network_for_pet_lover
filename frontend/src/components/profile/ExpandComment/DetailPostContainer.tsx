import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import PostInformationCard from "../PostInformationCard";
import { PostContext } from "../PostContext";
interface props {
  open: boolean;
  handleClose: () => void;
}
const DetailPostContainer: React.FC<props> = ({ open, handleClose }) => {
  const { post } = useContext(PostContext)!;
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
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto", // Adjust for responsiveness
            maxWidth: 600, // Maximum width for modal
            maxHeight: "80vh", // Limit height to viewport
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto", // Enable scrolling for content
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ mt: 2, alignSelf: "right" }}
          >
            Đóng
          </Button>
          {post && <PostInformationCard type={2} post={post} />}
        </Box>
      </Modal>
    </div>
  );
};

export default DetailPostContainer;
