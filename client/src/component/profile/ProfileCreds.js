import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';


class ProfileCreds extends Component {
	
	
	render(){

		const { profile } = this.props;
	
		return (
			<div class="row">
	            <div class="col-md-6">
	              <h3 class="text-center text-info">Experience</h3>
	              <ul class="list-group">
	              { profile.experience.map(exp => (
		                <li class="list-group-item">
		                  <h4>{exp.company}</h4>
		                  <p><Moment format="YYYY/MM/DD">{exp.from}</Moment> 
		                  	- {exp.current ? 'Current' : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
		                  </p>
		                  <p>
		                    <strong>Position:</strong> {exp.title}
		                  </p>
		                  {isEmpty(exp.description) ? null :(<p>
		                    <strong>Description:</strong> {exp.description}</p>)}
		                </li>
	                ))
	            }
	              </ul>
	            </div>
	            <div class="col-md-6">
	              <h3 class="text-center text-info">Education</h3>
	              <ul class="list-group">
	                { profile.education.map(edu => (
		                 <li class="list-group-item">
		                  <h4>{edu.school}</h4>
		                  <p><Moment format="YYYY/MM/DD">{edu.from}</Moment>
		                   - {edu.current ? 'Current' : (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
		                   </p>
		                  <p>
		                    <strong>Degree: </strong>{edu.degree}</p>
		                  <p>
		                    <strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
		                      {isEmpty(edu.description) ? null :(<p>
		                    <strong>Description:</strong> {edu.description}</p>)}
		                </li>
	                ))
	               } 
	              </ul>
	            </div>
	          </div>
		)
	}
}


export default ProfileCreds;