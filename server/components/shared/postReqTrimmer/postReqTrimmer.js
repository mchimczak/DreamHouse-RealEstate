'use strict'

 const postReqTrimmer = (req, res, next) => {
    if (req.method === 'POST') {
        for (const [key, value] of Object.entries(req.body)) {
            req.body[key] = value.trim();
        }
    }
    next();
};

module.exports = postReqTrimmer;