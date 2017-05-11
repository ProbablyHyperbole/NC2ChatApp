const path = require('path'); //Native
const http = require('http');
const express = require('express'); //NonNative
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath));

var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New User Connected');

socket.emit('newMessage', {
from: 'Admin',
text: 'Welcome to the chat!'
});

socket.broadcast.emit('newMessage', {
  from: 'admin',
  text:'new user joined the chat',
  createdAt: new Date().getTime()
});

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });

  socket.on('createMessage', (message) => {
  io.emit('newMessage', {
    from:message.from,
    text:message.text,
    createdAt: new Date().getTime()
  });
  });



});


server.listen(port, () => {
console.log(`Server is up on ${port}`);
});
