/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');

const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        return emailRegex.test(email);
      },
      message: 'Email invalid',
    },
  },
  document: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
