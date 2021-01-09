const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 100 },
  parentCategory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

SubcategorySchema.virtual('url').get(function () {
  return `/categories/${this.parentCategory._id.toString()}/${this._id}`;
});

module.exports = mongoose.model('Subcategory', SubcategorySchema);
