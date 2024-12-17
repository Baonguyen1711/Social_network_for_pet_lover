// SocketContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageComponentType } from '../../types';
import { RecentChat } from '../../types';
import { useBackground } from './BackgroundContext';
const socket = io('http://localhost:4000');

interface SocketContextType {
  socket: Socket;
  messages: MessageComponentType[]
  setMessages: React.Dispatch<React.SetStateAction<MessageComponentType[]>>
  chatbotMessages: MessageComponentType[]
  setChatbotMessages: React.Dispatch<React.SetStateAction<MessageComponentType[]>>
  recentChats: RecentChat[];
  setRecentChats: React.Dispatch<React.SetStateAction<RecentChat[]>> // Adjust type according to your message structure
  sendMessage: (message: any) => void; // Function to send messages
  changeBackground: (image: any) => void
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [recentChats, setRecentChats] = useState<RecentChat[]>([]); // Adjust type as needed
  const [messages, setMessages] = useState<any[]>([])
  const [chatbotMessages, setChatbotMessages] = useState<any[]>([])
  const currentEmail = localStorage.getItem("email")
  const {setBackgroundImageOver, setSelectedTheme} = useBackground()
  useEffect(()=> {
    socket.emit("connection",currentEmail)
    socket.emit("register",currentEmail)

    socket.on("changeBackground", (image) => {
      setBackgroundImageOver(image.src)
      setSelectedTheme(image.theme)
    })

    socket.on("newMessage", (message) => {
      const newRecentChat: RecentChat = {
          "_id": message.sendfrom,
          "latestMessage": message.content,
          "timeStamp": new Date().toISOString(),
          "userInfo": null
      } 

      const url = `http://localhost:5000/api/v1/message/post?senderEmail=${message.sendfrom}&recipentEmail=${currentEmail}&content=${message.content}`
      const postMessage = async () => {
        try {
          const response = await fetch(url)

          if (!response.ok) {
            console.log("Fail to post message")
          }
        } catch (e) {
          console.log("Some errors happen", e)
        }
      }

      
  
      setRecentChats((prevChat) => {
        if(prevChat.length ==0) {
          postMessage()
          return [...prevChat, newRecentChat]
        }
  
        const existingChats = prevChat.some((chat)=> chat._id === newRecentChat._id)
        if(!existingChats) {
          postMessage()
          return [newRecentChat, ...prevChat]
        } 
  
        return [...prevChat]
      })
  
      debugger;

      
      setMessages((prevMessageComponent) => {
  
        const newMessageComponent:MessageComponentType = {
          "content":message.content,
          "timeStamp": new Date().toISOString(),
          "isSender": true,
          "isChatbot": false   
        }
        return [...prevMessageComponent, newMessageComponent]
      })
  
      console.log("message",message.content)
      console.log("type ", typeof message.content)
    })
   
    return (()=> {

    })
  },[])

 

  const changeBackground = (image: string) => {
    socket.emit("changeBackground", image)
  }
  const sendMessage = (message: any) => {
    socket.emit("chatMessage", message);
  };







      

  return (
    <SocketContext.Provider value={{ messages, setMessages, socket, recentChats, setRecentChats, sendMessage, chatbotMessages, setChatbotMessages, changeBackground }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
