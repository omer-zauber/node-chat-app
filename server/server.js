//const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat-room',
    createdAt: Date.now()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Server',
    text: 'A new user has logged in.',
    createdAt: Date.now()
  });


  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage)
    io.emit('newMessage', {
      ...newMessage,
      createdAt: Date.now()
    });
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



