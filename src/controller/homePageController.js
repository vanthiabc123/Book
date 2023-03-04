const Post = require("../models/posts");
const moment = require("moment");
const showPage = async (req, res) => {
  const posts = await Post.find({ feature: false });
  const postFeature = await Post.find({
    feature: true,
  })
    .sort({ createdAt: -1 })
    .limit(4);
  res.render("index", { title: "Home", posts, moment, postFeature });
};

module.exports = {
  showPage,
};
