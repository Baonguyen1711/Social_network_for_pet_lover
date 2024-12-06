import React, { useState, useEffect } from "react";
import { Box, ImageList, ImageListItem, Modal, Button } from "@mui/material";

import style from "./ExploreForm.module.css";
import {PostResponse,Post} from '../../types'


const Explore = () => {
  const [itemData, setItemData] = useState<Post[]>([]);
  const [selectedImage, setSelectedImage] = useState<Post | null>(null);
  useEffect(() => {
    const fetchData = async () => { 
      const url = "http://localhost:5000/api/v1/post/post";
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Error in getting message");
        }
        const data: PostResponse  = await response.json();
        if (data.recommentPost.length > 0) {
          setItemData(data.recommentPost);
        } else {
          console.log("No posts found");
        }
      } catch (e) { 
        console.error("Error fetching data:", e);
      }
    };

    fetchData(); // Call fetchData inside useEffect
  }, []);

  const handleImageClick = (image: Post) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };
  
     return (
    <Box sx={{width:"100%",height:"100%",overflowY:'scroll'}}>
      <ImageList variant="masonry" cols={3} gap={8}>
      {itemData.length > 0
          ? itemData.map((item) => 
          {
            return(
              <ImageListItem
                key={item._id}
                className={style.imageItem}
                onClick={() => handleImageClick(item)}
              >
                <img
                  src={`${item.images[0]}?w=248&fit=crop&auto=format&dpr=2`}
                  // {...srcset(item.media, 121, item.cols, item.rows)}
                  alt={item.content}
                  loading="lazy"
                  className={style.image}
                />
                <div className={style.overlay}>
                  <h3>{item.title}</h3>
                </div>
              </ImageListItem>
            )
          })
          
          : "Don't have any posts"}
      </ImageList>

      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        sx={{ backdropFilter: "blur(2px)" }}
      >
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            top: "50%",
            left: "50%",
            maxWidth: "100%",
            maxHeight: "100%",
            minWidth: "80%",
            minHeight: "80%",
            transform: "translate(-50%, -50%)",
            height: "auto", // Adjust height based on content
            bgcolor: "background.paper",
            outline: "none",
            border: "0px",
            boxShadow: 24,
            borderRadius: "9px",
          }}
        >
          {selectedImage && (
            <div className={style.modal_container}>
              <div className={style.modal_contentBox}>
                <Box
                  sx={{
                    overflow: "auto",
                    scrollbarWidth: "thin",
                    "&::-webkit-scrollbar": {
                      width: "0.4em",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "#f1f1f1",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#888",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#555",
                    },
                    height:"100%"
                  }}
                >
                  <h3 className={style.modal_title}>{selectedImage.title}</h3>
                  {/* <h3 className={style.modal_writer}>{selectedImage.writer}</h3> */}
                  <h3 className={style.modal_content}>
                    {selectedImage.content}
                  </h3>
                </Box>
                <Button
                  variant="contained"
                  style={{
                    display: "inline-block",
                    width: "80px",
                    marginTop: "5px",
                    bottom: 0,
                  }}
                >
                  Goto
                </Button>
              </div>
              <img
                src={selectedImage.images.at(0)}
                alt={selectedImage.content}
                className={style.modal_img}
              />
            </div>
          )}
        </Box>
      </Modal>
      </Box>
  );
};
export default Explore;
