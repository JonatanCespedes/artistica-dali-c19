const express = require("express");
const router = express.Router();
const {detail, category, subcategory, cart, search} = require("../controllers/productController");
const userSessionCheck = require("../middlewares/userInSessionCheck");

/* GET - Product Detail */
router.get('/detail/:id', detail)
/* GET - List products by category */
router.get("/category/:id", category); 
/* GET - List products by subcategory */
router.get("/subcategory/:id", subcategory); 
/* GET - Product in cart view */
router.get("/cart", userSessionCheck, cart); 
/* GET - Search result*/
router.get("/search", search); 

module.exports = router;