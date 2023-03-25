const express = require('express');
const router = express.Router();
const { Posts ,Users} = require('../models');

//id확인용 미들웨어
const authmiddleware = require("../middleware/auth-middleware.js");

//컨트롤러로 자료
const postsController = require('../controllers/posts.controller.js');
const postscontroller = new postsController();

//테스트
router.get("/test", postscontroller.Test);

//게시글 작성  post  /posts
// router.post("/posts", postscontroller.Posts);
router.post("/posts", async(req,res) => { 
    const {size,style,lifeType,viewCount}= req.body
    Posts.create({
        size,
        style,
        lifeType,
        viewCount
    }); 
});



/* 미들웨어 포함된 것
//게시글 작성  post  /posts
router.post("/posts", authmiddleware, postscontroller.Posts);

//게시판 전체 조회 get /main
router.get("/main", postscontroller.Main);

//게시글 상세조회 get  /posts/:{postId} 
router.get("/posts/:{postId}", authmiddleware, postscontroller.PostsGet);

//게시글 수정 patch /posts/:{postId}
router.patch("/posts/:{postId}", authmiddleware, postscontroller.PostsPatch);

//게시글 삭제   delete /posts/:{postId} 
router.delete("/posts/:{postId}", authmiddleware, postscontroller.PostsDelete);
*/






module.exports = router;
