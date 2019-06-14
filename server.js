const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const UserController = require('./controllers/user.controller');
const routes = require('./routes/router');

app.use(cors());

UserController.setIo(io);
require('./config/mongo.db');

var isTokenValid = (token) => {
	//authenticat encryption or user record in database
	return true;
}

  // middleware to verify on Connecting and Reconnecting
  io.use((socket, next) => {
    let token = socket.handshake.query.token;
    if (true || isTokenValid(token)) {
      return next();
    }
    return next(new Error('authentication error'));
  });

io.on('connection', (socket) => {
  console.log('a user connected with ip: ' + socket.handshake.address);
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('join', (roomId) => {
    socket.join(roomId);

    console.log(`user joined room: ${roomId}`);
  });

  socket.on('message', (msg) => {
    console.log(
      `message from: ${msg.sender} with content: ${msg.text
      } to room: ${msg.roomId}`,
    );

    UserController.postMessage({ sender: msg.sender, text: msg.text },
      msg.roomId);

    // instantly pass message to everyone connected
    // io.emit('message', msg);
    io.sockets.in(msg.roomId).emit('message', msg);
  });
});

// https://expressjs.com/en/advanced/best-practice-performance.html
app.use(compression());

// bodyParser parses the body from a request
// hierin zit de inhoud van een POST request.
app.use(
  bodyParser.urlencoded({
    extended: 'true',
  }),
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(
  bodyParser.json({
    type: 'application/vnd.api+json',
  }),
); // parse application/vnd.api+json as json

// Add CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 'http://localhost:4200');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,content-Type,authorization,'
      + 'Authorization,Connection,Host',
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/api', routes);

// Catch-all error handler according to Express documentation -
// err should always be an ApiError!
// See also http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res) => {
  res
    .status(err.code || 404)
    .json(err)
    .end();
});

app.listen(3001, () => {
  console.log('api server running on port : 3001');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
