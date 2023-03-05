const { Router } = require('express');
const router = Router();
const path = require('path');
const controllers = require('../controller/post');
const Post = require('../models/posts');
const Category = require('../models/category');
const fileUploader = require('../middlewares/cloudinary');

router.get('/', async (req, res) => {
  try {
    let searchOptions = {};
    if (req.query.title != null && req.query.title !== '') {
      searchOptions.title = new RegExp(req.query.title, 'i');
    }

    const posts = await Post.find(searchOptions).populate({
      path: 'categoryId',
      select: 'name',
      searchOptions,
    });

    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'index'), {
      title: 'index',
      posts,
      searchOptions: req.query,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

router.get('/new', controllers.newForm);

router.post('/', fileUploader.single('file'), controllers.create);
router.put('/', fileUploader.single('file'), controllers.edit);

router.delete('/', controllers.remove);
router.get('/edit/:id', controllers.editForm);

// }
module.exports = router;
