const express = require("express");
const router = express.Router();
const { 
    login, 
    register, 
    processRegister, 
    processLogin, 
    logout,
    profile,
    editProfile,
    updateProfile
 } = require("../controllers/userController");
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
const loginValidator = require("../validations/loginValidator");
const userInSessionCheck = require("../middlewares/userInSessionCheck");
const updateUserValidator = require("../validations/updateUserValidator");
const sessionUserCheck = require("../middlewares/sessionUserCheck");
/* GET - Login Form */
router.get("/login", sessionUserCheck, login); 
/* POST - Login user */
router.post("/login", loginValidator, processLogin);

/* GET - Register form */
router.get("/register", sessionUserCheck, register); 
/* POST - Register user data */
router.post("/register", uploadAvatar.single("avatar"), registerValidator, processRegister);

/* GET - User logout */
router.get("/logout", logout);

/* GET - User profile */
router.get("/profile", userInSessionCheck, profile);

/* GET - User edit form */
router.get("/profile/edit", userInSessionCheck, editProfile);
/* PUT - Profile update */
router.put("/profile/edit", uploadAvatar.single("avatar"), updateUserValidator, updateProfile);

module.exports = router;