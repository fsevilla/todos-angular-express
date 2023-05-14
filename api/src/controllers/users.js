const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const model = require('./../models/user');

function hashPassword(pwd) {
    return crypto.scryptSync(pwd, 'salt', 24).toString('hex');
}

class UsersController {

    signup(req, res) {
        model.create({
            name: req.body.name, 
            email: req.body.email,
            password: hashPassword(req.body.password)
        }).then(() => {
            res.send();
        }).catch(err => {
            res.status(400).send({ code: 1, message: 'user already exists' });
        })
    }

    login(req, res) {
        model.findOne({
            email: req.body.email,
            password: hashPassword(req.body.password)
        })
        .then(response => {
            if(response) {
                const token = jwt.sign({
                    id: response._id,
                    email: response.email
                }, process.env.SECRET_KEY);

                res.send({ 
                    token,
                    name: response.name,
                    email: response.email 
                });
            } else {
                res.status(400).send({ message: 'invalid credentials' });    
            }
        })
        .catch(err => {
            res.status(400).send({ message: 'invalid credentials' });
        })
    }

}

module.exports = new UsersController();