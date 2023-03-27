// // const { Posts } = require("../models");

// class PostRepository extends Posts {
//     constructor() {
//       super();
//     }

// createPost = async({size, style,lifeType}) => {
//     const makePost = await Posts.create({ size,style, lifeType });
//     return makePost;
// };

// deletePost = async({postId}) => {
//    await Posts.delete(postId);
// };

// findByPost =  async({postId}) => {
//     const  findPost = await Posts.findOne({});
//     return findPost;
// };

// findByPostId =  async({postId}) => {
//     const  findPostId = await Posts.findOne({where : {postId}});
//     return findPostId;
// };

// }
// module.exports = PostRepository;

const { Posts, Users } = require('../models');

class PostRepository {
    testfindAllPost = async () => {
        console.log('리스폰스 위치입니다');
        const user = await Users.findAll({});
        return user;
    };

    createPost = async ({ size, style, lifeType, viewCount }) => {
        const makePost = await Posts.create({ size, style, lifeType, viewCount });
        return makePost;
    };
}

module.exports = PostRepository;
