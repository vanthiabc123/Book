const User = require("../models/user");
const path = require("path");

const listUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.render(path.join(__dirname, "..", "views", "admin", "users", "index"), {
      title: "Danh sách người dùng",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};
module.exports = {
  listUser,
};
