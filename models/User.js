const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

// Define collection and schema for User
let User = new Schema({
  _id: {
    type: ObjectId
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  draw: {
    type: Boolean
  },

},{
    collection: 'users'
});

User.set('versionKey', false);

module.exports = mongoose.model('User', User);