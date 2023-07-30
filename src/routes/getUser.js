const express = require("express");
const router = express.Router();
const path = require("path");
const User = require("../models/user");
const { listUser } = require("../controller/getUser");

router.get("/", listUser);
module.exports = router;
