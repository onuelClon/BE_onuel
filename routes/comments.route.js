const express = require('express');
const router = express.Router({ mergeParams: true });

const authMiddleware = require('../middleware/auth-middleware')
const CommentsController = require('../controllers/comments.controller')
const commentsController = new CommentsController();

router.post("/", authMiddleware, commentsController.createComment);
router.get("/", commentsController.getComments);
router.patch("/:commentId", authMiddleware, commentsController.updateComment);
router.delete("/:commentId", authMiddleware, commentsController.deleteComment);

module.exports = router;
