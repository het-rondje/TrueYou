const User = require('../models/user');
const NodeRSA = require('node-rsa');
const ApiError = require('../models/ApiError');
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

          user.save(function(err) {
            if (err) return console.log('error saving message: ' + err);
            // saved!
            console.log('succes saving message');
          });
        })
        .catch((error) => {
          console.log(error);
        });
  },

  getViewers(req, res) {
    const {id} = req.params;
    const viewerCount = io.sockets.adapter.rooms[id].length;

    console.log('viewers of stream: ' + id + ' total: ' + viewerCount);
    res.send('viewers of stream: ' + id + ' total: ' + viewerCount);
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
          result.notPrivateKey = undefined;
          res.status(201).send({
            message: 'user created',
            user: result,
          });
        })
        .catch(() => {
          next(new ApiError('Error saving user.', 500));
        });
  },

  async postLoginUser(req) {
    const {id} = req.params;
    const hashable = req.body.hashable;
    const pubKey = req.body.pubKey;
    const signature = req.body.signature;

    const user = await User.findById(id);
    user.verifySignature(hashable, signature, pubKey);
  },

  getAllUsers(res, next) {
    User.find()
        .select('firstname lastname streamUrl messages')
        .then((user) => {
          res.send(user);
        })
        .catch(next);
  },

  getUser(req, res, next) {
    const {id} = req.params;

    User.findById(id)
        .then((message) => {
          res.send(message);
        })
        .catch(next);
  },
};
