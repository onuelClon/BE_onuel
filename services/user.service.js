const UsersRepository = require('../repositories/users.repository');
const CustomError = require('../middleware/errorhandler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

class UserService {
    constructor() {
        this.userRepository = new UsersRepository();
    }

    // 인증번호 전송
    sendMail = async ({ userEmail }) => {
        const randomNumber = Math.floor(Math.random() * 999999);
        console.log(randomNumber, typeof randomNumber);
        const salt = await bcrypt.genSalt();
        const encryptRandomNumber = await bcrypt.hash(randomNumber.toString(), salt);

        const emailToken = jwt.sign(
            {
                randomNumber: encryptRandomNumber,
            },
            process.env.EMAIL_JWT_KEY,
            {
                expiresIn: '3m',
            }
        );

        // 송신측 정보
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ONUEL_ADMIN_ID,
                pass: process.env.ONUEL_KEY,
            },
        });
        const mailOption = {
            from: process.env.ONUEL_ADMIN_ID,
            to: userEmail,
            subject: '[오늘의집🏠] 인증코드 안내',
            html: `<div style="padding-bottom:40px;max-width:473px;font-size:16px;margin-top:60px"><div class="adM">
            </div><a href="https://ohou.se" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://ohou.se&amp;source=gmail&amp;ust=1679764274574000&amp;usg=AOvVaw1GfYQToK2AXZiCrIbxj8ZZ">
            <img src="https://ci6.googleusercontent.com/proxy/a7V1OXbQcNxMwwnZ81eEOdjKl9pEI0E4BayxUu2UrznVBOCmuLbxZU-A07Gk5GuGw71vFStgkMq_Z9TwY7qWXIMUmK74EdTQMHTSpIRPLah8z7zyzYGHM1m9LzyVUm2uM9bDN7Xrg3fizg=s0-d-e1-ft#https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/162642310342712182.png" style="width:74px" alt="오늘의집" class="CToWUd" data-bit="iit">
            </a>
            <div style="font-size:18px;font-weight:700;margin-bottom:10px;margin-top:60px">
            인증코드를 확인해주세요.
            </div>
            <span style="font-size:32px;line-height:42px;font-weight:700;display:block;margin-top:6px">
            ${randomNumber}
            </span>
            <div style="margin-top:60px;margin-bottom:40px;line-height:28px">
            <div style="display:inline-block">이메일 인증 절차에 따라 이메일 인증코드를 </div> 
            <div style="display:inline-block"> 발급해드립니다.</div> 
            <div style="display:inline-block">인증코드는 이메일 발송</div>
            <div style="display:inline-block">시점으로부터 3분동안 유효합니다.</div>
            </div>
            
            </div>`,
        };
        transporter.sendMail(mailOption, (error, info) => {
            if (error) {
                console.log(error);
                throw new CustomError('이메일 발송중 예상하지 못한 에러가 발생하였습니다.',400)
            }
            console.log('======send ok======' + info.response);
            
            return;
        });

        return { emailToken, message: '입력한 이메일로 인증메일이 발송되었습니다.' };
    };

    // 인증번호 확인
    emailCheck = async ({ emailtoken, emailNum }) => {
        try {
            console.log('토큰', emailtoken, emailNum, typeof emailNum);
            const [authType, authToken] = (emailtoken ?? '').split(' ');

            if (!emailtoken || authType !== 'Bearer' || !authToken) {
                throw new CustomError('인증되지 않았습니다', 401);
            }
            const { randomNumber } = jwt.verify(authToken, process.env.EMAIL_JWT_KEY);
            console.log(randomNumber);

            // 암호화된 인증번호 비교
            const checkNumber = await bcrypt.compare(emailNum, randomNumber);

            const validateInfo = jwt.verify(authToken, process.env.EMAIL_JWT_KEY);
            if (!checkNumber) {
                throw new CustomError('인증코드가 일치하지 않습니다.', 419);
            }
            console.log(validateInfo);
        } catch (err) {
            throw new CustomError('인증가능 시간이 만료되었습니다.', 419);
        }

        return { message: '이메일 인증에 성공하였습니다' };
    };

    // 로그인
    loginUser = async ({ userEmail, password }) => {
        const existUser = await this.userRepository.findUserById({ userEmail });
        console.log(existUser);
        if (!existUser) {
            throw new CustomError('로그인에 실패하였습니다.', 400);
        }
        const pwdDiffCheck = await bcrypt.compare(password, existUser.password);
        if (!pwdDiffCheck) {
            throw new CustomError('로그인에 실패하였습니다.', 400);
        }
        const token = jwt.sign(
            { nickname: existUser.nickname, userEmail: existUser.userId },
            process.env.TOKEN_KEY
        );
        return { token, message: '로그인을 성공하였습니다.' };
    };

    // 회원가입
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
