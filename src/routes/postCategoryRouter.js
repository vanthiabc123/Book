const express = require("express");
const router = express.Router();

const postCategoryController = require("../controller/postCategoryController");
router.get("/category/:id", postCategoryController.showPage);

module.exports = router;
