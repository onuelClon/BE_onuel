const { Posts, Users, Boards, Comments, Likes } = require('../models');

class PostRepository {
    //post제작
    createPost = async ({ userId, nickname, size, style, lifeType }) => {
        console.log(nickname);
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
        });

        return findAll;
    };

    //게시글 일부조회
    findByPostId = async (postId) => {
        let findOne = await Posts.findOne({
            attributes: ['postId', 'userId', 'size', 'style', 'lifeType', 'viewCount'],
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
            where: {
                postId: postId,
            },
        });

        return findOne;
    };

    //where문을 사용한 일부조회
    postWhereFindall = async (lifeType) => {
        let findAll = await Posts.findAll({
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

        return findAll;
    };

    deletePost = async (postId) => {
        const deletePost = await Posts.destroy({ where: { postId } });
        return deletePost;
    };

    patchPost = async (postId, size, style, lifeType, img, space, content, tags) => {
        console.log('레파지토리');
        const postpatch = await Posts.update(
            {
                size,
                style,
                lifeType,
                img,
                space,
                content,
                tags,
            },
            {
                where: { postId },
            }
        );

        return postpatch;
    };
}

module.exports = PostRepository;
