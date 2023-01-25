const express = require("express");
const app = express();
const PORT = 3000;

/* Routers */
const indexRouter = require("./routes");

/* Routes Middlewares */
app.use("/", indexRouter);

app.listen(PORT, () => console.log(`Server listen in port ${PORT}\nhttp://localhost:${PORT}`));