const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");
router.get("/login", loginController.showPage);
router.post("/login", loginController.login);
router.get("/logout", loginController.logout);
module.exports = router;
