import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import { MoreHorizOutlined } from '@mui/icons-material'
import { useSelectedUser } from './SelectedUserContext'





const MessageHeader = () => {

    const { selectedUserEmail, selectedUserAvatar, selectedUserName } = useSelectedUser()
    const defaultImage = "https://scontent.fsgn10-2.fna.fbcdn.net/v/t39.30808-6/457503675_1305139990895461_5989238482320814287_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGVvv-t8mWiLqlRAsrDSp7q2KbV8EffU1rYptXwR99TWk-5kG5KZ1c_G-QAsF78iVsPKz3ERlEu6zLS54hMCZ8d&_nc_ohc=YycugprJMSwQ7kNvgGu6Kax&_nc_zt=23&_nc_ht=scontent.fsgn10-2.fna&_nc_gid=AV_7ObvLjjw1iClNw_CYx6G&oh=00_AYCLqFGuwcMY6ke2d4kJUsc2b8mSahQWFFvta5gS3V0Pyw&oe=672D212E"
    const name = localStorage.getItem("email")  
    return (

        <Box
            component="div"
            id="messageHeader"
            height="80px"
            bgcolor="#ffffff"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginLeft="2px"
            borderRadius="0px 10px"
            sx={{
                boxShadow: "0px 2px 10px -5px rgba(0, 0, 0, 0.2)"
            }}
        >

            <Box
                component="div"
                id="user"
                display="flex"
                height="100%"
                justifyContent="space-between"
            >
                <Avatar src={selectedUserAvatar||defaultImage} sx={{ alignSelf:"center", marginRight: "10px", marginLeft: "20px", borderRadius: "50% " }} />
                <Box
                    component="div"
                    display="flex"
                    flexDirection="column"
                >
                    <Typography variant="h6" alignContent="center" color="#A1A7B3">{selectedUserName}</Typography>
                    <Typography variant="caption" alignContent="center" color="#A1A7B3">@{selectedUserEmail?.replace("@gmail.com", "")}</Typography>

                </Box>
            </Box>

            <MoreHorizOutlined sx={{
                marginRight: "30px",
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                    cursor: 'pointer', // Change cursor to pointer on hover
                }
            }} />
        </Box>
    )
}

export default MessageHeader