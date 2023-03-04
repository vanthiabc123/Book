const Post = require("../models/posts");
const moment = require("moment");
const comment = require("../models/comments");
const showPage = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("postDetails", { title: "Post Details", post, moment });
};
const comments = async (req, res) => {
  const post = await Post.findById(req.params.id);
  // user comment
  const { content } = req.body;
  const user = req.session.user;
  const newComment = await comment.create({
    content,
    user: user._id,
    post: post._id,
  });
  post.comments.push(newComment._id);
  await post.save();
  res.redirect(`/postDetails/${post._id}`);
};

module.exports = {
  showPage,
  comments,
};
