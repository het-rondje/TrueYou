// esling no-underscore-dangle: 0
const NodeRSA = require('node-rsa');
const User = require('../models/user');
const ApiError = require('../models/ApiError');
const Logger = require('../middleware/logger');

let io = null;

module.exports = {
  setIo(socketInstance) {
    io = socketInstance;
  },

  postMessage(message, id) {
    User.findOne({
      _id: id,
    })
      .then((user) => {
        user.messages.push(message);
        user.save((err) => {
          if (err) {
            return console.log(`error saving message: ${err}`);
          }
          Logger.info(`User_id: ${user._id} with name: ${user.firstName} ${user.lastName} posted a message: ${message.text}`);
          return null;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getViewers(req, res) {
    const { id } = req.params;
    const viewerCount = io.sockets.adapter.rooms[id].length;

    console.log(`viewers of stream: ${id} total: ${viewerCount}`);
    res.send(`viewers of stream: ${id} total: ${viewerCount}`);
  },

  createUser(req, res, next) {
    // Generate keys
    const key = new NodeRSA({ b: 512 });
    key.generateKeyPair();
    const publicKey = key.exportKey('pkcs8-public');
    const privateKey = key.exportKey('pkcs8-private');

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      publicKey,
      notPrivateKey: privateKey,
    });

    // Validate user
    if (!User.validate(newUser)) {
      console.log('error in validation');
      return res.status(401).send('Invalid first or last name.');
    }

    // Add to db
    newUser.save()
      .then((result) => {
        res.status(201).send({
          message: 'user created',
          user: result,
        });
        Logger.info(`User_id: ${result._id} with name: ${result.firstName} ${result.lastName} was created.`);
      })
      .catch(() => {
        next(new ApiError('Error saving user.', 500));
      });
    return new ApiError('Server error', 500);
  },

  loginUser(req, res) {
    // In middleware id and signature are checked.

    // Gather required data.
    const { id } = req.params;
    User.findOne({ _id: id })
      .then((user) => {
        if (!user) {
          return res.status(500).send({ message: 'Failed' });
        }
        Logger.info(`User_id: ${user._id} with name: ${user.firstName} ${user.lastName} logged in.`);
        return res.status(200).send({
          message: 'Authorized',
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        });
      }).catch(() => res.status(500).send({ message: 'Failed' }));
  },

  getAllUsers(req, res, next) {
    User.find()
      .select('_id firstName lastName publicKey online streamKey satoshi multiplier messages')
      .then((user) => {
        console.log(user);
        res.send(user);
      })
      .catch(next);
  },

  getPublicKeys(req, res, next) {
    User.find()
      .select('_id  publicKey')
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },

  getUser(req, res, next) {
    const { id } = req.params;

    User.findById(id)
      .select('_id firstName lastName publicKey online streamKey satoshi multiplier messages')
      .then((message) => {
        res.send(message);
      })
      .catch(next);
  },
};
