//const { products, categories } = require("../old_database");
const { Product, Category, Sequelize } = require("../database/models")
const { Op } = Sequelize;

module.exports = {
    detail: (req, res) => {
        let productId = Number(req.params.id);
        
        const PRODUCT_PROMISE = Product.findByPk(productId, {
            include: [{association: "images"}]
        });

        const ALL_PRODUCTS_PROMISE = Product.findAll({
            where: {
                discount: {
                    [Op.gte]: 10,
                },
            }, 
            include: [{association: "images"}]
        });

        Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE])
        .then(([product, sliderProducts]) => {
            res.render('productDetail', {
                sliderTitle : "Productos en oferta",
                sliderProducts,
                product,
                session: req.session
            })
        })
        .catch(error => console.log(error))

    },
    category: (req, res) => {
        const categoryId = req.params.id;
        /* Busco la categoria solicitada */
        const category = categories.find(category => category.id == categoryId);
        /* Busco todos los productos de la categoria solicitada */
        const productsByCategory = products.filter(product => product.category == categoryId);
    
        /* Obtengo todas las subcategorias de la categoria selecciona */
        let subcategories = [];
        productsByCategory.forEach(product => {
            if(!subcategories.includes(product.subcategory)){
                subcategories.push(product.subcategory)
            }
        });

        res.render("categories", {
            category,
            subcategories,
            products: productsByCategory,
            session: req.session
        })
        
    }
}