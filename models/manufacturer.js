const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ManufacturerSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
});

ManufacturerSchema.virtual("url").get(() => {
  return `/manufacturer/${this._id}`;
});

module.exports = mongoose.Model("Manufacturer", ManufacturerSchema);
