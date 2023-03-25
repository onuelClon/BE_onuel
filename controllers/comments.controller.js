const CustomError = require('../middleware/errorhandler');
const Joi = require('joi');
const CommentService = require("../services/comments.service");

// const RE_COMMENT = /^[\s\S]{1,100}$/; 댓글 정규 표현식

const commentSchema = Joi.object({
  comment: Joi.string().required(),
});

class CommentsController {
    commentService = new CommentService()

    // 게시글 별 댓글 목록 조회
    getComments = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const comments = await this.commentService.findCommentsByPostId(postId);
            res.status(200).json({comments: comments});
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect
                    ? err.message
                    : '댓글 조회에 실패하였습니다',
            });
        }
    }

    // 댓글 생성
    createComment = async (req, res, next) => {
        try {
            const resultSchema = commentSchema.validate(req.body);
            if (resultSchema.error) {
                throw new CustomError('데이터 형식이 올바르지 않습니다', 400);
              }
            const { postId } = req.params;
            const { userId } = res.locals.user;
            const { comment } = req.body;
            await this.commentService.createComment(postId, userId, comment);
            res.status(200).json({ message: "댓글을 작성하였습니다." });
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect
                    ? err.message
                    : '댓글 작성에 실패하였습니다.',
            });
        }
    }

    // 댓글 수정
    updateComment = async (req, res, next) => {
        try {
            const resultSchema = commentSchema.validate(req.body);
            if (resultSchema.error) {
                throw new CustomError('데이터 형식이 올바르지 않습니다', 400);
              }
            const { comment } = req.body;
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;
            await this.commentService.updateComment(commentId, userId, postId, comment);
            res.status(200).json({message: "댓글을 수정하였습니다."});
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect
                    ? err.message
                    : '댓글 수정에 실패하였습니다.',
            });
        }
    }

    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;
            await this.commentService.deleteComment(commentId, userId, postId);
            res.status(200).json({message: "댓글을 삭제하였습니다."});
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect
                    ? err.message
                    : '댓글 삭제에 실패하였습니다.',
            });
        }
    }
};

module.exports = CommentsController;