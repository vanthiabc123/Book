const Category = require('../models/category');
const Post = require('../models/posts');
const path = require('path');
const url = require('url');
const fileUploader = require('../middlewares/cloudinary');
const cloudinary = require('cloudinary').v2;

// form
const newForm = async (req, res) => {
  try {
    // categoryId;
    const categories = await Category.find({}).select('_id name');

    console.log(new Post());
    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'create'), {
      categories,
      title: 'thêm danh mục',
      post: new Post(),
    });
  } catch (error) {
    console.log(error);
  }
};

const editForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const categories = await Category.find({});
    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'edit'), {
      title: 'Sửa bài viết',
      post,
      categories,
    });
  } catch (error) {
    console.log('loi tai editformed', error);
    res.redirect('/admin/categories');
  }
};

const remove = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.body.id);
    res.redirect('/admin/posts');
  } catch (error) {
    res.redirect('/admin/posts');
  }
};

const getAllCategory = async () => {
  try {
    return await Category.find({}).select('_id name');
  } catch (error) {
    return [];
  }
};

const create = async (req, res, next) => {
  const newPost = {
    categoryId: req.body?.categoryId,
    title: req.body?.title,
    content: req.body?.content,
    feature: req.body?.feature == '1' ? true : false,
    image: req.file?.path || '',
  };
  try {
    const post = new Post(newPost);
    await post.save();
    res.redirect('/admin/posts');
  } catch (error) {
    console.log(error);
    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'create'), {
      title: 'posts',
      post: newPost,
      categories: await getAllCategory(),
    });
  }
};

const edit = async (req, res, next) => {
  // let path = undefined;
  // if (req?.file) {
  //   path = req.file.path;
  //   await cloudinary.uploader.destroy(path, (err, res) => {
  //     console.log(res);
  //   });
  // } else {
  //   path = req.body.path;
  // }

  // const categories = await Category.find().select('_id name');
  const newPost = {
    categoryId: req.body?.categoryId,
    title: req.body?.title,
    content: req.body?.content,
    feature: req.body?.feature == '1' ? true : false,
    image: req.file?.path || '',
  };

  try {
    await Post.findByIdAndUpdate(req.body.id, newPost);
    res.redirect('/admin/posts');
  } catch (error) {
    console.log(error);
    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'create'), {
      title: 'posts',
      post: newPost,
      categories: await getAllCategory(),
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
