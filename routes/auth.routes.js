const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

router.post('/validateCheck/:emailNum', usersController.emailCheck);
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.post('/validate', usersController.validateEmail);

module.exports = router;
