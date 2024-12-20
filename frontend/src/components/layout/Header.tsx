import React, { useState } from 'react';
import { Box, Typography, Avatar, Link, Modal } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { lightTheme } from '../../themes/theme';
import { useSocket } from '../message/SocketContext';
import clsx from 'clsx'
import style from './css/header.module.css'
import { useNavigate } from 'react-router-dom';
interface Props {
  updatePostsState: () => void;
}

const Header: React.FC = () => {
  var avatarSrc = localStorage.getItem("userAvatar")
  const userId = localStorage.getItem("userId")
  const { hasNotification, likePostDetailed, setHasNotification } = useSocket()
  // State for modal visibility
  const [open, setOpen] = useState(false);
  const [openDetailPostModal, setOpenDetailPostModal] = useState(false);
  const handleOpenDetailPostModal = () => setOpenDetailPostModal(true);
  const handleCloseDetailPostModal = () => setOpenDetailPostModal(false);
  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setHasNotification(false)
    setOpen(false)
  };
  const navigate = useNavigate();
  return (
    <>
      <Box
        component="div"
        sx={{
          height: "10vh",
          backgroundColor: lightTheme.colors.background,
          color: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          zIndex: 1000,
          fontFamily: "Helvetica",
          fontSize: "30px",
          paddingLeft: "50px",
          marginRight: "50px",
          borderBottom:"1px solid #89966B"
        }}
      >
        {/* Left Side */}
        <div className={clsx(style.avatarContainer)} onClick={()=>{navigate('/home')}}>
          <img src='https://res.cloudinary.com/dh6brjozr/image/upload/Brown_Black_Simple_Modern_Pet_Shop_Logo_hizos1.png'/>
        </div>

        {/* Middle Box */}
        <Box
          sx={{
            flexGrow: 1, // Allows it to expand and take up the middle space
            display: "flex",
            justifyContent: "center", // Centers content horizontally
            alignItems: "center", // Centers content vertically
          }}
        >
          <Typography>

          </Typography>
        </Box>

        {/* Right Side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            minWidth: "200px" // Add spacing between notifications and avatar
          }}
        >
          <Notifications
            sx={{
              color: hasNotification ? "red" : "inherit", // Change color based on notification
            }}
            onClick={handleOpen} 
          />

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                width: 300,
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom>
                Notifications
              </Typography>
              {likePostDetailed ? (

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2
                  }}
                >
                  {/* User Avatar */}
                  <Avatar
                    src={likePostDetailed.avatar}
                    alt={likePostDetailed.userName}
                    sx={{
                      width: 40,
                      height: 40,
                      mr: 2 
                    }}
                  />

                  {/* Text Content */}
                  <Box>
                    <Typography variant="body1">
                      {`${likePostDetailed.userName} ${likePostDetailed.type} your post`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(likePostDetailed.time).toLocaleString()}
                    </Typography>
                  </Box>


                </Box>
                
              ) : (
                <Typography>No new notifications.</Typography>
              )}
            </Box>
          </Modal>
          <Link href={`/profile/${userId}`} underline="none">
            <Avatar
              src={localStorage.getItem("userAvatar") || undefined}
              sx={{
                width: "35px",
                height: "35px",
              }}
            />
          </Link>

        </Box>
      </Box>


    </>


  );
};

export default Header;
