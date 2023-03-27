const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const options = {
    info: {
        title: '오늘의 집',
        description: '오늘의집 클론코딩 API 문서 입니다.',
    },
    servers: [
        {
            url: 'http://localhost:5000', // 사용할 url
        },
    ],
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            bearerFormat: 'JWT',
        },
    },
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['../app.js', '../routes/index.js', '../routes/auth.routes.js','../controllers/users.controller.js'];

swaggerAutogen(outputFile, endpointsFiles, options);
