const Category = require('../models/category');
const Post = require('../models/posts');
const path = require('path');
const url = require('url');
const newForm = async (req, res) => {
  res.render(path.join(__dirname, '..', 'views', 'admin', 'categories', 'create'), {
    category: new Category(),
    title: 'Thêm danh mục',
  });
};

const editForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.render(path.join(__dirname, '..', 'views', 'admin', 'categories', 'edit'), {
      title: 'Sử danh mục',
      category: category,
    });
  } catch (error) {
    console.log('controller category:::', error);
    res.redirect('/admin/categories');
  }
};

const edit = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.body.id, req.body, {
      runValidators: true,
    });
    res.redirect('/admin/categories');
  } catch (error) {
    res.render(path.join(__dirname, '..', 'views', 'admin', 'categories', `edit`), {
      title: 'Sửa danh mục',
      category: req.body,
    });
    console.log(error);
  }
};
const remove = async (req, res) => {
  try {
    const id = req.body.id;
    const post = await Post.findOne({ categoryId: id });
    if (post) {
      res.redirect('/admin/categories');
      return;
    } else {
      await Category.findByIdAndDelete(req.body.id);
      res.redirect('/admin/categories');
    }
  } catch (error) {
    console.log(error);
  }
};

const create = async (req, res, next) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.redirect('/admin/categories');
  } catch (error) {
    res.render(path.join(__dirname, '..', 'views', 'admin', 'categories', 'create'), {
      title: 'Categories',
      category: category,
    });
  }
};
module.exports = {
  newForm,
  create,
  editForm,
  edit,
  remove,
};
