const socket = io();

// listen to server successful connection
socket.on('connect', function () {
  console.log('Connected to server');
});

// listen to messages emitted from the server
socket.on('newMessage', function (message) {
  console.log('New Message!', message);

  const li = document.createElement("li");
  li.innerHTML = `${message.from}: ${message.text}`;

  document.getElementById("received-messages").appendChild(li);
});

// listen to server disconnection
socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

// listen to location messaged emitted from the server
socket.on('newLocationMessage', function (message) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.target = '_blank';
  a.href = message.url;
  a.innerHTML = 'My current location'

  li.text = `${message.from}: `
  li.appendChild(a);
  console.log(li);

  document.getElementById("received-messages").appendChild(li);
});


// listen to form submit and create a createMessage event using the input value as text

const messageForm = document.getElementById('message-form');

messageForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = document.querySelector("input[name='message']").value;

  socket.emit('createMessage', {
    from: 'User',
    text
  }, function (data) {
    console.log(data);
  });
});


// listen to send location click

const locationButton = document.getElementById("send-location");

locationButton.addEventListener("click", function () {
  if (!navigator.geolocation) return alert('Geolocation not supported by your browser.');

  // fetch location and emit event with coordinates
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location.');
  });
});