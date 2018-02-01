const socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('newMessage', function (newMessage) {
  const { from, text, createdAt } = newMessage;
  const formatedTime = moment(createdAt).format('k:mm:ss')
  const li = jQuery('<li></li>');
  li.text(`${from}(${formatedTime }): ${ text }`);
  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newLocationMessage', function ({ from, createdAt, url }) {
  const formatedTime = moment(createdAt).format('k:mm:ss')
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${from}(${formatedTime }):`);
  a.attr('href', url);
  li.append(a);
  jQuery('#messages').append(li);
});

const messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: "Omer",
    text: messageTextbox.val()
  }, function (response) {
    messageTextbox.val('');
  });
});

const locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if(!navigator.geolocation) return alert('Geolocation not suppoerted by your browser.');
  
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location...');
    const { latitude, longitude } = position.coords;
    socket.emit('createLocationMessage', {
      latitude,
      longitude  
    })
  }, function() {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location...');
  });
  
});