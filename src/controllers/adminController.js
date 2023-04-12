const { validationResult } = require("express-validator");
const { Product, Category, Subcategory } = require("../database/models");

module.exports = {
    index: (req, res) => {
        return res.render("admin/adminIndex", {
            session: req.session,
        })
    }, 
   /*  products: async (req, res) => {
        try {
            const products = await Product.findAll({
                include: [
                    {
                        association: "subcategory",
                        include: {
                            association: "category"
                        }
                    }
                ]
            });
            
            return res.render("admin/adminProducts", {
                session: req.session,
                products
            })
        } catch (error) {
           console.log(error) 
        }
    },  */
    products: (req, res) => {
        Product.findAll({
            include: [
                {
                    association: "subcategory",
                    include: {
                        association: "category"
                    }
                }
            ]
        })
        .then((products) => {
            return res.render("admin/adminProducts", {
                session: req.session,
                products
            })   
        })
        .catch(error => console.log(error))
    }, 
    create: (req, res) => {
        const CATEGORIES_PROMISE = Category.findAll();
        const SUBCATEGORIES_PROMISE = Subcategory.findAll();

        Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
        .then(([categories, subcategories]) => {
            return res.render("admin/adminProductCreateForm", {
                session: req.session,
                categories,
                subcategories
            })
        })
        .catch(error => console.log(error))
    }, 
    store: (req, res) => {
        let errors = validationResult(req)

        if(errors.isEmpty()){
            let lastId = 1;

            products.forEach(product => {
                if(product.id > lastId){
                    lastId = product.id
                }
            })

            const files = req.files.map(file => file.filename)
            
            let {
                name, 
                price, 
                discount, 
                category, 
                subcategory, 
                description
                } = req.body;
    
            let newProduct = {
                id: lastId + 1,
                name,
                price,
                description,
                discount,
                category,
                subcategory,
                image: files.length > 0 ? files : ["default-image.png"]
            };
    
            products.push(newProduct);
    
            writeProductsJson(products)
    
            res.redirect('/admin/products')
        }else {
            res.render("admin/adminProductCreateForm", {
                subcategories,
                categories,
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    }, 
    edit: (req, res) => {
        const productId = Number(req.params.id)
        const product = products.find(product => product.id === productId)
        
        res.render('admin/adminProductEditForm', {
            categories, 
            subcategories,
            product,
            session: req.session
        });
    }, 
    update: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const productId = Number(req.params.id);
            const files = req.files.map(file => file.filename);

            let {
                name, 
                price, 
                discount, 
                category, 
                subcategory, 
                description
                } = req.body;

            products.forEach( product => {
                if(product.id === productId){
                    product.id = product.id,
                    product.name = name,
                    product.price = price,
                    product.description = description,
                    product.discount = discount,
                    product.category = category,
                    product.subcategory = subcategory,
                    product.image =  files.length > 0 ? files : product.image
                }
            });

            writeProductsJson(products);

            res.redirect('/admin/products');

        } else {
            let product = products.find(product => product.id === +req.params.id)

            res.render("admin/adminProductEditForm", {
                subcategories,
                categories,
                product,
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    }, 
    destroy: (req, res) => {
        const productId = Number(req.params.id);

        products.forEach( product => {
            if(product.id === productId){
               let productToDestroy = products.indexOf(product);
               products.splice(productToDestroy, 1)
            }
        })
        
        writeProductsJson(products)

        res.redirect('/admin/products')
    }, 
}