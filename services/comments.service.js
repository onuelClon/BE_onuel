const CustomError = require('../middleware/errorhandler');
const CommentRepository = require('../repositories/comments.repository')

class CommentService {
    commentRepository = new CommentRepository();

    findCommentsByPostId = async (postId) => {
        const findPost = await this.commentRepository.findPostById(postId);
        if (!findPost) throw new CustomError('게시글이 존재하지 않습니다.', 400);

        const allComment = await this.commentRepository.findCommentsByPostId(postId);
        return allComment;
    }

    createComment = async (postId, userId, comment) => {
        const findPost = await this.commentRepository.findPostById(postId);
        if (!findPost) throw new CustomError('게시글이 존재하지 않습니다.', 400);

        await this.commentRepository.createComment(postId, userId, comment)
    }

    updateComment = async (commentId, userId, postId, comment) => {
        const findPost = await this.commentRepository.findPostById(postId);
        const findComment = await this.commentRepository.findCommentById(commentId);
        if (!findPost) throw new CustomError("게시글이 존재하지 않습니다.", 400);
        if (!findComment) throw new CustomError("댓글이 존재하지 않습니다.", 400 );
        if (findComment.userId!=userId) throw new CustomError("댓글의 수정 권한이 존재하지 않습니다.", 401)

        await this.commentRepository.updateComment(commentId, userId, comment)
    }

    deleteComment = async (commentId, userId, postId) => {
        const findPost = await this.commentRepository.findPostById(postId);
        const findComment = await this.commentRepository.findCommentById(commentId);
        if (!findPost) throw new CustomError("게시글이 존재하지 않습니다.", 400);
        if (!findComment) throw new CustomError("댓글이 존재하지 않습니다.", 400);
        if (findComment.userId!==userId) throw new CustomError("댓글의 수정 권한이 존재하지 않습니다.", 401)

        await this.commentRepository.deleteComment(commentId, userId)
    }
}

module.exports = CommentService;