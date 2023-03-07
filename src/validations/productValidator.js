let { check } = require('express-validator');

module.exports = [
    check('name')
    .notEmpty()
    .withMessage("El campo nombre no puede ir vacío")
    .isLength({ min: 3 })
    .withMessage("Ingrese más de 3 caracteres"),

    check("category")
    .notEmpty()
    .withMessage("Debes elegir una categoría"),

    check('subcategory')
    .notEmpty()
    .withMessage('Debes elegir una subcategoría'),

    check('price')
    .notEmpty()
    .withMessage('Coloca un precio')
    .isNumeric()
    .withMessage("Solo puedes ingresar números")
]
