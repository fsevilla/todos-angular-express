const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    status: { type: String, default: 'active' }
});

module.exports = model('users', schema);