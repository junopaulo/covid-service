const app = require('express')();
const cors = require('cors');

const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.json({message: 'Welcome to Covid Service'});
});

app.post('/covidapihook', (req, res) => {
  io.emit('covidapihook');
  res.status(200).end();
});



const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.origins(['*:*']);

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

server.listen(PORT);