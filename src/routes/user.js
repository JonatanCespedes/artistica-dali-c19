const express = require("express");
const router = express.Router();
const { 
    login, 
    register, 
    processRegister, 
    processLogin, 
    logout,
    profile
 } = require("../controllers/userController");
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");

/* GET - Login Form */
router.get("/login", login); 
/* POST - Login user */
router.post("/login", loginValidator, processLogin);

/* GET - Register form */
router.get("/register", register); 
/* POST - Register user data */
router.post("/register", uploadAvatar.single("avatar"), registerValidator, processRegister);

/* GET - User logout */
router.get("/logout", logout)

/* GET - User profile */
router.get("/profile", profile)

module.exports = router;