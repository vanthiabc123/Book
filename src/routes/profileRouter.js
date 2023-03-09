const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
const fileUploader = require("../middlewares/cloudinary");

router.get("/profile/:id", profileController.showProfileUser);
router.post("/profile/:id", profileController.editProfileUser);
router.post(
  "/profile/:id",
  fileUploader.single("file"),
  profileController.editProfileUser
);

module.exports = router;
