const Category = require("../models/category");
const Post = require("../models/posts");
const path = require("path");
const url = require("url");

// form
const newForm = async (req, res) => {
  try {
    // categoryId;
    const categories = await Category.find({}).select("_id name");
    console.log(categories);
    res.render(
      path.join(__dirname, "..", "views", "admin", "posts", "create"),
      {
        categories,
        title: "Thêm bài viết",
        post: new Post(),
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const editForm = async (req, res) => {
  try {
    console.log(req.params.id);
    const category = await Category.findById(req.params.id);
    res.render(
      path.join(__dirname, "..", "views", "admin", "categories", "edit"),
      {
        title: "Sử danh mục",
        category: category,
      }
    );
  } catch (error) {
    console.log("loi tai editformed", error);
    res.redirect("/admin/categories");
  }
};

const remove = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.body.id);
    res.redirect("/admin/categories");
  } catch (error) {
    res.redirect("/admin/categories");
  }
};

const create = async (req, res, next) => {
  console.log(req.body);
  const categories = await Category.find({}).select("_id name");

  const newPost = {
    categoryId: req.body?.categoryId,
    title: req.body?.title,
    content: req.body?.content,
    feature: req.body?.feature == "1" ? true : false,
    image: req?.file.path,
  };
  const post = new Post(newPost);
  try {
    await post.save();
    res.redirect("/admin/posts");
  } catch (error) {
    console.log(error);
    res.render(
      path.join(__dirname, "..", "views", "admin", "posts", "create"),
      {
        title: "posts",
        post: newPost,
        categories,
      }
    );
  }
};

const edit = async (req, res, next) => {
  console.log(req.body);
  const categories = await Category.find().select("_id name");

  const newPost = {
    categoryId: req.body?.categoryId,
    title: req.body?.title,
    content: req.body?.content,
    feature: req.body?.feature == "1" ? true : false,
    image: req?.file,
  };
  const post = new Post(newPost);
  try {
    await post.save();
    res.redirect("/admin/posts");
  } catch (error) {
    console.log(error);
    res.render(
      path.join(__dirname, "..", "views", "admin", "posts", "create"),
      {
        title: "posts",
        post: newPost,
        categories,
      }
    );
  }
};
module.exports = {
  newForm,
  create,
  editForm,
  edit,
  remove,
};
