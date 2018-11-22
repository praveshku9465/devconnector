const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc 	Tests posts route
// @access  public
router.get('/test', (req, res) => res.json({msg : 'Posts works'}));

// @route   POST api/posts/
// @desc 	Create post
// @access  private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	if(!isValid){
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text : req.body.text,
		name : req.body.name,
		avatar : req.body.avatar,
		user : req.user.id
	});

	newPost.save().then(post => res.json(post));
});

// @route   GET api/posts/
// @desc 	Get post
// @access  public
router.get('/', (req, res) => {
	Post.find()
		.sort({date : -1})
		.then((posts) => res.json(posts))
		.catch(err => res.status(400).json({nopostsfound : 'No posts'}))
});


// @route   GET api/posts/:id
// @desc 	Get post by id
// @access  public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch(err => res.status(400).json({nopostfound : 'No post found for this Id'}));
});

// @route   DELETE api/posts/:id
// @desc 	Delete post by id
// @access  private

router.delete('/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
	Profile.findOne({ user : req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					//check for post owner
					if(post.user.toString() !== req.user.id){
						return res.status(401).json({notauthorized : "User not authorized"});
					}

					Post.deleteOne().then(() => res.json({success : true}));
				})
				.catch(err => res.json({postnotfound : 'Post not found'}));
		});
});

// @route   POST api/posts/like/:id
// @desc 	Like post by id
// @access  private

router.post('/like/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
	Profile.findOne({ user : req.user.id})
		.then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
						return res.status(400).json({alreadyliked : "User already liked this post"});
					}

					post.likes.unshift({user : req.user.id});

					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({postnotfound : 'Post not found'}));
		});
});


// @route   POST api/posts/unlike/:id
// @desc 	Unlike post by id
// @access  private
router.post('/unlike/:id', passport.authenticate('jwt', {session : false}), (req, res) => {
	Profile.findOne({ user : req.user.id})
		.then(profile => {

			Post.findById(req.params.id)
				.then(post => {
					
					if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
						return res.status(400).json({notliked : "You not liked this post yet"});
					}

					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);
						
					post.likes.splice(removeIndex, 1);		

					post.save().then(post => res.json(post));
				})
				.catch(err => res.status(404).json({postnotfound : 'Post not found'}));
		});
});

// @route   POST api/posts/comment/id
// @desc 	Create comment
// @access  private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	if(!isValid){
		return res.status(400).json(errors);
	}

	Post.findById(req.params.id)
		.then(post => {
			const newComment = {
				text : req.body.text,
				name : req.body.name,
				avatar : req.body.avatar,
				user : req.user.id
			};

			//add to comment array
			post.comments.unshift(newComment);

			//save post
			post.save().then(post => res.json(post));
		})
		.catch(err => res.status(400).json({postnotfound : 'Post Not Found'}));
	
});


module.exports = router;