const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');

const LikesController = require('../controllers/likes.controller');
const likesController = new LikesController();

router.put("/posts/:postId/like", authMiddleware, likesController.updateLike)

module.exports = router;