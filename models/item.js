const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 300 },
  category: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  manufacturer: {
    type: Schema.Types.ObjectId,
    ref: 'Manufacturer',
    required: true,
  },
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

ItemSchema.virtual('rating').get(function () {
  const ratings = this.comments.map((comment) => {
    return comment.rating;
  });
  return (
    ratings.reduce((total, rating) => (total += rating), 0) / ratings.length
  );
});

ItemSchema.virtual('url').get(function () {
  return `/items/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);
