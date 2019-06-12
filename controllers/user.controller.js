const assert = require('assert')
const User = require('../models/user')
const logger = require('../config/config').logger
const Message = require('../models//message').MessageSchema;
const ApiError = require('../models/ApiError')
var io = null;
module.exports = {

    setIo(socketInstance){
        io = socketInstance;
    },

    postMessage(message, id) {
        User.findOne({ _id: id })
            .then(user => {
                user.messages.push(message)

                user.save(function (err) {
                    if (err) return console.log('error saving message');
                    // saved!
                    console.log('succes saving message');
                  });
            })            
            .catch(error => {
                console.log(error);
            })
    },

    getViewers(req, res, next){
        const { id } = req.params;
        var viewerCount = io.sockets.adapter.rooms[id].length
        
        console.log("viewers of stream: " + id + " total: " + viewerCount)
        res.send("viewers of stream: " + id + " total: " + viewerCount)
    },

    createUser(req, res, next){

        //Generate uuid
        //Generate keys
        
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }

        //Validate user
        //Add to db
        //Respond created user
    },

    getAllUsers(req, res, next){
        User.find()
            .select('firstname lastname streamUrl messages')
            .then(user => { res.send(user) })
            .catch(next);
    },

    getUser(req, res, next) {
        const {id} = req.params;

        User.findById(id)
            .then(message => { res.send(message) })
            .catch(next);
    }
}