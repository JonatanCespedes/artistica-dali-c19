const express = require("express");
const router = express.Router();
const controller = require("../controllers/indexController");
const cookieCheck = require("../middlewares/cookieCheck");

router.get("/", cookieCheck, controller.index); 

module.exports = router;