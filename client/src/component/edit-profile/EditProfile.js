import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInputGroup from '../common/TextInputGroup';
import TextAreaInputGroup from '../common/TextAreaInputGroup';
import SelectListGroup from '../common/SelectListGroup';
import InputGroup from '../common/InputGroup';
import {createUserProfile, getCurrentProfile} from '../../actions/profileActions'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';


class EditProfile extends Component {

	constructor(props){
		super(props);
		this.state = {
			displayLocalInputs : false,
			handle : '',
			company : '',
			website : '',
			location : '',
			status : '',
			skills : '',
			githubusername : '',
			bio : '',
			twitter : '',
			facebook : '',
			linkedin : '',
			youtube : '',
			instagram : '',
			errors : {}
		}


		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		this.props.getCurrentProfile();
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors : nextProps.errors
			})
		}

		if(nextProps.profile.profile){
			const profile = nextProps.profile.profile;

			const skillsCSV = profile.skills.join(',');

			profile.company = !isEmpty(profile.company) ? profile.company : '';
			profile.website = !isEmpty(profile.website) ? profile.website : '';
			profile.location = !isEmpty(profile.location) ? profile.location : '';
			profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
			profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
			profile.social = !isEmpty(profile.social) ? profile.social : {};
			profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : '';
			profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : '';
			profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : '';
			profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : '';
			profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '';

			this.setState({
				handle : profile.handle,
				company : profile.company,
				website : profile.website,
				status : profile.status,
				location : profile.location,
				skills : skillsCSV,
				githubusername : profile.githubusername,
				bio : profile.bio,
				twitter : profile.twitter,
				facebook : profile.facebook,
				youtube : profile.youtube,
				instagram : profile.instagram,
				linkedin : profile.linkedin

			});

		}
	}

	onChange(e){
		this.setState({[e.target.name] : e.target.value});
	}

	onSubmit(e){
		e.preventDefault();
		this.props.createUserProfile(this.state, this.props.history);
	}


	render(){

		const { errors, displayLocalInputs } = this.state;
		let socialInputs;
		
		if(displayLocalInputs){
			socialInputs = (
				<div>
				<InputGroup
					placeholder="Facebook Page URL"
					name="facebook"
					icon="fab fa-facebook"
					value={this.state.facebook}
					onChange={this.onChange}
					error={errors.facebook}
				/>
				<InputGroup
					placeholder="Twitter Page URL"
					name="twitter"
					icon="fab fa-twitter"
					value={this.state.twitter}
					onChange={this.onChange}
					error={errors.twitter}
				/>
				<InputGroup
					placeholder="Linkedin Page URL"
					name="linkedin"
					icon="fab fa-linkedin"
					value={this.state.linkedin}
					onChange={this.onChange}
					error={errors.linkedin}
				/>
				<InputGroup
					placeholder="Youtube Page URL"
					name="youtube"
					icon="fab fa-youtube"
					value={this.state.youtube}
					onChange={this.onChange}
					error={errors.youtube}
				/>
				<InputGroup
					placeholder="Instagram Page URL"
					name="instagram"
					icon="fab fa-instagram"
					value={this.state.instagram}
					onChange={this.onChange}
					error={errors.instagram}
				/>
				</div>
			)
		}

		//select options for status
		const options = [
			{ label:'* Select Professional Status', value : 0},
			{ label:'Developer', value : 'Developer'},
			{ label:'Junior Developer', value : 'Junior Developer'},
			{ label:'Senior Developer', value : 'Senior Developer'},
			{ label:'Manager', value : 'Manager'},
			{ label:'Student or Learning', value : 'Student or Learning'},
			{ label:'Instructor or Teacher', value : 'Instructor or Teacher'},
			{ label:'Intern', value : 'Intern'},
			{ label:'Other', value : 'Other'}
		]

		return (
			<div className="create-profile">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <Link to="/dashboard" className="btn btn-light">
			            Go Back
			          </Link>
			          <h1 className="display-4 text-center">Edit Profile</h1>
			          <small className="d-block pb-3">* = required field</small>
			          <form onSubmit={this.onSubmit}>
			            
			            <TextInputGroup 
			              type="text" 
			              placeholder="* Profile handle"
			              value={this.state.handle}
			              onChange={this.onChange}
			              name="handle"
			              error={errors.handle}
			              info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
			            />
			            <SelectListGroup 
			              value={this.state.status}
			              onChange={this.onChange}
			              name="status"
			              error={errors.status}
			              info="Give us an idea of where you are at in your career"
			              option = {options}
			            />
			            
			            <TextInputGroup 
			              type="text" 
			              placeholder="Company"
			              value={this.state.company}
			              onChange={this.onChange}
			              error={errors.company}
			              name="company"
			              info="Could be your own company or one you work for"
			            />
			            
			            <TextInputGroup 
			              type="text" 
			              placeholder="Website"
			              value={this.state.website}
			              onChange={this.onChange}
			              error={errors.website}
			              name="website"
			              info="Could be your own or a company website"
			            />
			            
			            <TextInputGroup 
			              type="text" 
			              placeholder="Location"
			              value={this.state.location}
			              onChange={this.onChange}
			              error={errors.location}
			              name="location"
			              info="City & state suggested (eg. Boston, MA)"
			            />
			           
			            <TextInputGroup 
			              type="text" 
			              placeholder="Skills"
			              value={this.state.skills}
			              onChange={this.onChange}
			              error={errors.skills}
			              name="skills"
			              info="Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)"
			            />
			            
			            <TextInputGroup 
			              type="text" 
			              placeholder="Github Username"
			              value={this.state.githubusername}
			              onChange={this.onChange}
			              error={errors.githubusername}
			              name="githubusername"
			              info="If you want your latest repos and a Github link, include your username"
			            />
			            
			            <TextAreaInputGroup 
			              placeholder="A short bio of yourself"
			              value={this.state.bio}
			              onChange={this.onChange}
			              error={errors.bio}
			              name="bio"
			              info="Tell us a little about yourself"
			            />

			            <div className="mb-3">
			              <button type="button" className="btn btn-light" onClick={() => {
			              	this.setState(prevState => ({
			              		displayLocalInputs : !prevState.displayLocalInputs
			              	}))
			              }}>Add Social Network Links</button>
			              <span className="text-muted">Optional</span>
			            </div>

			            {socialInputs}

			            <input type="submit" className="btn btn-info btn-block mt-4" />
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
		)
	}
}

EditProfile.propTypes = {
	profile : PropTypes.object.isRequired,
	createUserProfile: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	profile : state.profile,
	errors : state.errors
})


export default connect(mapStateToProps, { createUserProfile, getCurrentProfile })(withRouter(EditProfile));