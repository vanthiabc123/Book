const Post = require("../models/posts");
const moment = require("moment");
const sanitizeHtml = require("sanitize-html");

const showPage = async (req, res) => {
  const posts = await Post.find({ feature: false })
    .populate({
      path: "categoryId",
      select: "name",
    })
    .limit(3);
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

const loadMore = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  try {
    const posts = await Post.find({ feature: false })
      .limit(limit)
      .skip(skip)
      .populate({
        path: "categoryId",
        select: "name",
      });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// module.exports = {
//   showPage,
//   loadMore,
// };
module.exports={
  showPage,loadMore,
}
