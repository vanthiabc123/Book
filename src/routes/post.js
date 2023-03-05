const { Router } = require('express');
const router = Router();
const path = require('path');
const controllers = require('../controller/post');
const Post = require('../models/posts');
const Category = require('../models/category');
const fileUploader = require('../middlewares/cloudinary');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).select('_id title categoryId image createAt');
    const categories = await Category.find({}).select('_id name');

    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'index'), {
      title: 'index',
      posts,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

router.get('/new', controllers.newForm);

router.post('/', fileUploader.single('file'), controllers.create);
router.put('/', controllers.edit);

router.delete('/', controllers.remove);
router.get('/edit/:id', controllers.editForm);

// }
module.exports = router;
