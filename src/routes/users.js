const express = require('express');
const UsersController = require('../controllers/users/UsersController');
const UsersRepository = require('../repositories/users/UsersRepository');

const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const usersRepository = new UsersRepository();
const usersController = new UsersController(usersRepository);

router.get('/', authMiddleware, (req, res) => usersController.getAllUsers(req, res));
router.post('/register', (req, res) => usersController.register(req, res));
router.post('/login', (req, res) => usersController.login(req, res));

module.exports = router;
