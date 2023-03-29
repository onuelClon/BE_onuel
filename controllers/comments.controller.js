const CustomError = require('../middleware/errorhandler');
const Joi = require('joi');
const CommentService = require('../services/comments.service');

const commentSchema = Joi.object({
    comment: Joi.string().min(1).max(200).required().messages({
        'string.base': '이 필드는 문자열로 이루어져야 합니다.',
        'string.empty': '이 필드는 비어 있을 수 없습니다.',
        'string.min': '이 필드는 최소 {{#limit}} 문자 이상이어야 합니다.',
        'string.max': '이 필드는 최대 {{#limit}} 문자 이하여야 합니다.',
        'any.required': '이 필드는 필수입니다.',
    }),
});

const options = {
    abortEarly: false,
    messages: {
        'string.base': '이 필드는 문자열로 이루어져야 합니다.',
        'string.empty': '이 필드는 비어 있을 수 없습니다.',
        'string.min': '이 필드는 최소 {{#limit}} 문자 이상이어야 합니다.',
        'string.max': '이 필드는 최대 {{#limit}} 문자 이하여야 합니다.',
        'any.required': '이 필드는 필수입니다.',
    },
};

class CommentsController {
    commentService = new CommentService();

    // 게시글 별 댓글 목록 조회
    getComments = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const comments = await this.commentService.findCommentsByPostId(postId);
            res.status(200).json({ comments: comments });
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect ? err.message : '댓글 조회에 실패하였습니다',
            });
        }
    };

    // 댓글 생성
    createComment = async (req, res, next) => {
        try {
            try {
                await commentSchema.validateAsync(req.body, options);
            } catch (error) {
                const customError = new CustomError(error.details[0].message, 400);
                throw customError;
            }
            const { postId } = req.params;
            const { userId } = res.locals.user;
            const { comment } = req.body;
            console.log('============', comment);
            await this.commentService.createComment(postId, userId, comment);
            res.status(200).json({ message: '댓글을 작성하였습니다.' });
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect ? err.message : '댓글 작성에 실패하였습니다.',
            });
        }
    };

    // 댓글 수정
    updateComment = async (req, res, next) => {
        try {
            try {
                await commentSchema.validateAsync(req.body, options);
            } catch (error) {
                const customError = new CustomError(error.details[0].message, 400);
                throw customError;
            }
            const { comment } = req.body;
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;
            await this.commentService.updateComment(commentId, userId, postId, comment);
            res.status(200).json({ message: '댓글을 수정하였습니다.' });
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect ? err.message : '댓글 수정에 실패하였습니다.',
            });
        }
    };

    // 댓글 삭제
    deleteComment = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { postId, commentId } = req.params;
            await this.commentService.deleteComment(commentId, userId, postId);
            res.status(200).json({ message: '댓글을 삭제하였습니다.' });
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect ? err.message : '댓글 삭제에 실패하였습니다.',
            });
        }
    };
}

module.exports = CommentsController;
