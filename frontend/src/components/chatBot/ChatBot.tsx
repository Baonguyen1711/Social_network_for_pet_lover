import React from 'react'
import { Box, keyframes } from '@mui/material'
import { useState } from 'react'
import { ChatBubbleOutlined } from '@mui/icons-material'
import MessageInput from '../message/MessageInput'
import MessageDisplay from '../message/MessageDisplay'

const ChatBot = () => {

    const [isOpened, setIsOpened] = useState<boolean>(false)

    const shockwaveAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;
    return (
        <Box
            component="div"
            sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000, minHeight: "40px", minWidth: "40px", borderRadius: "50%", border: "1px solid #9aa882", bgcolor: "#cbd9c4" }}
        >
            <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0, 0.3)',
          animation: `${shockwaveAnimation} 1.5s ease-out infinite`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0, 0.3)',
          animation: `${shockwaveAnimation} 1.5s ease-out infinite`,
          animationDelay: '0.3s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor: 'rgba(0,0,0, 0.3)',
          animation: `${shockwaveAnimation} 1.5s ease-out infinite`,
          animationDelay: '0.6s',
        }}
      />    
            <Box
                component="div"
                padding="16px"
            >


                {
                    isOpened ?

                        <Box>
                            {/* <MessageDisplay />
                            <MessageInput /> */}
                        </Box>
                        : <ChatBubbleOutlined
                            sx={{
                                color: "white"
                            }}
                        />
                }
            </Box>

        </Box>
    )
}

export default ChatBot