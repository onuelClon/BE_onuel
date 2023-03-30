const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

// 인증번호 검증
router.get('/validateCheck/:emailNum', usersController.emailCheck);

// 회원가입
router.post('/signup', usersController.signup);

// 로그인
router.post('/login', usersController.login);

// 인증메일 발송
router.post('/validate', usersController.validateEmail);

module.exports = router;
