const multer = require('multer');
const uuid = require('uuid/v4');

const ALLOWED_MIME_TYPE = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png',
};

const fileUpload = multer({
    limits: 5000000, 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const extension = ALLOWED_MIME_TYPE[file.mimetype];
            cb(null, uuid() + '.' + extension);
        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!ALLOWED_MIME_TYPE[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type!');
        cb(error, isValid)
    }
});

module.exports = fileUpload;