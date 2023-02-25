const express = require("express");
const router = express.Router();
const { login, register, processRegister } = require("../controllers/userController");
const uploadAvatar = require("../middlewares/uploadAvatar");
const registerValidator = require("../validations/registerValidator");
/* GET - Login Form */
router.get("/login", login); 

/* GET - Register form */
router.get("/register", register); 
/* POST - Register user data */
router.post("/register", uploadAvatar.single("avatar"), registerValidator, processRegister)

module.exports = router;