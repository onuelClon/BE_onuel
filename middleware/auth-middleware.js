const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const CustomError = require('./errorhandler');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization)
        const [authType, authToken] = (authorization ?? '').split(' ');
        console.log(authType, authToken)
        if (!authorization) {
            throw new CustomError('인증되지 않았습니다', 401);
        }
        if (authType !== 'Bearer' || !authToken) {
            throw new CustomError('로그인 후 사용가능한 기능입니다.', 401);
        }
        const { nickname, userEmail } = jwt.verify(authToken, process.env.TOKEN_KEY);
        console.log("여기용료",nickname, userEmail)
        let user = await Users.findOne({ where: { userId : userEmail} });
        res.locals.user = user;
        next();
    } catch (err) {
        return res.status(err.status || 500).json({
            errorMessage: err.expect ? err.message : '전달된 쿠키에서 오류가 발생하였습니다.',
        });
    }
};
