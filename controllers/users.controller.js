const UserService = require('../services/user.service');

class UsersController {
    constructor() {
        this.userService = new UserService()
    }

    emailCheck = async (req,res,next) => {
        try {
            const { emailNum } = req.params
            console.log(emailNum);
            // emailToken 으로 넣었는데 왜 소문자가 들어가있을까?
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
    validateEmail = async (req, res, next) => {
        try {
            const { userEmail } = req.body;
            console.log(userEmail)
            const result = await this.userService.sendMail({
                userEmail,
            });
            res.set({ emailToken: `Bearer ${result.emailToken}` });
            res.json({ message: result.message });
        } catch (err) {
            next(err);
        }
    };
    login = async (req, res, next) => {
        try {
            const { userEmail, password } = req.body;
            const result = await this.userService.loginUser({
                userEmail,
                password,
            });
            res.set({ authorization: `Bearer ${result.token}` });
            res.status(201).json({ token: result.token, message: result.message });
        } catch (err) {
            next(err);
        }
    };
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
