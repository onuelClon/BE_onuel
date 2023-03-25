// const express = require("express");
// const router = express.Router();

// // const {Posts, Boards} = require("../model")
// // const {Posts}= require("../repositories")

// class PostsController {
//     constructor(){
//         this.PostsService = new PostsService();
//     }
// }

// //게시글 작성  post  /posts
// // boards: ["img","space","content","tags"]
// //실행할것 중복된 거 찾는 기능 없음
// Posts = async (req,res,next) => {
//     try {
//         const {size, style,lifeType} = req.body;

//         await checkTotal(size, style, lifeType );
//         await this.PostsService.createPost({size,style,lifeType});

//         res.status(201).json({"message" : "게시글 작성을 완료하였습니다"});
//     }  catch(err){
//         next(err);
//     }
// };

// //게시글 상세조회 PostsGet
// PostsGet = async (req,res,next) => {
//    try{
//     const { postId } = req.params;
//     const post = await checkPostId(postId);

//     res.status(201).json({ post });
//    }catch(err){
//     next(err);
//    }
// }

// //게시글 수정 PostsPatch
// PostsPatch = async (req,res,next) => {
//     try{
//         const { postId } = req.params;
//         const { size, style, lifeType } = req.body;
//         await checkPostId(postId);
//         await checkTotal(size, style, lifeType );

//         res.status(201).json({"message" : "게시글 수정을 완료하였습니다"});
//     }catch(err){
//         next(err);
//     }
// }

// //게시글 삭제  PostsDelete
// PostsDelete = async(req,res,next) =>{
//     try{
//         const { postId } = req.params;
//         checkPostId(postId)
//         deletePost(postId)
//         res.status(200).json({"message" : "게시글을 삭제하였습니다"});
//     }catch(err){
//         next(err);
//     }
// }

// //게시판 전체 조회 Main
// Main = async(req,res,next) =>{
//     try{
//        const post = await findAll();
//         res.status(201).json({post});
//     }catch(err){
//         next(err);
//     }
// }

// module.exports = router;

//////////////////////////////////////////////////////////////////////////////////
// const express = require("express");
// const PostsService = require("../services/posts.services.js");

// class PostsController {
//     postsService = new PostsService();

//     // PostService
//     // postService = new PostService();
//     // const posts = await this.postService.findAllPost();

//     // constructor(){
//     //     this.PostsService = new PostsService();
//     // }
//     Test = async (req,res,next) => {
//          this.postsService.checkTest();
//         res.send("컨트롤러");
//    };

// }
// module.exports = PostsController;
//////////////////////////////////////////////////////////////////////////////////
const PostService = require('../services/posts.services');


const express = require('express');
const router = express.Router();
const { Posts } = require('../models');



class PostsController {

  postService = new PostService();

    Test = async (req, res, next) => {
        console.log('컨트롤러 위치입니다');
        const posts = await this.postService.testfindAllPost();
        res.status(200).json({ data: posts });
    };


    Posts = async(req,res,next)=> { 
      console.log('post 컨트롤러 위치입니다');
      const {size,style,lifeType,viewCount}= req.body
      const posts = await this.postService.createPost({size,style,lifeType,viewCount});
      res.status(200).json({ data: posts });
    };
   
    

}

module.exports = PostsController;
