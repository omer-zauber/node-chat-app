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

socket.on('newLocationMessage', function ({ from, createdAt, url }) {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${from}(${createdAt }):`);
  a.attr('href', url);
  li.append(a);
  jQuery('#messages').append(li);
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

const locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if(!navigator.geolocation) return alert('Geolocation not suppoerted by your browser.');
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords;
    socket.emit('createLocationMessage', {
      latitude,
      longitude  
    })
  }, function() {
    alert('Unable to fetch location.');
  });
  
});