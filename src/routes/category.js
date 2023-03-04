const { Router } = require('express');
const router = Router();
const path = require('path');
const controllers = require('../controller/category');
const Category = require('../models/category');

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render(path.join(__dirname, '..', 'views', 'admin', 'categories', 'index'), {
      title: 'index',
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(404);
  }
});

router.get('/new', controllers.newForm);

router.post('/', controllers.create);
router.put('/', controllers.edit);

router.delete('/', controllers.remove);
router.get('/edit/:id', controllers.editForm);

// }
module.exports = router;
