var socket = io();

socket.on('connect', function () {
  console.log('connected to server');
});


socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('k:mm:ss');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('k:mm:ss');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });
  jQuery('#messages').append(html);
});

var messageTextbox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: "Omer",
    text: messageTextbox.val()
  }, function (response) {
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if(!navigator.geolocation) return alert('Geolocation not suppoerted by your browser.');
  
  locationButton.attr('disabled', 'disabled').text('Sending location...');
  
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location...');
    var { latitude, longitude } = position.coords;
    socket.emit('createLocationMessage', {
      latitude,
      longitude  
    })
  }, function() {
    alert('Unable to fetch location.');
    locationButton.removeAttr('disabled').text('Send location...');
  });
  
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});