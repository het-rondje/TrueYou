let routes = require('express').Router()
let UserController = require('../controllers/user.controller')

routes.get('/users', UserController.getAllUsers)
routes.get('/users/:id', UserController.getUserProfile)
routes.post('/users', UserController.addUser)

module.exports = routes