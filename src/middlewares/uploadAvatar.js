const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/images/avatar"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_avatar_${path.extname(file.originalname)}`)
    }
});

module.exports = multer({storage});
