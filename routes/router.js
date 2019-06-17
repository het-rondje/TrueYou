// eslint-disable-next-line new-cap
const routes = require('express').Router();
const UserController = require('../controllers/user.controller');
const StreamController = require('../controllers/stream.controller');
// const authPost = require('../middleware/authPost');
const replayCheck = require('../middleware/replayCheck');

routes.get('/users', UserController.getAllUsers);
routes.get('/users/:id', UserController.getUser);
routes.get('/users/:id/viewers', UserController.getViewers);

routes.post('/users/:id', replayCheck, UserController.loginUser);
routes.post('/users', UserController.createUser);

routes.post('/streams/:id/', StreamController.controlStream);
routes.get('/streams', StreamController.getStreams);

module.exports = routes;
