const Post = require("../models/posts");
const moment = require("moment");
const sanitizeHtml = require("sanitize-html");
const showPage = async (req, res) => {
  const posts = await Post.find({ feature: false }).populate({
    path: "categoryId",
    select: "name",
  });
  const postFeature = await Post.find({
    feature: true,
  })
    .sort({ createdAt: -1 })
    .limit(4)
    .populate({
      path: "categoryId",
      select: "name",
    });
  res.render("index", {
    title: "Home",
    posts,
    moment,
    postFeature,
    sanitizeHtml,
  });
};

module.exports = {
  showPage,
};
