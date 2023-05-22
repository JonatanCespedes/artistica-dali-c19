const { Category } = require('../database/models')
module.exports = (req, res, next) => {
    if (!res.locals.categories) {
        Category.findAll({
            include: [{
                association: "subcategories"
            }]
        })
        .then(categories => {
            res.locals.categories = categories
            next()
        })
    }
}