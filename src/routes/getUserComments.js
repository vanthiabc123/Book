const express = require("express");
const router = express.Router();

const getUserComments = require("../controller/getUserComments");

router.get("/", getUserComments.listUserComments);

module.exports = router;
