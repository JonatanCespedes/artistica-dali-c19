const { users, writeUsersJson } = require("../database");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

module.exports = {
    login: (req, res) => {
        res.render("user/login", { session: req.session })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let user = users.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                rol: user.rol
            }

            let tiempoDeVidaCookie = new Date(Date.now() + 60000);

            if(req.body.remember) {
                res.cookie(
                    "userArtisticaDali", 
                    req.session.user, 
                    {
                        expires: tiempoDeVidaCookie,
                        httpOnly: true
                    })
            }

            res.locals.user = req.session.user;

            res.redirect("/");
        } else {
            return res.render("user/login", {
                errors: errors.mapped(),
                session: req.session
            })
        }
    },
    register: (req, res) => {
        res.render("user/register", {session: req.session})
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
             pass: bcrypt.hashSync(req.body.pass1, 12),
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
     
            res.redirect("/users/login");
        } else {
            res.render("user/register", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
      
    },
    logout: (req, res) => {

        req.session.destroy();
        if(req.cookies.userArtisticaDali){
            res.cookie("userArtisticaDali", "", {maxAge: -1})
        }

        res.redirect("/");

    },
    profile: (req, res) => {
        let userInSessionId = req.session.user.id;

        let userInSession = users.find(user => user.id === userInSessionId);

        res.render("user/userProfile", {
            user: userInSession,
            session: req.session
        })
    },
    editProfile: (req, res) => {
        let userInSessionId = req.session.user.id;

        let userInSession = users.find(user => user.id === userInSessionId);

        res.render("user/userProfileEdit", {
            user: userInSession,
            session: req.session
        })
    },
    updateProfile: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {

            let userId = req.session.user.id;
            let user = users.find(user => user.id === userId);

            const {
                name,
                last_name,
                tel,
                address,
                postal_code,
                province,
                city
            } = req.body;

            user.name = name;
            user.last_name = last_name;
            user.tel = tel;
            user.address = address;
            user.postal_code = postal_code;
            user.province = province;
            user.city = city;
            user.avatar = req.file ? req.file.filename : user.avatar;

            writeUsersJson(users)

            delete user.pass;

            req.session.user = user;

            return res.redirect("/users/profile");
        } else {
            const userInSessionId = req.session.user.id;
            const userInSession = users.find(user => user.id === userInSessionId);

            return res.render("user/userProfileEdit", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
        }
    }
}