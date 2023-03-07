const express = require("express");
const router = express.Router();
const {
    index,
    products,
    create,
    store,
    edit,
    update,
    destroy
} = require("../controllers/adminController");
const uploadProductFile = require("../middlewares/uploadProductFile")
const productValidator = require("../validations/productValidator");

/* GET - Index */
router.get("/", index);

/* PRODUCTS */

/* GET - Products list */
router.get("/products", products);
/* GET - Product create form */
router.get("/products/create", create);
/* POST - Product store */
router.post("/products/create", uploadProductFile.array("images"), productValidator, store);
/* GET - Product edit form */
router.get("/products/edit/:id", edit);
/* PUT - Product update */
router.put("/products/edit/:id", uploadProductFile.array("images"), productValidator, update);
/* DELETE - Product delete */
router.delete("/products/delete/:id", destroy);

module.exports = router;