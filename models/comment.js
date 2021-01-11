const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: String, required: true, maxlength: 40 },
  content: { type: String, required: true, maxlength: 300 },
  rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
});

module.exports = mongoose.model('Comment', CommentSchema);
