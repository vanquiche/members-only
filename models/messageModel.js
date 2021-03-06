const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true},
  createdAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
