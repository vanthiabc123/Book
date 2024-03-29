const User = require("../models/user");
const showPage = (req, res) => {
  res.render("login", { title: "Login" });
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const isValid = await user.isValidPassword(password);
      if (isValid) {
        req.session.user = user;
        // res
        //   .status(200)
        //   .json({
        //     user: user._id,
        //     username: user.username,
        //     email: user.email,
        //     password: user.password,
        //     createdAt: user.createAt,
        //   });
        if (req.session.user.username !== "admin") res.redirect("/");
        else res.redirect("/admin/posts");
      } else {
        res.redirect("/login");
      }
    } else {
      console.log("User not found");
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};
const logout = (req, res) => {
  req.session.user = null;
  res.redirect("/login");
};

module.exports = {
  showPage,
  login,
  logout,
};
