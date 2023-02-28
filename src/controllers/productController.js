const { products, categories } = require("../database");

module.exports = {
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