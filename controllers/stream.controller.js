const User = require('../models/user');
const ApiError = require('../models/ApiError');

module.exports = {

  // Retrieves all streams currently online
  // Called from Angular WebClient
  getStreams(req, res, next) {
    User.find({ online: true })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch(next);
  },

  // Sends a post request to the server to make an user's stream appear online
  // Called from Android MobileClient
  postStream(req, res, next) {
    const { id } = req.params;
    const streamKey = req.body;
    User.findById(id)
      .then((user) => {
        user.set({ online: true, streamKey });
        res.status(200).send(new ApiError('OK', 200));
      })
      .catch(next);
  },

  // Sends a post request to the server to make an user's stream appear online
  // Called from Android MobileClient
  deleteStream(req, res, next) {
    const { id } = req.params;
    User.findById(id)
      .then((user) => {
        user.set({ online: false, streamKey: '' });
        res.status(200).send(new ApiError('OK', 200));
      })
      .catch(next);
  },
};
