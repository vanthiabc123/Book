const express = require("express");
const router = express.Router();
const postDetailsController = require("../controller/postDetailsController");
router.get("/postDetails/:id", postDetailsController.showPage);
module.exports = router;
