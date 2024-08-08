/* eslint-disable import/no-extraneous-dependencies */
// Este modelo nos permite definir la esturctura a guardar en la base de datos

const mongoose = require('mongoose');

const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
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
  role: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
    require: true,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
