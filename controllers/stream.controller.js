const User = require('../models/user');
const ApiError = require('../models/ApiError');
const Satoshi = require('../satoshi/satoshi');

const satoshiInstance = new Satoshi();
// Sends a post request to the server to make an user's stream appear online
// Called from Android MobileClient
function postStream(req, res, next) {
  const { id } = req.params;
  User.findOneAndUpdate({ _id: id }, { online: true })
    .then((user) => {
      console.log(user);
      Logger.info(`User_id: ${newUser._id} with name: ${newUser.firstName} ${newUser.lastName} started streaming.`);
      satoshiInstance.addToPool(id);
      res.status(200).send(new ApiError('OK', 200));
    })
    .catch(next);
}

// Sends a post request to the server to make an user's stream appear online
// Called from Android MobileClient
function deleteStream(req, res, next) {
  const { id } = req.params;
  User.findOneAndUpdate({ _id: id }, { online: false })
    .then(() => {
      Logger.info(`User_id: ${newUser._id} with name: ${newUser.firstName} ${newUser.lastName} stopped streaming.`);
      satoshiInstance.removeFromPool(id);
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
    if (req.params.id) {
      if (req.body.online) {
        return postStream(req, res, next);
      }
      return deleteStream(req, res, next);
    }
    return new ApiError('OK', 200);
  },
};
