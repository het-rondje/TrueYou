'use strict';

const assert = require('assert')
const User = require('../models/user')
const logger = require('../config/config').logger
const Message = require('../models//message').MessageSchema;
const ApiError = require('../models/ApiError')

module.exports = {
    postMessage(message, id) {
        User.findOne(id)
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

    addUser(req, res, next){
        const { body } = req;
        
        //todo only accesable from localhost
        User.create(body)
            .then(user => res.send(user))
            .catch(next);
    },

    getAllUsers(req, res, next){
        User.find()
        .select('firstname lastname streamUrl messages')
        .then(user => { res.send(user) })
        .catch(next);
    },

    getUserProfile(req, res, next) {
        const {id} = req.params;

        User.findById(id)
        .then(message => { res.send(message) })
        .catch(next);
    }
}