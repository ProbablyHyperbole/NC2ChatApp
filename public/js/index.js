var socket = io();

socket.emit('createMessage', {
  from: "Pam",
  text: "Hey Jim!"
});

socket.on('connect', function ()  {
  console.log('Connected to Server')
});

socket.on('disconnect', function ()  {
  console.log('Disconnected from Server!');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});
