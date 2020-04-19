const app = require('express')();
const server = require('http').createServer(app);
const PORT = 8080;
const io = require('socket.io')(server);

let activity = 0;


io.on('connection', (socket) => {
  activity++; 
  console.log('a user connected ' + activity);
  var total = io.engine.clientsCount;
  socket.on('disconnect', () => {
    activity++;
    total = io.engine.clientsCount;
    io.emit('viewing',total);
    console.log('user disconnected ' + activity);
  });
  socket.on('viewing', () => {
    console.log('a user is viewing ' + activity);
    io.emit('viewing',total);
  });
});




app.post('/covidapihook', (req, res) => {
  io.emit('covidapihook');
  res.status(200).end();
});


server.listen(8080);