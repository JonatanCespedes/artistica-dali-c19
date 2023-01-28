const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");

router.get("/category/:id", controller.category); 

module.exports = router;