const { Router } = require("express");
const router = Router();
const path = require("path");
const controllers = require("../controller/post");
const Post = require("../models/posts");
const Category = require("../models/category");
const fileUploader = require("../middlewares/cloudinary");

router.get("/", controllers.list);

router.get("/new", controllers.newForm);

router.post("/", fileUploader.single("file"), controllers.create);
router.put("/", fileUploader.single("file"), controllers.edit);

router.delete("/", controllers.remove);
router.get("/edit/:id", controllers.editForm);

// }
module.exports = router;
