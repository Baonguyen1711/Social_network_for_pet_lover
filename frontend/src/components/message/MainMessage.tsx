import React from 'react'
import { Box, Avatar, Typography, Link, TextField, InputAdornment, Stack, List, ListItem, ListItemText, ListItemAvatar, ImageList, ImageListItem, Divider } from '@mui/material'
import { SearchOutlined, MessageOutlined } from '@mui/icons-material'
import useRecentChats from '../../hooks/chat/useRecentChats'
import { useEffect, useState, useRef } from 'react'
import MessageHeader from './MessageHeader'
import MessageDisplay from './MessageDisplay'
import MessageInput from './MessageInput'
import { MessageComponentType } from '../../types'
import { Recipent } from '../../types';
import { useSelectedUser } from './SelectedUserContext'
import { useSocket } from './SocketContext'

interface MessageComponentArray {
    messages: MessageComponentType[]
}

interface MessageInputProps {
    recipent: Recipent
    onSendMessage: (content: string) => void
  }

  
const selectedUser = {
    senderId: "123",
    recipentId: "456",
    content: null
}

const messages = [

]

const MainMessage = () => {

    //const [messages, setMessages] = useState<MessageComponentType[]>([])
    //const {messages,setMessages} = useSocket()
    const [isSender, setIsSender] = useState<boolean|undefined>(undefined)
    const currentEmail = localStorage.getItem("email")
    const {selectedUserEmail} = useSelectedUser()
    const selectedUser:Recipent = {
        senderEmail: currentEmail,
        recipentEmail: selectedUserEmail,
        content: null
    }


    return (
        <Box
            component="div"
            display="flex"
            flexDirection="column"
            height="100vh"
        >
            <MessageHeader/>
            <MessageDisplay isChatbot={false}/>
            <MessageInput  recipent={selectedUser} isChatbot={false}  />
        </Box>


    )

}

export default MainMessage
