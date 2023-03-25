const { Users } = require('../models');
class UsersRepository {
    findUserById = async ({ userEmail }) => {
        const existUser = await Users.findOne({
            where: { userId: userEmail },
        });
        // console.log('sdf',existUser)
        return existUser;
    };

    createUser = async ({ userEmail, nickname, password }) => {
        console.log(userEmail, password);
        // const user = await new Users({ userId, nickname, password: hashedPw });

        await Users.create({
            userId: userEmail,
            nickname,
            password,
        });
        return;
    };
}

module.exports = UsersRepository;
