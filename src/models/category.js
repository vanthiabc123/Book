const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Categories', categorySchema);
