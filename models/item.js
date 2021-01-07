const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxlength: 100, trim: true },
  description: { type: String, required: true, maxlength: 300 },
  category: { type: Schema.Types.ObjectId, ref: "Subcategory", required: true },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: "Manufacturer",
    required: true,
  },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

ItemSchema.virtual('url').get(function() {
  return `/items/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
