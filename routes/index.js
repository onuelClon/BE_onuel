const express = require('express');
const router = express.Router();

const likesRouter = require("./likes.route");
const commentsRouter = require("./comments.route");

// router.use('/',likesRouter);
router.use('/posts/:postId/comments', commentsRouter);

const authRouter = require('./auth.routes');
router.use(authRouter);
module.exports = router;
