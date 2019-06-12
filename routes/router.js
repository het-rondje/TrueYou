let routes = require('express').Router()
let UserController = require('../controllers/user.controller')

routes.get('/users', UserController.getAllUsers)
routes.get('/users/:id', UserController.getUserProfile)
routes.post('/users/new', UserController.addUser)

module.exports = routes