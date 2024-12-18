import React from 'react';
import { Box, Typography, Avatar, Link } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { lightTheme } from '../../themes/theme';

const Header: React.FC = () => {
  var avatarSrc = localStorage.getItem("userAvatar")
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
    marginLeft: "50px",
    marginRight: "50px",
  }}
>
  {/* Left Side */}
  <Typography>
    𝓟𝓔𝓣𝓞𝓟𝓗𝓘𝓛𝓔
  </Typography>

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
      Middle Content
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
    <Notifications />
    <Link href="/profile" underline="none">
    <Avatar
      src={localStorage.getItem("userAvatar")||undefined}
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
