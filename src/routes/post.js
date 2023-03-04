const { Router } = require('express');
const router = Router();
const path = require('path');
const controllers = require('../controller/post');
const Post = require('../models/posts');
const fileUploader = require('../middlewares/cloudinary');

router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).select('_id title categoryId image createAt');

    console.log(posts);
    res.render(path.join(__dirname, '..', 'views', 'admin', 'posts', 'index'), {
      title: 'index',
      posts,
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
