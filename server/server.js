//const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = new express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('new user connected');
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });
});

server.listen(port, () => {
  console.log(`server is up at port: ${port}`);
});



