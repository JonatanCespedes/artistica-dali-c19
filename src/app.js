const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.static("public"));

/* Template engine config */
app.set("view engine", "ejs");
app.set("views", "./src/views");

/* Routers */
const indexRouter = require("./routes");

/* Routes Middlewares */
app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));