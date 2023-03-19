const express = require("express");
const router = express.Router();
const homePageController = require("../controller/homePageController");
router.get("/", homePageController.showPage);
// load more
router.get("/loadMore", homePageController.loadMore);

module.exports = router;
