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
          l
          Logger.info(`User_id: ${user._id} with name: ${user.firstName} ${user.lastName} posted a message: ${message}`)
          //console.log('succes saving message');
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
    const key = new NodeRSA({
      b: 512,
    });
    key.generateKeyPair();
    const publicKey = key.exportKey('pkcs8-public');
    const privateKey = key.exportKey('pkcs8-private');

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      publicKey: publicKey,
      notPrivateKey: privateKey,
    });

    // Validate user
    if (!User.validate(newUser)) {
      console.log('error in validation');
      return res.status(401).send('Invalid first or last name.');
    }

    // Add to db
    newUser
      .save()
      .then((result) => {
        // Respond created user
        const localResult = result;
        localResult.notPrivateKey = undefined;
        Logger.info(`User_id: ${newUser._id} with name: ${newUser.firstName} ${newUser.lastName} was created.`)
        return res.status(201).send({
          message: 'user created',
          user: result,
        });
      })
      .catch(() => {
        next(new ApiError('Error saving user.', 500));
      });
    return new ApiError('Server error', 500);
  },
  //add logging
  async postLoginUser(req, res) {
    const { id } = req.params;
    const { pubKey, signature } = req.body;
    const user = await User.findById(id);

    if (!user) return new ApiError('No user found', 500);

    if (user.verifySignature(id, signature, pubKey)) {
      return res
        .status(200)
        .send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        });
    }
    return new ApiError('Incorrect Signature', 500);
  },

  getAllUsers(req, res, next) {
    User.find()
      .select('firstName lastName streamUrl messages')
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  },

  getUser(req, res, next) {
    const { id } = req.params;

    User.findById(id)
      .then((message) => {
        res.send(message);
      })
      .catch(next);
  },
};
