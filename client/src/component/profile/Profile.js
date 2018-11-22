import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import ProfileGithub from './ProfileGithub';
import { getProfileByHandle } from '../../actions/profileActions';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spinner';


class Profile extends Component {
	
	componentDidMount(){
		if(this.props.match.params.handle_id){			
			this.props.getProfileByHandle(this.props.match.params.handle_id);
		}
	}

	render(){

		const { profile, loading } = this.props.profile;
		let profileContent;

		if(profile === null || loading){
			profileContent = <Spinner />;
		}else{
			profileContent = (
				<div>
					<div class="row">
			            <div class="col-6">
			              <Link to="/profiles" class="btn btn-light mb-3 float-left">Back To Profiles</Link>
			            </div>
			            <div class="col-6">

			            </div>
			          </div>
			          <ProfileHeader profile={profile} />
					  <ProfileAbout  profile={profile} />
					  <ProfileCreds profile={profile} />
					  {/*<ProfileGithub profile={profile} />*/}
				</div>
			)
		}


		return (
			<div class="profile">
			    <div class="container">
			      <div class="row">
			        <div class="col-md-12">
			          {profileContent}
						
					</div>	
				  </div>		
				</div>		
			</div>
		)
	}
}

Profile.propTypes = {
	getProfileByHandle : PropTypes.func.isRequired,
	profile : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profile : state.profile
})

export default connect(mapStateToProps, {getProfileByHandle})(Profile);