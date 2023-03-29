const { Posts, Users, Boards, Comments,Likes } = require('../models');

class PostRepository {
    
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
            // raw: true,
            attributes: ['postId', 'userId', 'size', 'style', 'lifeType', 'viewCount','createdAt'],
            include: [
                {
                    model: Boards, //관계를 맺고있는 테이블을 조회합니다.
                    attributes: ['img', 'space', 'content'],
                },
                {
                    model: Users, //관계를 맺고있는 테이블을 조회합니다.
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
                    model: Boards, //관계를 맺고있는 테이블을 조회합니다.
                    attributes: ['img', 'space', 'content'],
                },
                {
                    model: Users, //관계를 맺고있는 테이블을 조회합니다.
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
       
        let findAll = await Posts.findAll({
            attributes: ['postId', 'userId', 'size', 'style', 'lifeType', 'viewCount', 'createdAt'],
            include: [
                {
                    model: Boards, //관계를 맺고있는 테이블을 조회합니다.
                    attributes: ['img', 'space', 'content'],
                },
                {
                    model: Users, //관계를 맺고있는 테이블을 조회합니다.
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

    deletePost = async (postId) => {
        const deletePost = await Posts.destroy({ where: { postId } });
        return deletePost;
    };

    patchPost = async (postId, size) => {
        console.log('레파지토리');
        const postpatch = await Posts.update(
            {
                size,
            },
            {
                where: { postId },
            }
        );

        return postpatch;
    };
}

module.exports = PostRepository;
