const { validationResult } = require("express-validator");
const {
  Product,
  Category,
  Subcategory,
  ProductImage,
} = require("../database/models");

module.exports = {
  index: (req, res) => {
    return res.render("admin/adminIndex", {
      session: req.session,
    });
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
            association: "category",
          },
        },
      ],
    })
      .then((products) => {
        return res.render("admin/adminProducts", {
          session: req.session,
          products,
        });
      })
      .catch((error) => console.log(error));
  },
  create: (req, res) => {
    const CATEGORIES_PROMISE = Category.findAll();
    const SUBCATEGORIES_PROMISE = Subcategory.findAll();

    Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
      .then(([categories, subcategories]) => {
        return res.render("admin/adminProductCreateForm", {
          session: req.session,
          categories,
          subcategories,
        });
      })
      .catch((error) => console.log(error));
  },
  store: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { name, price, discount, subcategory, description } = req.body;

      let newProduct = {
        name,
        price,
        description,
        discount,
        subcategory_id: subcategory,
      };

      Product.create(newProduct)
        .then((product) => {
          if (req.files.length === 0) {
            ProductImage.create({
              image: "default-image.png",
              product_id: product.id,
            }).then(() => {
              return res.redirect("/admin/products");
            });
          } else {
            const files = req.files.map((file) => {
              return {
                image: file.filename,
                product_id: product.id,
              };
            });
            ProductImage.bulkCreate(files).then(() => {
              return res.redirect("/admin/products");
            });
          }
        })
        .catch((error) => console.log(error));
    } else {
      const CATEGORIES_PROMISE = Category.findAll();
      const SUBCATEGORIES_PROMISE = Subcategory.findAll();

      Promise.all([CATEGORIES_PROMISE, SUBCATEGORIES_PROMISE])
        .then(([categories, subcategories]) => {
          return res.render("admin/adminProductCreateForm", {
            session: req.session,
            categories,
            subcategories,
            errors: errors.mapped(),
            old: req.body,
          });
        })
        .catch((error) => console.log(error));
    }
  },
  edit: (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find((product) => product.id === productId);

    res.render("admin/adminProductEditForm", {
      categories,
      subcategories,
      product,
      session: req.session,
    });
  },
  update: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      const productId = Number(req.params.id);
      const files = req.files.map((file) => file.filename);

      let { name, price, discount, category, subcategory, description } =
        req.body;

      products.forEach((product) => {
        if (product.id === productId) {
          (product.id = product.id),
            (product.name = name),
            (product.price = price),
            (product.description = description),
            (product.discount = discount),
            (product.category = category),
            (product.subcategory = subcategory),
            (product.image = files.length > 0 ? files : product.image);
        }
      });

      writeProductsJson(products);

      res.redirect("/admin/products");
    } else {
      let product = products.find((product) => product.id === +req.params.id);

      res.render("admin/adminProductEditForm", {
        subcategories,
        categories,
        product,
        errors: errors.mapped(),
        old: req.body,
        session: req.session,
      });
    }
  },
  destroy: (req, res) => {
    const productId = Number(req.params.id);

    products.forEach((product) => {
      if (product.id === productId) {
        let productToDestroy = products.indexOf(product);
        products.splice(productToDestroy, 1);
      }
    });

    writeProductsJson(products);

    res.redirect("/admin/products");
  },
};
