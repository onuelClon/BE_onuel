const { Posts, Users, Boards, Comments,Likes } = require('../models');

class PostRepository {
    
    //post제작
    createPost = async ({ userId, nickname, size, style, lifeType }) => {
      
        const makePost = await Posts.create({
            userId,
            nickname,
            size,
            style,
            lifeType,
        });

        return makePost;
    };

    //board제작
    createBoard = async ({ postId, img, space, content, tags }) => {
        const makeBoards = await Boards.create({
            postId,
            img,
            space,
            content,
            tags,
        });

        return makeBoards;
    };
    
    //게시물 전체 조회
    findByPost = async () => {

        const findAll = await Posts.findAll({
            attributes: ['postId', 'userId', 'size', 'style', 'lifeType', 'viewCount','createdAt'],
            include: [
                {
                    model: Boards, 
                    attributes: ['img', 'space', 'content'],
                },
                {
                    model: Users, 
                    attributes: ['nickname'],
                },
                {
                    model: Comments,
                    attributes: ['comment'],
                },
                {
                    model: Likes,
                    attributes: ['userId'],
                },
            ],
        });

        return findAll;
    };

    //게시글 일부조회
    findByPostId = async (postId) => {

        const findOne = await Posts.findOne({
            attributes: ['postId', 'userId', 'size', 'style', 'lifeType', 'viewCount'],
            include: [
                {
                    model: Boards,
                    attributes: ['img', 'space', 'content','tags'],
                },
                {
                    model: Users, 
                    attributes: ['nickname'],
                },
                {
                    model: Comments,
                    attributes: ['comment'],
                },
                {
                    model: Likes,
                    attributes: ['userId'],
                },
            ],
            where: {
                postId: postId,
            },
        }); 

        return findOne;
    };

    //where문을 사용한 일부조회
    postWhereFindall  = async (lifeType) => { 
       
        const findAll = await Posts.findAll({
            attributes: ['postId', 'userId', 'size', 'style', 'lifeType', 'viewCount', 'createdAt'],
            include: [
                {
                    model: Boards,
                    attributes: ['img', 'space', 'content'],
                },
                {
                    model: Users, 
                    attributes: ['nickname'],
                },
                {
                    model: Comments,
                    attributes: ['comment'],
                },
                {
                    model: Likes,
                    attributes: ['userId'],
                },
            ],
            where: { lifeType },
        });

        return findAll
    }

    //게시물 삭제
    deletePost = async (postId) => {
        const deletePost = await Posts.destroy({ where: { postId } });
        return deletePost;
    };

    //게시물수정
    patchPost = async (postId,size, style, lifeType, img, space, content, tags ) => {
        const postpatch = await Posts.update(
            {
                size,style, lifeType, img, space, content, tags
            },
            {
                where: { postId },
            }
        );

        return postpatch;
    };
}

module.exports = PostRepository;
