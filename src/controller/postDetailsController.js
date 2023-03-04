const Post = require("../models/posts");
const moment = require("moment");
const showPage = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("postDetails", { title: "Post Details", post, moment });
};

module.exports = {
  showPage,
};
