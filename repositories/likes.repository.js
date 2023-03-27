const { Posts, Likes, Users, sequelize } = require('../models');
// const { Op } = require('sequelize');
// const { parseModelToFlatObject } = require('../helpers/sequelize.helpers'); 

class LikeRepository {
    findPostByPk = async (postId) => {
        const post = await Posts.findByPk(postId)

        return post;
    }

    findIsLike = async (postId,userId) => {
        const isLike = await Likes.findOne({
            where: {
                postId: postId,
                userId: userId 
            }
        })

        return isLike;
    }

    countLikesByPostId = async (postId) => {
        const count = await Likes.count({
          where: {
            postId: postId
          }
        });
        return count;
      }

    createLike = async (postId,userId) => {
        await Likes.create({postId:postId, userId:userId})
    }

    deleteLike = async (postId,userId) => {
        await Likes.destroy({
            where: {postId:postId, userId:userId}
        })
    }
}

module.exports = LikeRepository;