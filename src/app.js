const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieCheck = require("./middlewares/cookieCheck");
const categoriesHeader = require('./middlewares/categoriesHeader');
const passport = require("passport");

require('dotenv').config();

const PORT = process.env.PORT || 3000;


/* Template engine config */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* Middlewares */
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_method"));
app.use(session({
    secret: "artisticaDali",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.session());
app.use(passport.initialize());
app.use(cookieParser());
app.use(cookieCheck);
app.use(categoriesHeader);

/* Routers */
const indexRouter = require("./routes");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const apiRouter = require("./routes/api");

/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.use("/api/v1", apiRouter);

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));