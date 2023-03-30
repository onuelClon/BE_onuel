const LikeRepository = require('../repositories/likes.repository');
const CustomError = require('../middleware/errorhandler');

class LikeService {
    likeRepository = new LikeRepository();

    updateLike = async (postId, userId) => {
        const findPost = await this.likeRepository.findPostByPk(postId);
        const isLike = await this.likeRepository.findIsLike(postId, userId);
        if (!findPost) throw new CustomError('게시글이 존재하지 않습니다.');
        if (!isLike) {
            await this.likeRepository.createLike(postId, userId);
            return true;
        } else {
            await this.likeRepository.deleteLike(postId, userId);
            return false;
        }
    };

    countLikesByPostId = async (postId) => {
        const countLikesByPostId = await this.likeRepository.countLikesByPostId(postId);

        return countLikesByPostId;
    };
}

module.exports = LikeService;
