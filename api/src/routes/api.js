const express = require('express');
const router = express.Router();

const authMiddleware = require('./../middlewares/auth');
const file = require('./../middlewares/file');

const usersController = require('./../controllers/users');
const todosController = require('./../controllers/todos');

router.use(express.json());

router.post('/signup', usersController.signup);
router.post('/login', usersController.login);

router.get('/todos', authMiddleware, todosController.list);
router.post('/todos', authMiddleware, todosController.create);
router.get('/todos/:id', authMiddleware, todosController.read);
router.put('/todos/:id', authMiddleware, todosController.update);
router.delete('/todos/:id', authMiddleware, todosController.delete);
router.post('/todos/:id/upload', authMiddleware, file.single('file'), todosController.upload);
router.get('/todos/:id/uploads', authMiddleware, todosController.attachments);

module.exports = router;