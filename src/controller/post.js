const Category = require('../models/category');
const Post = require('../models/posts');
const path = require('path');
// const url = require('url');
// const fileUploader = require('../middlewares/cloudinary');
const cloudinary = require('cloudinary').v2;

// Đoạn mã trên định nghĩa một hàm bất đồng bộ list
//  nhận vào hai tham số req và res. Hàm này được thiết kế để lấy
//  danh sách bài viết dựa trên các yêu cầu tìm kiếm được truyền vào thông qua tham số req.query.
const list = async (req, res) => {
  try {
    let searchOptions = {};
    if (req.query.title != null && req.query.title !== '') {
      searchOptions.title = new RegExp(req.query.title, 'i');
    }

    const posts = await Post.find(searchOptions)
      .populate({
        path: 'categoryId',
        select: 'name',
      })
      .select('-content');

    // console.log(posts);

    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'index'), {
      title: 'index',
      posts,
      searchOptions: req.query,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
};
// tạo ra form html
const newForm = async (req, res) => {
  try {
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
// form sửa
const editForm = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const categories = await Category.find({});
    console.log(post?.categoryId);
    console.log(JSON.stringify(categories[0]._id) == JSON.stringify(post?.categoryId));
    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'edit'), {
      title: 'Sửa bài viết',
      post,
      categories,
    });
  } catch (error) {
    console.log('loi tai editformed', error);
    res.redirect('/admin/posts');
  }
};
// chức nawg xóa
const remove = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.body.id, { new: true });

    // delete image cloudinary
    await cloudinary.uploader.destroy(post.filename, (err, res) => {
      console.log(res);
    });
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
// thêm sp
const create = async (req, res, next) => {
  console.log(req.file);
  const newPost = {
    categoryId: req.body?.categoryId,
    title: req.body?.title,
    content: req.body?.content,
    feature: req.body?.feature == '1' ? true : false,
    image: req.file?.path || '',
    filename: req.file?.filename || '',
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
// chức nawg sửa
const edit = async (req, res, next) => {
  const newPost = {
    categoryId: req.body?.categoryId,
    title: req.body?.title,
    content: req.body?.content,
    feature: req.body?.feature == '1' ? true : false,
  };

  // nếu mà nó upp file mới thì mình xóa file cũ lưu trên clound
  if (req?.file) {
    await cloudinary.uploader.destroy(req.body.filename, (err, res) => {
      console.log(res);
    });
    // path mới
    newPost.image = req.file.path;
    newPost.filename = req.file.filename;
  } else {
    // path cũ lưu input type hidden
    newPost.image = req.body.path;
    newPost.filename = req.body.filename;
  }

  try {
    await Post.findByIdAndUpdate(req.body.id, newPost);
    res.redirect('/admin/posts');
  } catch (error) {
    const categories = await getAllCategory();
    console.log(categories);
    console.log(error);
    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'edit'), {
      title: 'posts',
      post: newPost,
      categories: categories,
    });
  }
};
module.exports = {
  newForm,
  create,
  editForm,
  edit,
  remove,
  list,
};
