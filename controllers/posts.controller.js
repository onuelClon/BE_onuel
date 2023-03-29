const PostService = require('../services/posts.services');
const express = require('express');

//트랙젝션 사용
const { Posts, sequelize } = require('../models');
const { Transaction } = require('sequelize');
//나중에 삭제//나중에 삭제//나중에 삭제//나중에 삭제//나중에 삭제//나중에 삭제//나중에 삭제
const { Users, Boards, Comments, Likes } = require('../models'); //나중에 삭제
//나중에 삭제//나중에 삭제//나중에 삭제//나중에 삭제//나중에 삭제//나중에 삭제
class PostsController {
    postService = new PostService();
 
    //게시물 생성
    Posts = async (req, res, next) => {
        try {
            const { userId, nickname } = res.locals.user;
            // const {size, style, lifeType, img, space, content, tags } = req.body;
            const { size, style, lifeType, boards } = req.body;
            console.log(boards[1].content);
            console.log(boards.length);

            //게시물생성
            const posts = await this.postService.postCreate({
                userId,
                nickname,
                size,
                style,
                lifeType,
                // viewCount,
            });

            const postId = posts.postId;

            let TotalBoards = [];
            for (let i = 0; i < boards.length; i++) {
                TotalBoards[i] = await this.postService.boardCreate({
                    postId,
                    img: boards[i].img,
                    space: boards[i].space,
                    content: boards[i].content,
                    tags: boards[i].tags,
                });
            }
            res.status(201).json({ message: '계시글 작성 성공하였습니다.' });
            /*
            const tagsArr = await this.postService.checkTag({tags});

            //게시물생성
            const posts = await this.postService.postCreate({
                userId,
                nickname,
                size,
                style,
                lifeType,
                // viewCount,
            });

            //post테이블 먼져 생성후 postㅑd 가져와서 board postId값 넣어줌
            const postId = posts.postId;

            const boards = await this.postService.boardCreate({
                postId,
                img,
                space,
                content,
                tags,
            });
      

            const value = {
                userId,
                nickname,
                postId: posts.postId,
                size: posts.size,
                style: posts.style,
                lifeType: posts.lifeType,
                // viewCount: posts.viewCount,
                boards,
            };

            res.status(201).json({ "message": "계시글 작성 성공하였습니다."});
            res.status(200).json({ posts: value });*/
        } catch (err) {
            next(err);
        }
    };

    //★메인 게시믈 전체조회
    Main = async (req, res, next) => {
        try {
            //?값 title = 값 사용
            const {title} = req.query;

            //전체 조회, 출력
            let posts = await this.postService.postFindall();

            //순서 정렬
            posts = await this.postService.postSort(title,posts);

            res.status(200).json({ posts: posts });
        } catch (err) {
            next(err);
        }
    };

    //게시물 상세조회
    PostsGet = async (req, res, next) => {
        try {
            const { postId } = req.params;

            //postid존재여부
            await this.postService.findByPostId(postId);

            //게시물 상세조회
            const post = await this.postService.postFindone(postId);
            res.status(200).json({ post });
        } catch (err) {
            next(err);
        }
    };

    //게시글 수정 PostsPatch
    PostsPatch = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { size, style, lifeType } = req.body;
            console.log(size,style,lifeType)
            //postid존재여부
            await this.postService.findByPostId(postId);
            //입력값 확인
            //img 확인
            //tag형식확인

            // await checkTotal(size, style, lifeType);
            //게시물 수정
            await this.postService.postPatch(postId, size);

            res.status(201).json({ message: '게시글 수정을 완료하였습니다' });
        } catch (err) {
            next(err);
        }
    };

    //게시물 삭제
    PostsDelete = async (req, res, next) => {
        try {
            const { postId } = req.params;

            //postid존재여부
            await this.postService.findByPostId(postId);

            // await this.postService.checkPostId(postId);
            //게시물 삭제
            await this.postService.postDestroy(postId);
            res.status(200).json({ message: '게시글을 삭제하였습니다' });
        } catch (err) {
            next(err);
        }
    };

    PostGetLifeType = async (req, res, next) => {
       
        let {lifeType} = req.params;

         //?값 title = 값 사용
         const {title} = req.query;

         //전체 조회, 출력
         let posts = await this.postService.postWhereFindall(lifeType);

         //순서 정렬
         posts = await this.postService.postSort(title,posts);

        res.send(posts);
    };

    //     -입력한 값 여부 확인
    // -img 여부 			checkImg
    // -tag를 형식			checkTag
    // -postId존재 여부 		findByPostId => await this.postService.findByPostId(postId);
    // -입력한 값 여부 확인 	checkInput

    // -게시글 전체조회 	postFindall
    // -게시글 일부조회 	postFindone
    // -게시글 삭제  	postDestroy
    // -게시글 생성		postCreate
    // -게시글 수정		postPatch
}
module.exports = PostsController;
