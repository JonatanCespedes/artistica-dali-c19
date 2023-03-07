const {products, categories, writeProductsJson} = require("../database");

let subcategories = [];
products.forEach(product => {
    if(!subcategories.includes(product.subcategory)){
        subcategories.push(product.subcategory)
    }  
});

module.exports = {
    index: (req, res) => {
        return res.render("admin/adminIndex", {
            session: req.session,
        })
    }, 
    products: (req, res) => {
        return res.render("admin/adminProducts", {
            session: req.session,
            products
        })
    }, 
    create: (req, res) => {
        return res.render("admin/adminProductCreateForm", {
            session: req.session,
            categories,
            subcategories
        })
    }, 
    store: (req, res) => {

    }, 
    edit: (req, res) => {

    }, 
    update: (req, res) => {

    }, 
    destroy: (req, res) => {

    }, 
}