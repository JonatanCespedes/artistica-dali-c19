const express = require("express");
const router = express.Router();
const productValidator = require("../../validations/productValidator");
const { list, detail } = require("../../controllers/api/categoriesController");
const { getAll, getOne, store, update, destroy } = require("../../controllers/api/productsController");

// Categories
router
    .get("/category", list)
    .get("/category/:id", detail)
//Products
    .get("/product", getAll)
    .get("/product/:id", getOne)
    .post("/product", store)
    .put("/product/:id", update)
    .delete("/product/:id", destroy)

module.exports = router;