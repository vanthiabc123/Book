const express = require('express');
const router = express.Router();
const postDetailsController = require('../controller/postDetailsController');
router.get('/postDetails/:id', postDetailsController.showPage);
router.post('/postDetails/:id/addcomments', postDetailsController.addComments);
router.get('/postDetails/:id/:commentId/delete', postDetailsController.deleteComments);
module.exports = router;
