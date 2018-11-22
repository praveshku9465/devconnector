const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


// @route   GET api/users/test
// @desc 	Tests users route
// @access  public
router.get('/test', (req, res) => res.json({msg : 'Users works'}));

// @route   POST api/users/register
// @desc 	Register users route
// @access  public
router.post('/register', (req, res) => {
	const {errors, isValid} = validateRegisterInput(req.body);

	//check validation
	if(!isValid){
		return res.status(400).json(errors);
	}


	User.findOne({email : req.body.email})
		.then(user => {
			if(user){
				errors.email = 'Email already Exists';
				res.status(400).json(errors);
			} else {
				const avatar = gravatar.url(req.body.email, {
					s : 200, //size
					r : 'pg', //Rating
					d : 'mm' // default
				});

				const newUser = new User({
					name : req.body.name,
					email: req.body.email,
					avatar,
					password : req.body.password
				});

				bcrypt.genSalt(10, (err , salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					})
				})
			}
		})
});

// @route   POST api/users/login
// @desc 	Login users / JWT Auth
// @access  public
router.post('/login', (req, res) => {
	const { email } = req.body;
	const { password } = req.body;
	const {errors, isValid} = validateLoginInput(req.body);

	//check validation
	if(!isValid){
		return res.status(400).json(errors);
	}

	User.findOne({ email })
		.then(user => {
			//check for user
			if(!user){
				errors.email = "User not found";
				return res.status(404).json(errors);
			}

			//check password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(isMatch){
						//User matched
						const payload = { 
											id : user.id, 
											name : user.name,
											avatar : user.avatar
										};

						//genrate JWT token				
						jwt.sign(
							payload, 
							keys.secretOrKey, 
							{expiresIn : 3600},
							(err, token) => {
								res.json({
									msg : true,
									token : 'Bearer ' + token
								});
							});

						//res.json({"msg": "success"});
					}else{
						errors.password = "Password incorrect"
						return res.status(400).json(errors);
					}
				})
		})
});

// @route   GET api/users/current
// @desc 	Return current user
// @access  private
router.get('/current', passport.authenticate('jwt', {session  : false}), (req, res) => {
	res.json({
		id : req.user._id,
		name: req.user.name,
		avatar: req.user.avatar
	});
});

module.exports = router;