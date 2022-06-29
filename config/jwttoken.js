const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization').split(' ')[1];
    if (!token) return res.sendStatus(403);
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified
        next()
    } catch (err) {
        res.sendStatus(403);
    }
}