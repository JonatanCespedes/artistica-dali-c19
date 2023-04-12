const { check, body } = require("express-validator");
//const { users } = require("../old_database");
const { User } = require("../database/models");

module.exports = [
    check("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

    check("last_name")
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

    check("email")
    .notEmpty()
    .withMessage("El email es obligatorio").bail()
    .isEmail()
    .withMessage("Email inválido"),

    body("email")
    .custom((value) => {
        //let user = users.find(user => user.email === value);
        return User.findOne({
            where: {
                email: value
            }
        })
        .then(user => {
            if(user) return Promise.reject("Email ya registrado")
        })
        .catch(error => console.log(error))
    }),

    check('pass1')
    .notEmpty()
    .withMessage('Debes escribir tu contraseña').bail()
    .isLength({
        min: 6,
    })
    .withMessage('La contraseña debe tener como mínimo 6 caracteres'),

    body('pass2')
    .custom((value, {req}) => value !== req.body.pass1 ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check('terms')
    .isString('on')
    .withMessage('Debes aceptar los términos y condiciones')
]