/* eslint-disable require-jsdoc */
//
// General Api errorhandling class
//
'use strict';

class ApiError {
  constructor(message, code) {
    this.message = message;
    this.code = code;
    this.datetime = new Date().toISOString();
  }
}

module.exports = ApiError;
