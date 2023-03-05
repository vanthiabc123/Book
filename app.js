// Imports
const express = require("express");
const app = express();
const port = 5001;
require("dotenv").config();
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const registerRouter = require("./src/routes/registerRouter");
const loginRouter = require("./src/routes/loginRouter");
const homePageRouter = require("./src/routes/homePageRouter");
const postDetailsRouter = require("./src/routes/postDetailsRouter");
const methodOverride = require("method-override");

// conect DB
// Connection URL. This is where your mongodb server is running.
mongoose.set("strictQuery", true);
const conectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "news",
    });
  } catch (error) {
    console.log(error);
  }
};
conectDB();
mongoose.connection.once("open", () => {
  console.log("connection open");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(methodOverride("_method"));

const getUser = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};
app.use(getUser);

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});
// Static Files
app.use(express.static("public"));

// Set View's
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/", homePageRouter);
app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", postDetailsRouter);

// admin
app.use("/admin/categories", require("./src/routes/category"));
app.use("/admin/posts", require("./src/routes/post"));

app.listen(port, () => console.info(`App listening on port ${port}`));
