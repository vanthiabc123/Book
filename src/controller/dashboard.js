const path = require("path");
const Post = require("../models/posts");
const Category = require("../models/category");
const Comment = require("../models/comments");
const User = require("../models/user");
const list = async (req, res) => {
  const posts = await Post.countDocuments({});
  const postsFeature = await Post.find({
    feature: true,
  }).countDocuments({});
  const users = await User.countDocuments({});
  const categories = await Category.countDocuments({});
  const comments = await Comment.countDocuments({});

  res.render(path.join(__dirname, "..", "views", "admin", "dashboard"), {
    users,
    posts,
    postsFeature,
    categories,
    comments,
    title: "Dashboard",
  });
};

module.exports = { list };
