import React from 'react'
import { adaptV4Theme, Box, TextField } from '@mui/material'
import { Abc, EmojiEmotionsOutlined, SendOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react';
import { Recipent } from '../../types';
import { useSelectedUser } from './SelectedUserContext';
import { useSocket } from './SocketContext'
import { MessageComponentType } from '../../types';



interface MessageInputProps {
  recipent: Recipent | null,
  isChatbot: boolean
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

const MessageInput: React.FC<MessageInputProps> = ({ recipent, isChatbot }) => {

  const [message, setMessage] = useState<string>("");
  const { messages, setMessages, sendMessage, chatbotMessages, setChatbotMessages } = useSocket();
  const currentEmail = localStorage.getItem("email")
  const { selectedUserEmail } = useSelectedUser()

  function convertMarkdownToHtml(input: string) {
    // Convert **bold** to <strong></strong>
    input = input.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
    // Convert *italic* to <em></em>
    input = input = input.replace(/\*/g, '</br>');
  
    return input;
  }
  

  console.log(recipent)


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    if (!isChatbot) {
      if (message) {
        debugger;
        const sentMessage = recipent
        if(sentMessage){
          sentMessage.content = message
        }
        console.log("recipent", sentMessage)
        const newMessage: MessageComponentType = {
          content: message,
          timeStamp: new Date().toISOString(),
          isSender: false,
          isChatbot: false
        }
        setMessages((prevMessages) => [...prevMessages, newMessage])

        const url = `http://localhost:5000/api/v1/message/post?senderEmail=${currentEmail}&recipentEmail=${selectedUserEmail}&content=${message}`
        console.log("send Mesage", sentMessage)
        sendMessage(sentMessage)
        setMessage("")
        try {
          const response = await fetch(url)

          if (!response.ok) {
            console.log("Fail to post message")
          }
        } catch (e) {
          console.log("Some errors happen", e)
        }

       
      }
      
    } else {
      const newMessage: MessageComponentType = {
        content: message,
        timeStamp: new Date().toISOString(),
        isSender: false,
        isChatbot: true
      }
      setChatbotMessages((prevMessages) => [...prevMessages, newMessage])

      const url = `http://localhost:5000/api/v1/chatbot/?input=${message}`
      try {
        debugger;
        const response = await fetch(url)

        if (!response.ok) {
          console.log("Fail to post message")
        }

        const data = await response.json()
        const responseMessage = data.message

        const chatbotMessage: MessageComponentType = {
          content: convertMarkdownToHtml(responseMessage),
          timeStamp: new Date().toISOString(),
          isSender: true,
          isChatbot: true
        }

        setChatbotMessages((prevMessages) => [...prevMessages, chatbotMessage ])
        setMessage(" ");
      } catch (e) {
        console.log("Some errors happen", e)
      }

    }
    debugger;
    
  }
  return (
    <Box
      component="div"
      id="inputWrapper"
      height="80px"
      width="100%"
      marginLeft={isChatbot?"0px":"2px"}
      // position="sticky"
      bgcolor="#ffffff"
    >
      {
        isChatbot?
        <Box
        padding="10px"
        height="100%"
        bgcolor="#ffffff"
        width="100%"
        component="form"

        onSubmit={(e) => handleSubmit(e)}

        sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center", padding: "0px 10px" }}>
        
        {/* <EmojiEmotionsOutlined sx={{ color: 'action.active', mr: 1, my: 0.5, flexGrow: 1 }} /> */}
        <TextField value={message} onChange={(e) => setMessage(e.target.value)} id="input-with-sx" label="Type your question here" variant="standard" sx={{ flexGrow: 4 }} />
        {/* <SendOutlined sx={{ color: 'action.active', mr: 1, my: 0.5, flexGrow: 1 }} /> */}
      </Box> 
        :
        <Box
        padding="10px"
        height="100%"
        bgcolor="#ffffff"
        width="100%"
        component="form"

        onSubmit={(e) => 
          handleSubmit(e)
        }

        sx={{ display: 'flex', justifyContent: "space-around", alignItems: "center", padding: "0px 10px" }}>
        
        <EmojiEmotionsOutlined sx={{ color: 'action.active', mr: 1, my: 0.5, flexGrow: 1 }} />
        <TextField value={message}  onChange={(e) => setMessage(e.target.value)} id="input-with-sx" label="Type your message here" variant="standard" sx={{ flexGrow: 5 }} />
        <SendOutlined sx={{ color: 'action.active', mr: 1, my: 0.5, flexGrow: 1 }} />
      </Box>
      }
      
    </Box>
  )
}

export default MessageInput