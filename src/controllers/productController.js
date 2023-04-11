//const { products, categories } = require("../old_database");
const { Product, Category, Sequelize } = require("../database/models");
const { Op } = Sequelize;

module.exports = {
  detail: (req, res) => {
    let productId = Number(req.params.id);

    const PRODUCT_PROMISE = Product.findByPk(productId, {
      include: [{ association: "images" }],
    });

    const ALL_PRODUCTS_PROMISE = Product.findAll({
      where: {
        discount: {
          [Op.gte]: 10,
        },
      },
      include: [{ association: "images" }],
    });

    Promise.all([PRODUCT_PROMISE, ALL_PRODUCTS_PROMISE])
      .then(([product, sliderProducts]) => {
        res.render("productDetail", {
          sliderTitle: "Productos en oferta",
          sliderProducts,
          product,
          session: req.session,
        });
      })
      .catch((error) => console.log(error));
  },
  category: (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId, {
      include: [
        {
          association: "subcategories",
          include: {
            association: "products",
            include: { association: "images" },
          },
        },
      ],
    })
      .then((category) => {
        const PRODUCTS = category.subcategories.map(
          (subcategory) => subcategory.products
        );
        return res.render("categories", {
          category,
          subcategories: category.subcategories,
          products: PRODUCTS.flat(),
          session: req.session,
        });
      })
      .catch((error) => console.log(error));
  },
};
