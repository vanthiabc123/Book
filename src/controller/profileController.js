const User = require("../models/user");
const moment = require("moment");

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
    const { username, email, password } = req.body;
    if ((username, email)) {
      user.username = username;
      user.email = email;
    }
    const avatar = req.file?.path;
    const filename = req.file?.filename;
    if (avatar && filename) {
      user.avatar = avatar;
      user.filename = filename;
    } else {
      user.avatar = user.avatar;
      user.filename = user.filename;
    }
    // kiem tra xem password o form co khac voi password trong db khong neu khac thi update password con khong thi khong lam gi ca
    if (password !== user.password) {
      user.password = password;
    }

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
