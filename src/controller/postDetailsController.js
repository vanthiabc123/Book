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
      commentId: comment._id,
      userId: req.session.user._id,
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
  // ajax request to delete comments
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId == req.session.user._id) {
      await comment.remove();
      res.status(200).json({ commentId: req.params.commentId });
    } else {
      res.status(200).json({ message: "Bạn không có quyền xóa bình luận này" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  showPage,
  addComments,
  deleteComments,
};
