const jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    const SECRET_KEY = process.env.SECRET_KEY;
    try {
        const decoded = jwt.decode(token, SECRET_KEY);
        if(decoded) {
            req.auth = decoded;
            next();
        } else {
            res.status(401).send({ message: 'unauthorized' });
        }
    } catch {
        res.status(401).send({ message: 'unauthorized' });
    };
    console.log('Token: ', token);
    
}