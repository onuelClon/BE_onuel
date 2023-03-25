const express = require('express');
const router = express.Router({mergeParams: true});

// const authMiddleware = require('../middleware/auth-middleware')
const CommentsController = require('../controllers/comments.controller')
const commentsController = new CommentsController();

router.post("/", commentsController.createComment);
router.get("/", commentsController.getComments);
router.patch("/:commentId", commentsController.updateComment);
router.delete("/:commentId",commentsController.deleteComment);

module.exports = router;