let routes = require('express').Router()
let UserController = require('../controllers/user.controller')

routes.get('/users', UserController.getAllUsers)
routes.get('/users/:id', UserController.getUser)
routes.post('/users', UserController.createUser)

module.exports = routes