const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: String, required: true, maxlength: 100 },
  content: { type: String, required: true, maxlength: 300 },
});

module.exports = mongoose.Model("Comment", CommentSchema);
