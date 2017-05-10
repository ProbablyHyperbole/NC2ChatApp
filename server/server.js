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

  socket.on('disconnect', () => {
    console.log('User Disconnected');
  });

  socket.on('createMessage', (message) => {
  console.log('createMessage', message);
  });

    socket.emit('newMessage', {
      from: 'John',
      text: 'See you then',
      createdAt: 123123
    });

});





server.listen(port, () => {
console.log(`Server is up on ${port}`);
});
