const multer = require('multer');
const uuid = require('uuid/v4');

const ALLOWED_MIME_TYPE = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png',
};

const fileSizeLimit = 1024 * 1024 * 0.5;

const fileUpload = multer({
    limits: {
        fileSize: fileSizeLimit,
    }, 
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
        const isValidType = !!ALLOWED_MIME_TYPE[file.mimetype];

        if(!isValidType) cb(new Error('Invalid mime type!'));
        else cb(null, true);
    }
});

module.exports = fileUpload;