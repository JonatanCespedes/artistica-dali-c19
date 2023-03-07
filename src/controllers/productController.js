const { products, categories } = require("../database");

module.exports = {
    detail: (req, res) => {
        let productId = Number(req.params.id);
        
        let product = products.find(product => product.id === productId)
        let sliderProducts = products.filter(item => item.category === product.category)

        res.render('productDetail', {
            sliderTitle : "Productos relacionados",
            sliderProducts,
            product,
            categories,
            session: req.session
        })
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