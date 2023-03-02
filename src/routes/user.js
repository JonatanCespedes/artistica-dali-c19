const express = require("express");
const router = express.Router();
const { 
    login, 
    register, 
    processRegister, 
    processLogin, 
    logout,
    profile,
    updateProfile
 } = require("../controllers/userController");
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const userInSessionCheck = require("../middlewares/userInSessionCheck");
/* GET - Login Form */
router.get("/login", login); 
/* POST - Login user */
router.post("/login", loginValidator, processLogin);

/* GET - Register form */
router.get("/register", register); 
/* POST - Register user data */
router.post("/register", uploadAvatar.single("avatar"), registerValidator, processRegister);

/* GET - User logout */
router.get("/logout", logout);

/* GET - User profile */
router.get("/profile", userInSessionCheck, profile);

/* GET - User edit form */
router.get("/profile/edit", userInSessionCheck, updateProfile);

module.exports = router;