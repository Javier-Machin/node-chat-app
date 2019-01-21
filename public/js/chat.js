const socket = io();

// listen to server successful connection
socket.on('connect', function () {
  console.log('Connected to server');
});

// listen to messages emitted from the server and display them
socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.getElementById('message-template').innerHTML;

  const html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  
  document.getElementById("received-messages").innerHTML += html;
  scrollToBottom();
});

// listen to location messages emitted from the server and display them
socket.on('newLocationMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = document.getElementById('location-message-template').innerHTML;
  const html = Mustache.render(template, {
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  document.getElementById("received-messages").innerHTML += html;
  scrollToBottom();
});

// listen to server disconnection
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// listen to form submit and create a createMessage event using the input value as text

const messageForm = document.getElementById('message-form');

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const textBox = document.querySelector("input[name='message']");

  socket.emit('createMessage', {
    from: 'User',
    text: textBox.value
  }, function (data) {
    // resets input after sending message
    textBox.value = '';
  });
});


// listen to send location click

const locationButton = document.getElementById("send-location");

locationButton.addEventListener("click", function () {
  if (!navigator.geolocation) return alert('Geolocation not supported by your browser.');

  // change button text to give feedback on the request and disable it
  locationButton.innerHTML = 'Sending location...';
  locationButton.disabled = true;

  navigator.geolocation.getCurrentPosition(function (position) {
    // reset button to original state once the request is done
    locationButton.innerHTML = 'Send location';
    locationButton.disabled = false;

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});