const express = require('express')
const morgan = require('morgan')
const api = require('./src/apis/index')
const cors = require('cors')
const app = express()
const http = require('http');
const socketIo = require('socket.io');
const port = 5000
const socketPort = 4000

app.use(cors());
//app.use(express.json())

api(app)

app.use(morgan('combined'))
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*', // Allow all origins
        methods: ['GET', 'POST'], // Allowed methods
        allowedHeaders: ['Content-Type'], // Allowed headers

    }
});

const userRegistration = {

}



io.on('connection', (socket) => {
    console.log(`User connected with id ${socket.id}`);
  
    // Listen for messages from clients
    socket.on('chatMessage', (sendMessage) => {
        console.log("sendMessage",sendMessage)
        const recipentId = userRegistration[sendMessage.recipentEmail]
        console.log('recipentId',recipentId)
      socket.to(recipentId).emit('newMessage', 
        {
            "sendfrom": sendMessage.senderEmail,
            "content": sendMessage.content
        }
      ); 
    });

    socket.on("register", (email) => {
        console.log(email)
        
        userRegistration[email] = socket.id
        console.log(userRegistration)
    })
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
});

// const corsOptions = {
//     origin: 'http://127.0.0.1:3000', // Allow your frontend origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//     credentials: true, // Allow credentials (cookies, authorization headers, etc.)
// };




server.listen(socketPort, () => {
    console.log(`Listening on port ${socketPort}`)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})