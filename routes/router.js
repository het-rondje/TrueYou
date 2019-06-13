// eslint-disable-next-line new-cap
const routes = require('express').Router();
const UserController = require('../controllers/user.controller');
const StreamController = require('../controllers/stream.controller');

routes.get('/users', UserController.getAllUsers);
routes.get('/users/:id', UserController.getUser);
routes.get('/users/:id/viewers', UserController.getViewers);

routes.post('/users/:id', UserController.postLoginUser);
routes.post('/users', UserController.createUser);

routes.post('/streams/:id/', StreamController.postStream);

module.exports = routes;
