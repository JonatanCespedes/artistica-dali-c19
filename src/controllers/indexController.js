const { carousel, products, categories } = require("../old_database")

module.exports = {
    
    index: (req, res) => {
        res.render("index", {
            carousel,
            sliderTitle: "Productos en oferta",
            sliderProducts: products,
            session: req.session
        })
    }
}