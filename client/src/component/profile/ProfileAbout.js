import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ProfileAbout extends Component {
	
	
	render(){
		
		const { profile } = this.props;

		return (
			<div class="row">
	            <div class="col-md-12">
	              <div class="card card-body bg-light mb-3">
	                <h3 class="text-center text-info">{profile.user.name}'s Bio</h3>
	                <p class="lead">{profile.bio}
	                </p>
	                <hr />
	                <h3 class="text-center text-info">Skill Set</h3>
	                <div class="row">
	                  <div class="d-flex flex-wrap justify-content-center align-items-center">
	                  	{
	                  		profile.skills.map(skill => (
	                  			<div class="p-3">
	                      			<i class="fa fa-check"></i> {skill}
	                      		</div>
	                  		))
	                  	}	                    	                
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
		)
	}
}

ProfileAbout.propTypes = {
	profile : PropTypes.object.isRequired
}


export default ProfileAbout;