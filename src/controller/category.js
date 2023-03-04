const Category = require('../models/category');
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
    console.log(req.params.id);
    const category = await Category.findById(req.params.id);
    res.render(path.join(__dirname, '..', 'views', 'admin', 'categories', 'edit'), {
      title: 'Sử danh mục',
      category: category,
    });
  } catch (error) {
    console.log('loi tai editformed', error);
    res.redirect('/admin/categories');
  }
};

const edit = async (req, res) => {
  try {
    console.log('body edit', req.body);
    const category = await Category.findByIdAndUpdate(req.body.id, req.body, {
      runValidators: true,
    });
    res.redirect('/admin/categories');
  } catch (error) {
    console.log(error);
    res.render(path.join(__dirname, '..', 'views', 'admin', 'categories', `edit`), {
      title: 'Sửa danh mục',
      category: req.body,
    });
    console.log(error);
  }
};
const remove = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.body.id);
    res.redirect('/admin/categories');
  } catch (error) {
    res.redirect('/admin/categories');
  }
};

const create = async (req, res, next) => {
  const category = new Category(req.body);
  try {
    console.log('save');
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
