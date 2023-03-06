const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/images/productos'))
    },
    filename : (req, file, cb) => {
        cb(null, `${Date.now()}_img_${path.extname(file.originalname)}`)
    }
})

const uploadFile = multer({storage});

module.exports = uploadFile;