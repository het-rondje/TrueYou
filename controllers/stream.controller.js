const User = require('../models/user');
const ApiError = require('../models/ApiError');

// Sends a post request to the server to make an user's stream appear online
// Called from Android MobileClient
function postStream(req, res, next) {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      user.set({ online: true });
      res.status(200).send(new ApiError('OK', 200));
    })
    .catch(next);
}

// Sends a post request to the server to make an user's stream appear online
// Called from Android MobileClient
function deleteStream(req, res, next) {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      user.set({ online: false });
      res.status(200).send(new ApiError('OK', 200));
    })
    .catch(next);
}


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

  controlStream(req, res, next) {
    if (req.body.online) {
      return deleteStream(req, res, next);
    }
    return postStream(req, res, next);
  },
};
