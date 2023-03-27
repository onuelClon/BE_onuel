const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
const port = 5004;
const globalRouter = require('./routes');
const { sequelize } = require('./models');

sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Sync success');
    })
    .catch((error) => {
        console.error('Sync error', error);
    });

app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/', globalRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        errorMessage: err.message || '예상하지 못한 에러가 발생하였습니다.',
    });
});
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
