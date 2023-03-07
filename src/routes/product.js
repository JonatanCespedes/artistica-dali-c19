const express = require("express");
const router = express.Router();
const {detail, category} = require("../controllers/productController");

/* GET - Product Detail */
router.get('/detail/:id', detail)
/* GET - List products for category */
router.get("/category/:id", category); 

module.exports = router;