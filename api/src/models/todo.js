const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String },
    description: { type: String },
    userId: { type: String },
    status: { type: String, default: 'new'}
}, { timestamps: true });

module.exports = model('todos', schema);