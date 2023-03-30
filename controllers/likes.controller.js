const LikeService = require('../services/likes.service');
const CustomError = require('../middleware/errorhandler');

class LikesController {
    likeService = new LikeService();

    updateLike = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;

            const result = await this.likeService.updateLike(postId, userId);
            const likesCount = await this.likeService.countLikesByPostId(postId);

            result
                ? res
                      .status(200)
                      .json({ message: '게시글 좋아요를 등록하였습니다.', likesCount: likesCount })
                : res
                      .status(200)
                      .json({ message: '게시글 좋아요를 취소하였습니다.', likesCount: likesCount });
        } catch (err) {
            return res.status(err.status || 500).json({
                errorMessage: err.expect ? err.message : err.message,
            });
        }
    };
}

module.exports = LikesController;
