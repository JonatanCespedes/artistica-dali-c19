const { users, writeUsersJson } = require("../database");
const { validationResult } = require("express-validator");
module.exports = {
    login: (req, res) => {
        res.render("login")
    },
    register: (req, res) => {
        res.render("register")
    },
    processRegister: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            let lastId = 0;

            users.forEach(user => {
             if(user.id > lastId) {
                 lastId = user.id;
             }
            });
     
            let newUser = {
             id: lastId + 1,
             name: req.body.name,
             last_name: req.body.last_name,
             email: req.body.email,
             pass: req.body.pass1,
             avatar: req.file ? req.file.filename : "default-image.png",
             rol: "USER",
             tel: "",
             address: "",
             postal_code: "",
             province: "",
             city: ""
            };
     
            users.push(newUser);
     
            writeUsersJson(users);
     
            res.send("Usuario creado")
        } else {
            res.render("register", {
                errors: errors.mapped(),
                old: req.body
            })
        }
      
    }
}