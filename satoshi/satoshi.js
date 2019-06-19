const _ = require('lodash');
const User = require('../models/user');
const Stream = require('./stream');

// 5 stands for amount of minutes (1000 ms = 1 sec, 60 sec = 1 min)
const POOL_INTERVAL = (60 * 1000) * 1;
const MULTIPLIER_COOLDOWN = (60 * 1000) * 59;

let instance = null;

module.exports = class Satoshi {
  constructor() {
    if (!instance) {
      instance = this;
      this.users = [];
      this.init();
    }
    return instance;
  }

  init() {
    setInterval(() => {
      this.users.forEach((e) => {
        e.elapsed += 1;
        if (e.elapsed % 60 === 0) {
          const multiplier = Math.round(e.elapsed / 60);
          let amount = 1;

          if (multiplier !== 1) {
            amount = 2 ** multiplier;
          }
          User.findOneAndUpdate({ _id: e.userid }, { satoshi: amount, multiplier })
            .then(() => {
              // TODO implement logging
            });
        }
      });
    }, POOL_INTERVAL);
  }

  addToPool(userid) {
    this.users.push(new Stream(userid, 0));
  }

  removeFromPool(userid) {
    setTimeout(() => {
      User.findOne({ _id: userid })
        .then((user) => {
          if (!user.online) {
            // eslint-disable-next-line no-param-reassign
            user.multiplier = 0;
            user.save();
          }
        });
    }, MULTIPLIER_COOLDOWN);
    _.remove(this.users, s => s.userid === userid);
  }
};
