const path = require("path");
const fs = require("fs");

module.exports = {
    products: JSON.parse(fs.readFileSync(path.join(__dirname, "/products.json"), "utf-8")),
    carousel: JSON.parse(fs.readFileSync(path.join(__dirname, "/banner.json"), "utf-8")),
    categories: JSON.parse(fs.readFileSync(path.join(__dirname, "/categories.json"), "utf-8")),
    users: JSON.parse(fs.readFileSync(path.join(__dirname, "/users.json"), "utf-8")),
    writeUsersJson: (data) => {
        fs.writeFileSync(path.join(__dirname, "../database/users.json"), JSON.stringify(data), "utf-8")
    },
    writeProductsJson: (data) => {
        fs.writeFileSync(path.join(__dirname, "../database/products.json"), JSON.stringify(data), "utf-8")
    }
}