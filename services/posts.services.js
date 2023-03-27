// const PostRepository = require("../repositories/posts.repositories");
// // const CustomError = require("../middlewares/errorhandler.js"); //에러를 미들웨어에서 처리
// // const axios = require("axios");
// // const cheerio = require("cheerio");

// class PostService {
//     constructor() {
//       this.PostRepository = new PostRepository();
//     }

//     //게시물 생성
//     createPost = async({size,style,lifeType}) =>{
//         await this.PostRepository.createPost({size,style,lifeType});
//     }

//     checkPostId = async(postId)=> {
//         const  checkPostId = await this.PostRepository.findByPostId();
//         return checkPostId;
//     }

//     checkTotal = async(size, style,lifeType)=>{
//         if(!size){
//             throw new Error("사이즈를 입력하세요");
//         }
//         if(!style){
//             throw new Error("스타일을 입력하세요");
//         }
//         if(!lifeType){
//             throw new Error("라이프타입을 입력하세요");
//         }
//     }

//     findAll = async()=>{
//         const  findAll = await this.PostRepository.findByPost();
//         return findAll;
//     }

//     deletePost = async(postId)=>{
//         const  deletePost = await this.PostRepository.deletePost();
//     }

// };
// module.exports = PostService;
//////////////////////////////////////////////////////////////////////////////////
// const PostRepository = require('../repositories/posts.repository.js');

// class PostsService {
//     PostRepository = new PostRepository();

//     // constructor() {
//     //     this.PostRepository = new PostRepository();
//     // }

//     checkTest = async () => {
//         console.log("확인");
//     };
// }

// module.exports = PostsService;
//////////////////////////////////////////////////////////////////////////////////
// services/posts.service.js

const PostRepository = require('../repositories/posts.repository');
// const express = require('express');
// const router = express.Router();
// const { Posts } = require('../models');

class PostService {
    postRepository = new PostRepository();

    testfindAllPost = async () => {
        console.log('서비스 위치입니다');
        const allPost = await this.postRepository.testfindAllPost();
        return allPost;
    };

    //게시물 생성
    createPost = async ({ size, style, lifeType, viewCount }) => {
        const value = await this.postRepository.createPost({ size, style, lifeType, viewCount });
        return value;
    };
}
module.exports = PostService;
