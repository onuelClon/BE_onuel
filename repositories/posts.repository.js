const { Posts, Users, Boards, Comments,Likes } = require('../models');

class PostRepository {
    /*
   
   createPost = async ({ userId,size, style, lifeType, viewCount, img, space, content, tags }) => {
        const makePost = await Posts.create({
            userId,
            size,
            style,
            lifeType,
            viewCount
        }); 

        const makeBoards = await Boards.create({ 
            img,
            space,
            content,
            tags
        });

        return makePost;
    }

    */

    testfindAllPost = async () => {
        console.log('리스폰스 위치입니다');
        const user = await Users.findAll({});
        return user;
    };

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
        });

        // 재배열 서비스에서 처리
        // const result = findAll.map((post) => {
        //     const { Boards, User, Comments, ...rest } = post;
        //     return {
        //         postId: post.postId,
        //         nickname: User.nickname,
        //         size: post.size,
        //         // comment : Comments.comment,
        //         comment: 'comment를 불러올 자리',
        //         likesCount: 'like카운트 불러올 자리',
        //         commentCount: 'comment카운트 불러올 자리',
        //         Boards: Boards.map((board) => ({
        //             img: board.img,
        //             space: board.space,
        //             content: board.content,
        //         })),
        //     };
        // });
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

        // let viewCount = findOne.viewCount;
        // viewCount++;
        // findOne.update({viewCount});

        // console.log(findOne.viewCount);
        // let viewCount = findOne.viewCount; 
        // viewCount + 1;
        // console.log(findOne.viewCount);
        //  findOne = await findOne.update(
        //     {
        //         viewCount,
        //     },
        // );
        return findOne;
    };

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
