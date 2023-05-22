//const { products, categories } = require("../old_database");
const axios = require("axios");
const { Product, Category, Sequelize, Subcategory, Order } = require("../database/models");
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
  subcategory: async (req,res) => {
    Subcategory.findByPk(req.params.id, {
      include: [
        {
          association: "products",
          include: [
            {
              association: "images",
            },
          ],
        },
      ],
    })
      .then((subcategory) => {
        Category.findByPk(subcategory.category_id, {
          include: [{ association: "subcategories" }],
        }).then((category) =>
          res.render("subcategory", {
            category,
            products: subcategory.products,
            session: req.session,
            user: req.session.user?.id || null, 
          })
        );
      })
      .catch((err) => console.log(err));
  },
  search: (req, res) => {
    Product.findAll({
      where: {
        name: {
          [Op.like]: `%${req.query.search}%`,
        },
      },
      include: [{ association: "images" }],
    }).then((result) =>
      res.render("searchResult", {
        result,
        session: req.session,
        search: req.query.search,
      })
    );
  },
  cart: (req, res) => {
    let userId = req.session.user.id;
    Order.findOne({
      where: {
        userId: userId
      }
    })
      .then((order) => {
        let products = order?.order_items.map((item) => {
          return {
            ...item.products,
            quantity: item.quantity,
          };
        });
        res.render("productCart", {
          session: req.session,
          products: products !== undefined ? products : [],
          user: req.session.user?.id || null,
        });
      })
      .catch((error) => res.send(error));
  },
};
