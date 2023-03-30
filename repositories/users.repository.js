const { Users } = require('../models');
class UsersRepository {
    findUserById = async ({ userEmail }) => {
        const existUser = await Users.findOne({
            where: { userId: userEmail },
        });
        return existUser;
    };

    createUser = async ({ userEmail, nickname, password }) => {
        await Users.create({
            userId: userEmail,
            nickname,
            password,
        });
        return;
    };
}

module.exports = UsersRepository;
