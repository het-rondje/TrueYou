// eslint-disable-next-line new-cap
const routes = require('express').Router();
const UserController = require('../controllers/user.controller');

routes.get('/users', UserController.getAllUsers);
routes.get('/users/:id', UserController.getUser);
routes.get('/users/:id/viewers', UserController.getViewers);

routes.post('/users', UserController.createUser);

module.exports = routes;
