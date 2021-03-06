'use strict'

const multer = require('multer');
const fs = require('fs');
const { v4: uuid } = require('uuid');
const sharp = require('sharp');
const path = require('path');

const httpError = require('../../../../models/http-error');

const fsPromise = fs.promises;

const ALLOWED_MIME_TYPE = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png',
};

const fileSizeLimit = 1024 * 1024;

const upload = multer({
    limits: {
        fileSize: fileSizeLimit,
    }, 
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const isValidType = !!ALLOWED_MIME_TYPE[file.mimetype];

        if(!isValidType) cb(new Error('Invalid mime type!'));
        else cb(null, true);
    }
});

const fileUpload = upload.array('file', 4);

const imgUpload = (req, res, next) => {
    fileUpload(req, res, function (err) {
        if (err && err.code === "LIMIT_FILE_SIZE") {
            return next(new httpError(`Uploading file size must be lower than 1mb. Please try again`, 422));
        }
      next()
    });
};

const resizeFile = async (req, res, next) => {
    if(!req.files || req.files.length === 0) return next();

    const estateId = req.body.id || uuid();
    const images = [];
    const imgDirectory = `uploads/images/estates/${estateId}`;

    if (!fs.existsSync(imgDirectory)){
        await fsPromise.mkdir(imgDirectory)
            .catch(() => next(new httpError(`File upload crushed, please try again later`, 500)))
    }

    await Promise.all( 
        req.files.map( async file => {
            const extension = ALLOWED_MIME_TYPE[file.mimetype];
            const newFilename = uuid() + '.' + extension;

            const newImage = sharp(file.buffer);
            newImage
                .metadata()
                .then(async(metadata) => {

                    const imgSizes = metadata.height > metadata.width
                        ? { a: 320, b: 640 }
                        : { a: 640, b: 320 }

                    return newImage
                        .resize(imgSizes.a, imgSizes.b)
                        .toFile(path.join(imgDirectory, `${newFilename}`))
                            .catch(() => next(
                                new httpError(`File upload crushed, please try again later`, 500)
                            ))
                })

            return images.push(`${imgDirectory}/${newFilename}`)
        }) 
    )

    req.files = images
    next();
};

module.exports = {
    imgUpload,
    resizeFile
};