const Post = require("../models/posts");
const User = require("../models/user");
const moment = require("moment");
const Comment = require("../models/comments");
const sanitizeHtml = require("sanitize-html");

const showPage = async (req, res) => {
  const post = await Post.findById(req.params.id).populate({
    path: "categoryId",
    select: "name",
  });
  const user = req.session.user;
  const comments = await Comment.find({ postId: post._id }).populate("userId");
  res.render("postDetails", {
    title: "Post Details",
    post,
    moment,
    comments,
    user,
    sanitizeHtml,
  });
};
const addComments = async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    // ajax request to add comments
    const comment = new Comment({
      userId: req.session.user._id,
      postId: post._id,
      content: req.body.content,
    });
    await comment.save();
    res.status(200).json({
      comment: req.body.content,
      username: req.session.user.username,
      avatar: req.session.user.avatar,
      createAt: moment().fromNow(),
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/postDetails/${req.params.id}`);
  }
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
