const User = require("../models/user");
const showPage = (req, res) => {
  res.render("register");
};
const register = async (req, res) => {
  try {
    const { username, password, email, gender, birthday } = req.body;
    const user = await User.create({
      username,
      password,
      email,
      gender,
      birthday,
      avatar: "",
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.redirect("/register");
  }
};
module.exports = {
  register,
  showPage,
};
