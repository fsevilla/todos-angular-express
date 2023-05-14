const { mongo } = require('mongoose');
const fs = require('fs');
const path = require('path');

const model = require('./../models/todo');
const file = require('./../models/file');

class TodosController {

    create(req, res) {
        model.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.auth.id
        }).then( response => {
            res.send(response);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    }

    list(req, res) {
        model.find({
            userId: req.auth.id,
            status: { $ne: 'deleted' }
        }).then(response => {
            res.send(response);
        }).catch(err => {
            res.status(400).send(err);
        })
    }

    read(req, res) {
        model.findOne({
            _id: new mongo.ObjectId(req.params.id),
            userId: req.auth.id,
            status: { $ne: 'deleted' }
        }).then(response => {
            if(response) {
                res.send(response);
            } else {
                res.sendStatus(404);
            }
        }).catch(() => {
            res.sendStatus(404);
        });
    }

    async update(req, res) {
        const todo = await model.findOne({
            _id: new mongo.ObjectId(req.params.id),
            userId: req.auth.id
        });
        if(todo) {
            todo.title = req.body.title || todo.title;
            todo.description = req.body.description || todo.description;
            todo.status = req.body.status || todo.status;
            todo.save();

            res.send(todo);
        } else {
            res.status(400).send(err);    
        }
    }

    delete(req, res) {
        model.updateOne({
            _id: new mongo.ObjectId(req.params.id),
            userId: req.auth.id
        }, {
            status: 'deleted'
        }).then(response => {
            if(response) {
                res.send();
            } else {
                res.status(400).send(err);    
            }
        }).catch(err => {
            res.status(400).send(err);
        })
    }

    upload(req, res) {
        if(!req.file) {
            res.status(400).send({ message: 'File not supported '});
            return;
        }

        file.create({
            name: req.file.originalname,
            filename: req.file.filename,
            todoId: req.params.id
        }).then(response => {
            res.send(response);
        }).catch(err => {
            const uri = path.join(__dirname, '..', '..', 'uploads', req.file.filename);
            fs.unlinkSync(uri);
            res.status(400).send(err);
        });
    }

    attachments(req, res) {
        file.find({
            todoId: req.params.id
        }).then(response => {
            res.send(response);
        }).catch(() => {
            res.status(400).send();
        })
    }
}

module.exports = new TodosController();