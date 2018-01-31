const socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: "NewUser",
    text: "I've joined the chat!"
  });

});

socket.on('newMessage', function (newMessage) {
  const { from, text, createdAt } = newMessage;
  console.log(`${from}(${createdAt}): ${text}`);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
  console.log('New email', email);
});