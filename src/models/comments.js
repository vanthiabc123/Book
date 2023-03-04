const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  userId: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  postId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],

  content: {
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
module.exports = mongoose.model("Comment", commentSchema);
