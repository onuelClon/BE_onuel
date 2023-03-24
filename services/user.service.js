const UsersRepository = require('../repositories/users.repository');
const CustomError = require('../middleware/errorhandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    constructor() {
        this.userRepository = new UsersRepository();
    }

    loginUser = async ({ userEmail, password }) => {
        const existUser = await this.userRepository.findUserById({ userEmail });
        console.log(existUser);
        if (!existUser) {
            throw new CustomError('로그인에 실패하였습니다.', 400);
        }
        const pwdDiffCheck = bcrypt.compare(password, existUser.password);
        if (!pwdDiffCheck) {
            throw new CustomError('로그인에 실패하였습니다.', 400);
        }
        const token = jwt.sign(
            { nickname: existUser.nickname, userEmail: existUser.userId },
            process.env.TOKEN_KEY
        );
        return { token, message: '로그인을 성공하였습니다.' };
    };

    signupUser = async ({ userEmail, nickname, password, confirm }) => {
        let validEmailCheck =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        // 영어 대소문자 숫자 , -_. 허용 . 이전엔 '@'  이후엔  2-3 문자는 와야함.
        let validPwdCheck = /^[a-zA-Z0-9]{8,30}$/;
        // 영어 대소분자 숫자 허용 8~30
        let validNickCheck = /^[a-zA-Z가-힣0-9]{2,30}$/;
        // 영어 대소문자 숫자 한글 허용 2 ~ 10

        if (!validEmailCheck.test(userEmail)) {
            throw new CustomError('이메일 형식이 올바르지 않습니다.', 412);
        }
        if (!validNickCheck.test(nickname)) {
            throw new CustomError('닉네임 형식이 올바르지 않습니다.', 412);
        }
        if (!validPwdCheck.test(password)) {
            throw new CustomError('비밀번호 형식이 올바르지 않습니다.', 400);
        }
        if (password !== confirm) {
            throw new CustomError('비밀번호가 일치하지 않습니다.', 400);
        }
        const existUser = await this.userRepository.findUserById({
            userEmail,
        });
        if (existUser) {
            throw new CustomError('이미 가입한 이메일 입니다.', 400);
        }
        const salt = await bcrypt.genSalt();
        const encryptPassword = await bcrypt.hash(password, salt);

        await this.userRepository.createUser({
            userEmail,
            nickname,
            password: encryptPassword,
        });
        return { status: 200, message: '회원 가입에 성공하였습니다.' };
    };
}
module.exports = UserService;
