const express = require('express');
const router = express.Router();
const authRouter = require('./auth.routes');
router.use(authRouter);
module.exports = router;
