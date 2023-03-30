const express = require('express');
const router = express.Router();

//id확인용 미들웨어
const authmiddleware = require("../middleware/auth-middleware");

//컨트롤러로 자료
const postsController = require('../controllers/posts.controller.js');
const postscontroller = new postsController();

//게시글 작성  post  /posts
router.post("/posts", authmiddleware, postscontroller.Posts);

//게시판 전체 조회 get /main
router.get("/main", postscontroller.Main);

//게시글 상세조회 get  /posts/:{postId} 
router.get("/posts/:postId",  postscontroller.PostsGet);

//게시글 삭제   delete /posts/:{postId} 
router.delete("/posts/:postId", authmiddleware, postscontroller.PostsDelete);

//게시글 수정 patch /posts/:{postId}
router.patch("/posts/:postId", authmiddleware, postscontroller.PostsPatch);

router.get("/main/:lifeType", postscontroller.PostGetLifeType);

module.exports = router;
