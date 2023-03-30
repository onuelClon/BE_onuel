const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const CustomError = require('./errorhandler');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
       
        const [authType, authToken] = (authorization ?? '').split(' ');
        console.log(authType, authToken)

        if (!authorization) {
            throw new CustomError('인증되지 않았습니다', 401);
        }
      
        const { userEmail } = jwt.verify(authToken, process.env.TOKEN_KEY);

        let user = await Users.findOne({ where: { userId : userEmail} });
        res.locals.user = user;
        next();
    } catch (err) {
        return res.status(err.status || 500).json({
            errorMessage: err.expect ? err.message : '전달된 쿠키에서 오류가 발생하였습니다.',
        });
    }
};
