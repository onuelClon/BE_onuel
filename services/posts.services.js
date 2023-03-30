const PostRepository = require('../repositories/posts.repository');
const CustomError = require('../middleware/errorhandler');

class PostService {
    postRepository = new PostRepository();

    //게시글 생성
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

    //board 생성
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

    //찾은 값의 순서를 정렬
    postSort = async (title, posts) => {
        switch (title) {
            case 'likesCount':
                posts = posts.sort((a, b) => {
                    return b.likesCount - a.likesCount;
                });
                break;

            case 'commentCount':
                posts = posts.sort((a, b) => {
                    return b.commentCount - a.commentCount;
                });
                break;

            case 'createAt':
                posts = posts.sort((a, b) => {
                    return b.createAt - a.createAt;
                });
                break;

            default:
                posts = posts.sort((a, b) => {
                    return a.postId - b.postId;
                });
        }
        return posts;
    };

    //게시글 전체조회
    postFindall = async () => {
        const value = await this.postRepository.findByPost();

        let result = value.map((post) => {
            const { Boards, User, Comments, Likes} = post;

            return {
                postId: post.postId,
                nickname: User.nickname,
                size: post.size,
                comment: Comments.length > 0 ? Comments[0].comment : null,
                likesCount: Likes.length,
                commentCount: Comments.length,
                lifeType: post.lifeType,
                createAt: post.createdAt,
                boards: Boards.map((board) => ({
                    img: board.img,
                    space: board.space,
                    content: board.content,
                })),
            };
        });

        return result;
    };


     //postId존재 여부
     findByPostId = async (postId) => {
        const value = await this.postRepository.findByPostId(postId);

        if (!value) {
            throw new Error('post가 존재하지 않습니다', 400);
        }

    };


    //게시글 일부조회
    postFindone = async (postId) => {
        const value = await this.postRepository.findByPostId(postId);

        //일부조회를 호출할때마다 조회수 증가
        let viewCount = value.viewCount;
        viewCount++;
        value.update({ viewCount });

        const result = {
            postId: value.postId,
            nickname: value.User.nickname,
            size: value.size,
            style: value.style,
            lifeType: value.lifeType,
            likesCount: value.Likes.length,
            commentCount: value.Comments.length,
            viewCount: viewCount,
            boards: value.Boards.map((board) => ({
                img: board.img,
                space: board.space,
                content: board.content,
                tags: board.tags,
            })),
        };

        return result;
    };

    //where문이 포함된 전체 내용 찾기
    postWhereFindall = async (lifeType) => {
        const value = await this.postRepository.postWhereFindall(lifeType);

        let result = value.map((post) => {
            const { Boards, User, Comments, Likes } = post;

            return {
                postId: post.postId,
                nickname: User.nickname,
                size: post.size,
                comment: Comments.length > 0 ? Comments[0].comment : null,
                likesCount: Likes.length,
                commentCount: Comments.length,
                lifeType: post.lifeType,
                createAt: post.createdAt,
                boards: Boards.map((board) => ({
                    img: board.img,
                    space: board.space,
                    content: board.content,
                })),
            };
        });
        return result;
    };

    //게시글 수정
    postPatch = async (postId, size, style, lifeType, img, space, content, tags) => {
        const value = await this.postRepository.patchPost(
            postId,
            size,
            style,
            lifeType,
            img,
            space,
            content,
            tags
        );
        return value;
    };

    //게시글 삭제
    postDestroy = async (postId) => {
        const value = await this.postRepository.deletePost(postId);
        return value;
    };

    //사용을 보류하기로 함
    //tag를 형식
    // checkTag = async ({ tags }) => {
    //     const resultEmpty = tags.indexOf(' ');
    //     const resultDouble = tags.indexOf('##');

    //     if (resultEmpty != -1 || resultDouble != -1) {
    //         throw new CustomError({"errorMessage": "요청한 데이터 형식이 올바르지 않습니다."},401 );

    //     }
    //     const result = tags.indexOf('#');

    //     if (result === -1) {
    //         throw new CustomError({"errorMessage": "요청한 데이터 형식이 올바르지 않습니다."},401 );
    //     }

    //     const value = tags.split('#');

    //     let count = 0;
    //     let tagArr = [];
    //     for (var oneValue of value) {
    //         tagArr[count] = oneValue;
    //         count++;
    //     }

    //     return tagArr;
    // };

    //입력한 값 여부 확인
    // checkInput = async ({ size, style, lifeType, space, content }) => {
    //     if (!size) {
    //         throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
    //     }
    //     if (!style) {
    //         throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
    //     }
    //     if (!lifeType) {
    //         throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
    //     }
    //     if (!space) {
    //         throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
    //     }
    //     if (!content) {
    //         throw new CustomError({ errorMessage: '요청한 데이터 형식이 올바르지 않습니다.' }, 400);
    //     }

    //     return;
    // };
}
module.exports = PostService;
