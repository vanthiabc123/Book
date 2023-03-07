const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Categories",
  },
  image: {
    type: String,
    required: false,
    trim: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
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

module.exports = mongoose.model("Posts", postSchema);
