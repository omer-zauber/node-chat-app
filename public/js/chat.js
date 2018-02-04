var socket = io();

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight'); 
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop +newMessageHeight +lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function () {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    } else {
      console.log('no error.');
    }
  });
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
  scrollToBottom();
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
  scrollToBottom();
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

socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user))
  });

  jQuery('#users').html(ol);
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});