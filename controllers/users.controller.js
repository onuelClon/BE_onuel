const UserService = require('../services/user.service');

class UsersController {
    constructor() {
        this.userService = new UserService();
    }

    login = async (req, res, next) => {
        try {
            const { userEmail, password } = req.body;
            const result = await this.userService.loginUser({
                userEmail,
                password,
            });
            res.set({token:result.token})
            res.status(201).json({ token : result.token ,message: result.message });
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
