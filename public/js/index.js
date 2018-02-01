const socket = io();

socket.on('connect', function () {
  console.log('connected to server');

  // socket.emit('createMessage', {
  //   from: "NewUser",
  //   text: "I've joined the chat!"
  // }, function(response) {
  //   console.log(response);
  // });

});

socket.on('newMessage', function (newMessage) {
  const { from, text, createdAt } = newMessage;
  console.log(`${from}(${createdAt}): ${text}`);
  const li = jQuery('<li></li>');
  li.text(`${ from }(${ createdAt }): ${ text }`);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  //console.log(e.target[0].value);
  socket.emit('createMessage', {
    from: "Omer",
    text: jQuery('[name=message]').val()
  }, function (response) {
    console.log(response);
  });
});