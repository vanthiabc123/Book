const Post = require("../models/posts");
const User = require("../models/user");
const moment = require("moment");
const Comment = require("../models/comments");
const showPage = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const user = req.session.user;
  const comments = await Comment.find({ postId: post._id }).populate("userId");
  res.render("postDetails", {
    title: "Post Details",
    post,
    moment,
    comments,
    user,
  });
};
const addComments = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const { content } = req.body;
  const comment = await Comment.create({
    content,
    postId: post._id,
    userId: req.session.user._id,
  });
  if (!Array.isArray(post.comments)) {
    post.comments = [];
  }
  post.comments.push(comment._id);
  await post.save();
  res.redirect(`/postDetails/${post._id}`);
};
const deleteComments = async (req, res) => {
  // check if the user is the owner of the comment
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId == req.session.user._id) {
      await Comment.findByIdAndDelete(req.params.commentId);
      res.redirect(`/postDetails/${req.params.id}`);
    } else {
      res.redirect(`/postDetails/${req.params.id}`);
    }
  } catch (error) {
    res.redirect(`/postDetails/${req.params.id}`);
  }
};

module.exports = {
  showPage,
  addComments,
  deleteComments,
};