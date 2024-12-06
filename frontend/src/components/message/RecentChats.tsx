import React from 'react'
import { Box, Avatar, Typography, Link, TextField, InputAdornment, Stack, List, ListItem, ListItemText, ListItemAvatar, ImageList, ImageListItem, Divider } from '@mui/material'
import { SearchOutlined, MessageOutlined } from '@mui/icons-material'
import useRecentChats from '../../hooks/chat/useRecentChats'
import { useEffect, useState } from 'react'
import { useSelectedUser } from './SelectedUserContext'
import { useSocket } from './SocketContext'
import { useBackground } from './BackgroundContext'

interface message {
  _id: string,
  latestMessage: string,
  sendAt: string
}

const imageData = [
  {
    img: "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: 'Breakfast',
  },
  {
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: 'Burger',
  },
  {
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: 'Camera',
  },
  {
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: 'Coffee',
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1675186049419-d48f4b28fe7c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    title: 'Hats',
  },
  {
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    title: 'Honey',
  },
  {
    img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    title: 'Basketball',
  },
  {
    img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    title: 'Fern',
  },
  {
    img: "https://images.unsplash.com/photo-1477064996809-dae46985eee7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGZhc2hpb258ZW58MHx8MHx8fDA%3D",
    title: 'Mushrooms',
  }
];


const SideBar = () => {

  //const recentMessages = useRecentChats("Baonguyen2110@gmail.com")



  const email = localStorage.getItem("email")
  const { selectedUserEmail, setSelectedUserEmail, selectedUserAvatar, setSelectedUserAvatar, selectedUserName, setSelectedUserName } = useSelectedUser()
  const { recentChats, setRecentChats } = useSocket()
  const { setBackgroundImageOver, isPaletteOpen, setIsPaletteOpen } = useBackground()

  const [dataArray, setDataArray] = useState<message[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<string>("")
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff")



    useEffect(() => {
      const fetchData = async () => {

        
        const url = `http://127.0.0.1:5000/api/v1/message/recent?email=${email}`
        try {



          const response = await fetch(url, {
            method: "GET"
          })

          if (!response.ok) {
            throw new Error(`Error in getting message`);
          }


          const data = await response.json()
          const recentMessages = data.recentMessages
          console.log("data", data)
          console.log("recentMessages", recentMessages)
          const selectedUserAvatar = recentMessages[0].userInfo.avatar

          console.log("selectedUserAvatar", selectedUserAvatar)
          setSelectedUserAvatar(selectedUserAvatar)
          setRecentChats(recentMessages)


          return recentMessages


        } catch (e) {
          console.log("Some errors happen", e)
          return []
        } finally {
          setLoading(false)
        }
      };



      fetchData();


    }, [selectedUserAvatar]);

  // useEffect(()=> {
  //   const getUserInfo = async () => {
  //     debugger;
  //     const userInfoApi = `http://127.0.0.1:5000/api/v1/user/info?email=${selectedUserEmail}`
  //     try {
  //       const response = await fetch(userInfoApi)

  //       if (!response.ok) {
  //         throw new Error(`Error in getting message`);
  //       }

  //       const data = await response.json()
  //       const selectedAvatar = data.avatar

  //       setSelectedUserAvatar(selectedAvatar)
  //     } catch(e) {
  //       console.log("Some errors happen", e)
  //     }
  //   }

  //   getUserInfo();
  // },[selectedUserEmail])


  if (loading) {
    return (
      <div>loading</div>
    )
  }

  return (

    <Box
      component="div"
      id="rightBar"
      height="100vh"
      width="100%"
      display="flex"
      justifyContent="center"
      justifyItems="center"
      bgcolor={backgroundColor}
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "-2px 0px 10px -5px rgba(0, 0, 0, 0.2)"
      }}
    >
      <Box
        component="div"
        id="mainRightBar"
        width="80%"
        height="65%"
        padding="20px"
        bgcolor="#ffffff"
        marginTop="10%"
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <SearchOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField id="input-with-sx" label="Search for chat" variant="standard" />
        </Box>



        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {
            recentChats.map((message) => (
              <ListItem
                key={message._id}

                onClick={() => {
                  setSelectedUserEmail(message._id)
                  setSelectedUserName(`${message.userInfo?.firstname} ${message.userInfo?.lastname}`)

                }
                }




                sx={{
                  height: "100px",
                  backgroundColor: selectedUserEmail === message._id ? "rgba(0, 0, 0, 0.08)" : "#ffffff",
                  borderRadius: "10px",
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                    cursor: 'pointer', // Change cursor to pointer on hover
                  },

                }}
              >
                <ListItemAvatar>
                  <Avatar src={selectedUserAvatar}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${message.userInfo?.firstname}${message.userInfo?.lastname}`} secondary={<span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth: '200px', // Adjust width as needed
                    display: 'block', // Ensures the span behaves as a block element
                  }}
                >
                  {message.latestMessage}
                </span>} />

                <Typography
                  variant="caption"
                  sx={{
                    position: "relative",
                    bottom: "-13px"
                  }}
                >
                  {new Date(message.timeStamp).toLocaleString().slice(0, 5)}

                </Typography>
              </ListItem>
            ))
          }

        </List>

        <Divider orientation="horizontal"></Divider>
        <div style={{ width: "100%", height: '450px', overflowY: 'scroll' }}>

          <ImageList cols={2} rowHeight={100}

          >
            {imageData.map((item) => (
              <ImageListItem key={item.img}

              >
                <img
                  srcSet={`${item.img}`}
                  src={`${item.img}`}
                  alt={item.title}
                  loading="lazy"
                  className="imageItem"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    
                  }}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.cursor = "pointer";
                    e.currentTarget.style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                }}

                  onClick={
                    () => {
                      debugger;
                      setBackgroundImageOver(item.img)
                      setIsPaletteOpen(!isPaletteOpen)
                    }}

                  
                />
              </ImageListItem>
            ))}
          </ImageList>

        </div>

      </Box>
    </Box >

  )

}

export default SideBar