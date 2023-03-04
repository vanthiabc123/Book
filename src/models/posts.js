const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  contents: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  categoryId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  image: {
    type: String,
    required: false,
    trim: true,
    minlength: 3,
  },
  comments: {
    type: Array,
    required: false,
    trim: true,
    minlength: 3,
  },
  feature: {
    type: Boolean,
    required: false,
    trim: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
