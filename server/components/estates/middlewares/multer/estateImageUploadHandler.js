const fileUpload = require('../../../../middlewares/multer/fileUpload');
const httpError = require('../../../shared/http-errors/http-errors')

const upload = fileUpload.array('file', 4)

module.exports = uploadFiles = (req, res, next) => {
    upload(req, res, function (err) {
        if (err && err.code === "LIMIT_FILE_SIZE") {
            next(new httpError(`Uploading file size must be lower than 512kb. Please try again`, 422));
        }
      next()
    })
};