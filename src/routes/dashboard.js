const { Router } = require("express");
const router = Router();
const controllers = require("../controller/dashboard");
router.get("/", controllers.list);

module.exports = router;
