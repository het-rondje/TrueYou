// eslint-disable-next-line new-cap
const routes = require('express').Router();
const UserController = require('../controllers/user.controller');
const StreamController = require('../controllers/stream.controller');
const authPost = require('../middleware/authPost');
const authGet = require('../middleware/authGet');

routes.get('/users', authGet, UserController.getAllUsers);
routes.get('/publickeys', authGet, UserController.getPublicKeys);

routes.get('/users/:id', authGet, UserController.getUser);
routes.get('/users/:id/viewers', authGet, UserController.getViewers);

routes.post('/users/:id', authPost, UserController.loginUser);
routes.post('/users', UserController.createUser);

routes.post('/streams/:id/', StreamController.controlStream);
routes.get('/streams', StreamController.getStreams);

module.exports = routes;
