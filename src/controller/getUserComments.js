const User = require("../models/user");
const path = require("path");
const Comment = require("../models/comments");
const sanitizeHtml = require("sanitize-html");
const moment = require("moment");

// lấy danh sách tất cả bình luận của người dùng trên database và hiển thị ra trang
const listUserComments = async (req, res) => {
  try {
    // lay danh sach cmt moi nhat
    const comments = await Comment.find({}).sort({ createdAt: -1 }).populate({
      path: "userId",
      select: "username",
    });

    res.render(
      path.join(__dirname, "..", "views", "admin", "comments", "index"),
      {
        title: "Danh sách bình luận",
        comments,
        moment,
        sanitizeHtml,
      }
    );
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};

module.exports = {
  listUserComments,
};
