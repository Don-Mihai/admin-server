const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// установка схемы
const UsersScheme = new Schema(
  {
    status: String,
    created: String,
    role: String,
    email: String,
    name: String,
    password: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Users = mongoose.model('Users', UsersScheme);

module.exports = Users;
