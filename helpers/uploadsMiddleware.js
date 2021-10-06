const multer = require('multer');
// const path = require('path');
require('dotenv').config();
const TMP_DIR = process.env.TMP_DIR;
const { HttpCode } = require('./constatnts');

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
    cb(null,TMP_DIR)
  },
    filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}-${file.originalname}`)
  },
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => { // file - набор информации о файле
        if (file.mimetype.includes('image')) {
            cb(null, true)
            return
        };
        const error = new Error('Wrong avatar`s format file')
        error.status = HttpCode.BAD_REQUEST;
        cb(error);
    }
});

module.exports = upload;
