const UserService = require('../services/user.service');

class UsersController {
    constructor() {
        this.userService = new UserService();
    }
    // 이메일 인증 번호 검증
    emailCheck = async (req, res, next) => {
        try {
            const { emailNum } = req.params;
            const { emailtoken } = req.headers;

            const result = await this.userService.emailCheck({
                emailtoken,
                emailNum,
            });
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    };

    // 인증번호 전송
    validateEmail = async (req, res, next) => {
        try {
            const { userEmail } = req.body;
            const result = await this.userService.sendMail({
                userEmail,
            });
            // res.set({ emailToken: `Bearer ${result.emailToken}` });
            res.json({ emailToken: `Bearer ${result.emailToken}`, message: result.message });
        } catch (err) {
            next(err);
        }
    };

    // 로그인
    login = async (req, res, next) => {
        try {
            const { userEmail, password } = req.body;
            const result = await this.userService.loginUser({
                userEmail,
                password,
            });

            // res.set('authorization', `Bearer ${result.token}`);
            res.status(201).json({ token: `Bearer ${result.token}`, message: result.message });
        } catch (err) {
            next(err);
        }
    };

    // 회원가입
    signup = async (req, res, next) => {
        try {
            const { userEmail, nickname, password, confirm } = req.body;
            const result = await this.userService.signupUser({
                userEmail,
                nickname,
                password,
                confirm,
            });
            res.status(result.status).json({ message: result.message });
        } catch (err) {
            next(err);
        }
    };
}
module.exports = UsersController;
