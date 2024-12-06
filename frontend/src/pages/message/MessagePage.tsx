import React, { useState } from 'react'
import SideBar from '../../components/sideBar/SideBar'
import RecentChats from '../../components/message/RecentChats'
import MainMessage from '../../components/message/MainMessage'
import Palette from '../../components/palette/Palette'
import { SelectedUserProvider } from '../../components/message/SelectedUserContext'
import { SocketProvider } from '../../components/message/SocketContext'
import { BackgroundProvider, useBackground } from '../../components/message/BackgroundContext'
import { Grid2, ToggleButton } from '@mui/material'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material'

const MessagePageContent = () => {

  const { backgroundImageOver } = useBackground();
  const [isOpened, setIsOpened] = useState(true);

  return (
    <>
      <Palette imgSrc={backgroundImageOver} />
      <Grid2 container sx={{ height: "100vh" }}>
        <Grid2
          size={isOpened ? 2.5 : 0.9}
          sx={{
            position: "relative",
            transition: 'all 0.3s ease',  // Smooth transition for the sidebar
            //width: isOpened ? '25%' : '7%',  // Toggle width based on state
            overflow: 'hidden',  // Hide content when sidebar is collapsed
          }}
        >
          <SideBar isOpened={isOpened} />
          <ToggleButton
            value="slide"
            selected={isOpened}
            onChange={() => setIsOpened((prevState) => !prevState)}
            sx={{
              position: "absolute",
              top: "50%",
              right: "0px",
              width: "40px",
              height: "40px",
              bgcolor: "transparent",
              overflowX: "hidden",
              "&.Mui-selected": {
                backgroundColor: "transparent", // Ensure the background stays transparent when selected
              },
              "&:hover": {
                backgroundColor: "transparent", // Make background transparent on hover
              },

              transition: "transform 0.3s ease-in-out", // Smooth rotation transition
              transform: isOpened ? "rotate(180deg)" : "rotate(0deg)", // Rotate when selected
            }}
          >
            <ArrowRightOutlined />
          </ToggleButton>
        </Grid2>

        <Grid2 size={isOpened ? 7 : 8.6}

        >
          <MainMessage />
        </Grid2>

        <Grid2 size={2.5}
          sx={{
            position: "fixed",
            right: "0"
          }}
        >
          <RecentChats />
        </Grid2>
      </Grid2>
    </>
  );
};

const MessagePage = () => {
  return (
    <BackgroundProvider>
      <SocketProvider>
        <SelectedUserProvider>

          <MessagePageContent />
        </SelectedUserProvider>
      </SocketProvider>
    </BackgroundProvider>


  )
}

export default MessagePage