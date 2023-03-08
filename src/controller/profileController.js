const User = require("../models/user");

const showProfileUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render("profile", { user });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

const editProfileUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};

module.exports = {
  showProfileUser,
};
