const User = require("../models/user");
const moment = require("moment");
const fileUploader = require("../middlewares/cloudinary");
const cloudinary = require("cloudinary").v2;

const showProfileUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("profile", { user, moment });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const editProfileUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { username, email } = req.body;
    if ((username, email)) {
      user.username = username;
      user.email = email;
    }
    const file = req.avatar.path;
    const result = await cloudinary.uploader.upload(file);
    user.avatar = result.secure_url;

    await user.save();
    res.redirect("/profile/" + user._id);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports = {
  showProfileUser,
  editProfileUser,
};
