import React, { useEffect, useState } from 'react'
import { Box, Avatar, Typography, Link, IconButton } from '@mui/material'
import { HomeOutlined, WindowOutlined, PeopleOutline, TagOutlined, SendOutlined, ExitToAppOutlined } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { useSelectedUser } from '../message/SelectedUserContext'

interface SideBarProps {
  isOpened: boolean;
}

const SideBar: React.FC<SideBarProps> = ({isOpened}) => {

  const location = useLocation()

  const isActive = (path: string) => location.pathname.split("/")[1] === path;
  //const {selectedUserAvatar, selectedUserName, selectedUserEmail} = useSelectedUser()
  const [userName, setUserName] = useState<string>("")
  const [userAvatar, setUserAvatar] = useState<string>("")
  console.log(location.pathname.split("/")[1])
  const currentEmail = localStorage.getItem("email")

  useEffect(() => {
    const getUserInfo = async () => {
      debugger;
      try {
        const url = `http://127.0.0.1:5000/api/v1/user/info?email=${currentEmail}`

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          }
        })

        if (!response.ok) {
          throw new Error(`Error in getting message`);
        }


        
        const data = await response.json()
        //console.log("user data", data)
       setUserAvatar(data.userInfo.avatar)
        setUserName( `${data.userInfo.firstname} ${data.userInfo.lastname}`)

        console.log(userAvatar)
        console.log(userName)
      } catch (e) {
        console.log("Some errors happen", e)
      }

    }

    getUserInfo()


  }, [])
  return (
    isOpened?
    <Box
      component="div"
      id="wrapperSideBar"
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignContent="center"
      position={'fixed'}
      top={0}
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "2px 0px 10px -5px rgba(0, 0, 0, 0.2)",
        overflowY: "scroll"
      }}
    >
      <Box
        component="div"
        id="mainSideBar"
        width="80%"
        height="80%"
        marginTop="10%"
      >
        <Box
          component="div"
          id="avatar"
          height="150px"
          width="100%"
          display="flex"
          justifyContent="center"
          alignContent="center"

        >
          <Avatar
            src={userAvatar}
            sx={{
              height: "100%",
              width: "150px"
            }}
          />
        </Box>
        <Typography
          component="div"
          id="name"
          variant="h5"
          align="center"
          fontFamily="Inter"
          color="#A1A7B3"
          marginTop="10px"
        >
          {userName}

        </Typography>
        <Typography
          component="div"
          id="shortName"
          variant="body1"
          align="center"
          fontFamily="Inter"
          color="#A1A7B3"
        >
          {`@${currentEmail?.replace("@gmail.com", "")}`}

        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          //width="80%"
          alignContent="center"
          //bgcolor="white"
          padding={2}
        >

          <Link href="/home" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="home" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("home") ? "#CBD9C4" : "#ffffff"}>
              <HomeOutlined sx={{ color: "#89966B" }} />
              <Typography fontFamily="Inter" color='#89966B' fontWeight="500">Home</Typography>

            </Box>
          </Link>

          <Link href="/explore" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="explore" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("explore") ? "#CBD9C4" : "#ffffff"}>
              <WindowOutlined sx={{ color: "#89966B" }} />
              <Typography fontFamily="Inter" color='#89966B' fontWeight="500">Explore</Typography>

            </Box>
          </Link>


          <Link href="/message" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="group" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("group") ? "#CBD9C4" : "#ffffff"}>
              <PeopleOutline sx={{ color: "#89966B" }} />
              <Typography fontFamily="Inter" color='#89966B' fontWeight="500">Group</Typography>

            </Box>
          </Link>


          <Link href="/favourite" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="favorite" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("favourite") ? "#CBD9C4" : "#ffffff"}>
              <TagOutlined sx={{ color: "#89966B" }} />
              <Typography fontFamily="Inter" color='#89966B' fontWeight="500">Favourite</Typography>

            </Box>
          </Link>


          <Link href="/message" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="message" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("message") ? "#CBD9C4" : "#ffffff"}>
              <SendOutlined sx={{ color: "#89966B" }} />
              <Typography fontFamily="Inter" color='#89966B' fontWeight="500">Message</Typography>

            </Box>
          </Link>


          <Box flexGrow={2} />

          {/* Item sticking to the bottom */}

          <Link href="/login" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="logOut" height="40px" padding="10px" borderRadius="10px">
              <ExitToAppOutlined sx={{ color: "#89966B" }} />
              <Typography fontFamily="Inter" color='#89966B' fontWeight="500">Log out</Typography>

            </Box>
          </Link>

        </Box>

      </Box>
    </Box>

    :
    <Box
      component="div"
      id="wrapperSideBar"
      width="100%"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignContent="center"
      sx={{
        backgroundColor: "#ffffff",
        boxShadow: "2px 0px 10px -5px rgba(0, 0, 0, 0.2)",
        overflowY: "scroll"
      }}
    >
      <Box
        component="div"
        id="mainSideBar"
        width="80%"
        height="80%"
        marginTop="10%"
      >
        <Box
          component="div"
          id="avatar"
          height="150px"
          width="100%"
          display="flex"
          justifyContent="center"
          alignContent="center"
          alignItems="flex-end"
        >
          <Avatar
            src={userAvatar}
          />
        </Box>
       

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          //width="80%"
          alignContent="center"
          //bgcolor="white"
          padding={2}
        >

          <Link href="/home" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="home" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("home") ? "#CBD9C4" : "#ffffff"}>
              <HomeOutlined sx={{ color: "#89966B" }} />
              
            </Box>
          </Link>

          <Link href="/explore" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="explore" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("explore") ? "#CBD9C4" : "#ffffff"}>
              <WindowOutlined sx={{ color: "#89966B" }} />
              
            </Box>
          </Link>


          <Link href="/message" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="group" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("group") ? "#CBD9C4" : "#ffffff"}>
              <PeopleOutline sx={{ color: "#89966B" }} />
              
            </Box>
          </Link>


          <Link href="/favourite" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="favorite" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("favourite") ? "#CBD9C4" : "#ffffff"}>
              <TagOutlined sx={{ color: "#89966B" }} />
              
            </Box>
          </Link>


          <Link href="/message" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="message" height="40px" padding="10px" borderRadius="10px" bgcolor={isActive("message") ? "#CBD9C4" : "#ffffff"}>
              <SendOutlined sx={{ color: "#89966B" }} />
              
            </Box>
          </Link>


          <Box flexGrow={2} />

          {/* Item sticking to the bottom */}

          <Link href="/login" underline="none">
            <Box sx={{
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.08)', // Change background color on hover
                cursor: 'pointer', // Change cursor to pointer on hover
              }
            }}
              display="flex" alignItems="center" gap={1} id="logOut" height="40px" padding="10px" borderRadius="10px">
              <ExitToAppOutlined sx={{ color: "#89966B" }} />
              

            </Box>
          </Link>

        </Box>

      </Box>
    </Box>


  )
}

export default SideBar