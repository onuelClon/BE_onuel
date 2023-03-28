const PostRepository = require('../repositories/posts.repository');
const CustomError = require('../middleware/errorhandler');
const { Posts, Users, Boards, Comments ,Likes} = require('../models');

class PostService {
    postRepository = new PostRepository();
    /*
  
*/
    testfindAllPost = async () => {
        console.log('서비스 위치입니다');
        const allPost = await this.postRepository.testfindAllPost();
        return allPost;
    };
    //////////////////////////////////////////////////////////////////////////////

    // -img 여부 			checkImg
    checkImg = async () => {
        return;
    };

    // -tag를 형식			checkTag
    checkTag = async ({ tags }) => {
        const resultEmpty = tags.indexOf(' ');
        const resultDouble = tags.indexOf('##');
   
        if (resultEmpty != -1 || resultDouble != -1) {
            throw new CustomError(' ㄴ tag형식이 올바르지 않습니다.(공백 , #내용미입력)');
        }
        const result = tags.indexOf('#');

        if (result === -1) {
            throw new CustomError(' ㄴ tag형식이 올바르지 않습니다');
            // throw new CustomError({"errorMessage": "요청한 데이터 형식이 올바르지 않습니다."},401 );
        }

        const value = tags.split('#');

        let count = 0;
        let tagArr = [];
        for (var oneValue of value) {
            // console.log(oneValue);
            tagArr[count] = oneValue;
            count++;
        }
        console.log("=============================");
        console.log("tag배열은 = " , tagArr);
        return tagArr;
    };

    // -postId존재 여부 		findByPostId
    findByPostId = async (postId) => {
        const value = await this.postRepository.findByPostId(postId);

        if (!value) {
            throw new Error('포스트가 존재하지 않습니다', 400);
        }

        return value;
        // const value = await this.postRepository.findByPostId(postId);
        // return  value;
    };

    // -입력한 값 여부 확인 	checkInput
    checkInput = async ({ size, style, lifeType, space, content }) => {
        if (!size) {
            throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
        }
        if (!style) {
            throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
        }
        if (!lifeType) {
            throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
        }
        if (!space) {
            throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
        }
        if (!content) {
            throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
        }

        return;
    };

    // -게시글 생성		postCreate
    postCreate = async ({ userId, nickname, size, style, lifeType }) => {
        const value = await this.postRepository.createPost({
            userId,
            nickname,
            size,
            style,
            lifeType,
        });
        return value;
    };

    boardCreate = async ({ postId, img, space, content, tags }) => {
        const value = await this.postRepository.createBoard({
            postId,
            img,
            space,
            content,
            tags,
        });
        return value;
    };

    // -게시글 전체조회 	postFindall
    postFindall = async () => {
        const value = await this.postRepository.findByPost();

        // /////////comment카운터 해보기
        // const commentCount = await Comments.findAll({
        //     attributes: ['comment'],
        //     where: {postId : 77},
        // });

        // console.log('comment결과값입니다~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        // console.log(commentCount.length);

        //   /////////comment카운터 해보기
        //   const commentCount = await Comments.findAll({
        //     attributes: ['comment'],
        //     where: {
        //         [Op.and]: [{ postId : Posts.postId } /*, { userId }, { commentId } */],
        //     },
        // });

       
        const result = value.map((post) => {
            const { Boards, User, Comments,Likes, ...rest } = post;

            return {
                postId: post.postId,
                nickname: User.nickname,
                size: post.size,
                // comment : Comments.comment,
                comment: 'comment를 불러올 자리',
                likesCount: Likes.length,
                commentCount: Comments.length,
                Boards: Boards.map((board) => ({
                    img: board.img,
                    space: board.space,
                    content: board.content,
                })),
            };
        });

        return result;
    };

    // -게시글 일부조회 	postFindone
    postFindone = async (postId) => {
        const value = await this.postRepository.findByPostId(postId);

        let viewTotalCount = value.viewCount;

        const value2 = {
            postId: value.postId,
            nickname: value.User.nickname,
            style: value.style,
            lifeType: value.lifeType,
            likesCount: value.Likes.length,
            commentCount: value.Comments.length,
            viewCount: viewTotalCount++,
            Boards: value.Boards.map((board) => ({
                img: board.img,
                space: board.space,
                content: board.content,
            })),
        };

        return value2;
    };

    // -게시글 수정		postPatch
    postPatch = async (postId, size) => {
        const value = await this.postRepository.patchPost(postId, size);
        return value;
    };

    // -게시글 삭제  	postDestroy
    postDestroy = async (postId) => {
        const value = await this.postRepository.deletePost(postId);
        return value;
    };
}
module.exports = PostService;
