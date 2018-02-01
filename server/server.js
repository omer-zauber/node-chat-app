//const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage } = require('./utils/message');

//const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat-room'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has logged in.'));

  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage)
    io.emit('newMessage', {
      ...newMessage,
      createdAt: Date.now()
    });
    callback('Got it..!');
    // socket.broadcast.emit('newMessage', {
    //   ...newMessage,
    //   createdAt: Date.now()
    // });
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`server is up at port: ${port}`);
});



