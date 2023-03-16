const Post = require("../models/posts");
const moment = require("moment");
const sanitizeHtml = require("sanitize-html");

const showPage = async (req, res) => {
  const posts = await Post.find({ categoryId: req.params.id }).populate({
    path: "categoryId",
    select: "name",
  });
  res.render("postCategory", {
    title: "Post Category",
    posts,
    moment,
    sanitizeHtml,
  });
};
module.exports = {
  showPage,
};
