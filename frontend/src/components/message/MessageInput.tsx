import React from 'react'
import { Box, TextField } from '@mui/material'
import { EmojiEmotionsOutlined, SendOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react';
import { Recipent } from '../../types';
import { useSelectedUser } from './SelectedUserContext';
import { useSocket } from './SocketContext'
import { MessageComponentType } from '../../types';



interface MessageInputProps {
    recipent: Recipent,
    //isChatbot: boolean
  }


interface message {
    id: string,
    senderId: string,
    senderName: string,
    senderAvatar: string,
    content: string,
    timestamp: string
  };

// var isUser1 = true
  
// const User2 = {
//     id: 456,
//     avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/20240827_Eunha_%EC%9D%80%ED%95%98_01.jpg/250px-20240827_Eunha_%EC%9D%80%ED%95%98_01.jpg",
//     name: "Eunha"
// }

// const User1 = {
//     id: 123,
//     avatar: "https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/451270082_1185848232626306_1812262998793060985_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeHdJebdYHUi0wsO5KaqLPeU2uvA1eVodLva68DV5Wh0u94hVLxba4_kQMK5Mhgj0BuGsXqmAtmjjHRGmA1p5JGn&_nc_ohc=9Szq1y4W8jwQ7kNvgH1AzSG&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=ACEIKB0LvyBwojOEobxQWMk&oh=00_AYD8MKeqA3DI7E2FGEDTCf8ImrJMIk4rSJCD9EMz698Vog&oe=67250BA8",
//     name: "Baonguyen"
// }

const MessageInput: React.FC<MessageInputProps>= ({recipent}) => {

    const [message, setMessage] = useState<string>("");
    const {messages, setMessages, sendMessage} = useSocket();
    const currentEmail = localStorage.getItem("email")
    const {selectedUserEmail} = useSelectedUser()
    

    console.log(recipent)
  

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        debugger;
        e.preventDefault();
      if (message) {
        debugger;
        const sentMessage = recipent
        sentMessage.content = message
        console.log("recipent", sentMessage)
        const newMessage: MessageComponentType = {
          content: sentMessage.content,
          timeStamp: new Date().toISOString(),
          isSender: false
        }
        setMessages((prevMessages) => [...prevMessages, newMessage])
        
        const url = `http://localhost:5000/api/v1/message/post?senderEmail=${currentEmail}&recipentEmail=${selectedUserEmail}&content=${sentMessage.content}`
        console.log("send Mesage", sentMessage)
        sendMessage(sentMessage)

        try {
            const response = await fetch(url)

          if(!response.ok) {
            console.log("Fail to post message")
          }
        } catch (e) {
            console.log("Some errors happen", e)
        }
      }
    }
    return (
        <Box
            component="div"
            id="inputWrapper"
            height="80px"
            width="100%"
            marginLeft="2px"
            bgcolor="#ffffff"
        >

            {/* <Box
            component="div"
            display="flex"
            padding="10px"
            height="100%"
            bgcolor="#ffffff"
            justifyContent="space-between"
            sx={{
                boxSizing: "content-box"
            }}
        >
            <EmojiEmotionsOutlined/>
            <TextField>

            </TextField>
        </Box> */}

            <Box  
            padding="10px"
            height="100%"
            bgcolor="#ffffff"
            width="100%"
            component="form"

            onSubmit={(e)=>handleSubmit(e)}
            
            sx={{ display: 'flex', justifyContent:"space-around", alignItems:"center", padding: "0px 10px" }}>
                <EmojiEmotionsOutlined sx={{ color: 'action.active', mr: 1, my: 0.5, flexGrow: 1 }} />
                <TextField onChange={(e)=> setMessage(e.target.value)} id="input-with-sx" label="Type your message here" variant="standard" sx={{flexGrow: 5}}/>
                <SendOutlined sx={{ color: 'action.active', mr: 1, my: 0.5, flexGrow: 1}} />
            </Box>
        </Box>
    )
}

export default MessageInput