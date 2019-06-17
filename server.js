const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const UserController = require('./controllers/user.controller');
const routes = require('./routes/router');
const signature = require('./auth/signature');

app.use(cors());

UserController.setIo(io);
require('./config/mongo.db');

const pKey = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7V3z0grFmmkwt\nR2PmstixPgwSh6gEd6BIV9An1alqkebiKAS7lG1qQN077AJMK5mynK76L8GSPQGE\nwVrCCi53vL/gX0luI0CekzTzAfUDrDozQQ9Kn+HeeSLj34AwtARBWqcSNGEaCS7E\nVjkts0EnjVyf8piUTBLwi5ctuMzPjw12A+YRToiQkFs8emtlMKkKvfEU9EkY5A4I\nPncICRJSmEmC2XTsMDxhzQclaHDAh7e9WeDy7k6uTnyJXxJHcGh9KoMi/SF5oUAF\nfw0pVNcuzqkn67x49Xn5ofvdFxRihtJKh0XY8e70fvNReXNPhgZqvWN84Hz2calW\nNKL9dCy9AgMBAAECggEAQF88gWvS9zV3jWtlaWT0zlpKnaddVUOhoJoD3VwuXX8K\nvZUQoz/KJONq4WckFvY4VsY93ZvBQLWTqwEhZWFIPD5wE/HJ8n1Me/CLFiELBpsM\nWIY3ceXkH6SyF2i5zIJen/I9TCURZHfZSP9zoD9i2Ota817RjMtjCqJ8bOp9/adM\nRZk20okFw8AgEHYbGYTFutmHkgGh9CHEzBUFu53ewrFtzJin3NhC9NA90tXO4jXh\n7KGJoCLLH7D8TLsj747glFmw+W4VclhOF9Xf6yRtvjVBe/0j5cKhpqX67B9M/5C9\nPR1iD+PDMUtLjryH6DQo3TzahhruqgTNLt1YxA+5wQKBgQDlvcMJDxqA0wPdd6yz\n4o+/KMk8tVA0q9bckHPLqaaaGhT3Oi9IXv48Hh8hV3zODHSD1X1h8ksbNJ4eRB+i\nIq/PuVh2IeG+IDC0mf7U3cCbN4Aq+t7cc/X3A39YtcWGrVorYpvnFunFx64w+3iH\nRLcs26YUgZQUhS3C0kPiVzm+sQKBgQDQwR1yWAX8Vzmejy2OOa4wVeWgJ6Z9hB7n\n2Wxzub5sKgFJXvPberh6O5JPrOOCsL8t1Eqa+M+6LshjqYhqB+nT2qf2TPpAUbNi\nb6C8Vh/wZ+iO09weRdYO+uoEbg9pgGgE0fLzYeSoNrv9u/yModJ20mHrq3F1oU1G\n4yGsi7ZJzQKBgQDDuUPkftqMb7l2PxOB+P2P1NaEgs9+3/rf06zjEHhgBuJfsVFA\n7bTYUK0iwZ8RB6ln+0SjYkE8PzqJ/G2ausRfSr8jfUANsuzrn9prTTReyAzIEQw2\nchBVTcR7Nfi/AQa1uX+qg2nL1o7/Ke4IB7GqZMJ769zVEpTmyi2NMdR/MQKBgDs7\nAALojNI7YYLmtxNKtGzMgnm9plSovygjncz8H9aK2JCb228j0+ICsxHeSTNUuPnk\n6UItZKs8COmWObl0A1l0CgItdzf2toIwkBfADBHnOaoE3MjOId1gPjQBkmfp4hm0\nBE4gMYO0/AQTaaXxaEkEinoWy/uHR+jcGzrc7VzlAoGBAI3UuJlJ3FtZax1DdgXJ\n38V3N1ECOU1EuoK1NvOAnvvJABFRpHhv0+4TAYMiBMK0sCCvVPukmQcIvXkKqOdx\n3vuXNbFKNBifUuQACdm+HDsk6CivkxCVMXfZVWPjfhwAf4J1Bb3OrgNegDXzP5n3\ngIr9y7nnnCntOjUppTtgf46U\n-----END PRIVATE KEY-----';

const body = {
  randomString: 'dfc6r2vq29dtuboiadn',
};

console.log(signature.signSignature(JSON.stringify(body), pKey));


// authenticat encryption or user record in database
const isTokenValid = token => true;

// middleware to verify on Connecting and Reconnecting
io.use((socket, next) => {
  const { token } = socket.handshake.query;
  if (isTokenValid(token)) {
    return next();
  }
  return next(new Error('authentication error'));
});

io.on('connection', (socket) => {
  console.log(`a user connected with ip: ${socket.handshake.address}`);

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

// // Catch-all error handler according to Express documentation -
// // err should always be an ApiError!
// // See also http://expressjs.com/en/guide/error-handling.html
// app.use((err, req, res) => {
//   res
//     .status(err.code || 500)
//     .json(err)
//     .end();
// });

app.listen(3001, () => {
  console.log('api server running on port : 3001');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
