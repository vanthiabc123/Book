const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");

router.get("/profile/:id", profileController.showProfileUser);

module.exports = router;
