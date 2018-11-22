import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextAreaInputGroup from '../common/TextAreaInputGroup';
import TextInputGroup from '../common/TextInputGroup';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profileActions'

class AddExpeience extends Component {
	constructor(props){
		super(props);
		this.state = {
			company : '',
			title : '',
			location : '',
			from : '',
			to : '',
			current : false,
			description : '',
			errors : {},
			disabled : false
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCheck = this.onCheck.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors : nextProps.errors
			})
		}
	}

	onChange(e){
		this.setState({[e.target.name] : e.target.value});
	}

	onCheck(e){
		this.setState({
			disabled : !this.state.disabled,
			current : !this.state.current
		});
	}

	onSubmit(e){
		e.preventDefault();
		const expData = {
			company : this.state.company,
			title : this.state.title,
			location : this.state.location,
			from : this.state.from,
			to : this.state.to,
			current : this.state.current,
			description : this.state.description
		}

		this.props.addExperience(expData, this.props.history);
	}

	render(){

		const { errors } = this.state;

		return (
			  <div className="section add-experience">
			    <div className="container">
			      <div className="row">
			        <div className="col-md-8 m-auto">
			          <Link to="/dashboard" className="btn btn-light">
			            Go Back
			          </Link>
			          <h1 className="display-4 text-center">Add Your Experience</h1>
			          <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
			          <small className="d-block pb-3">* = required field</small>
			          <form onSubmit={this.onSubmit}>
			            
			            <TextInputGroup 
			            	type="text"
			            	placeholder="* Job Title"
			            	name = "title"
			            	error = {errors.title}
			            	onChange = {this.onChange}
			            	value = {this.state.title}
			            />
			            
			            <TextInputGroup 
			            	type="text"
			            	placeholder="* Company"
			            	name = "company"
			            	error = {errors.company}
			            	onChange = {this.onChange}
			            	value = {this.state.company}
			            />
			            
			            <TextInputGroup 
			            	type="text"
			            	placeholder="Location"
			            	name = "location"
			            	error = {errors.location}
			            	onChange = {this.onChange}
			            	value = {this.state.location}
			            />
			            <h6>From Date</h6>
			            
			            <TextInputGroup 
			            	type="date"
			            	name = "from"
			            	error = {errors.from}
			            	onChange = {this.onChange}
			            	value = {this.state.from}
			            />
			            <h6>To Date</h6>
			            
			            <TextInputGroup 
			            	type="date"
			            	name = "to"
			            	error = {errors.to}
			            	onChange = {this.onChange}
			            	value = {this.state.to}
			            	disabled = {this.state.disabled ? 'disabled' : ''}
			            />
			            <div className="form-check mb-4">
			              <input 
			              	className="form-check-input" 
			              	type="checkbox" 
			              	name="current" 
			              	value={this.state.current}
			              	checked = {this.state.current} 
			              	onChange = {this.onCheck}
			              	id="current" />
			              <label className="form-check-label" htmlFor="current">
			                Current Job
			              </label>
			            </div>
			            
			            <TextAreaInputGroup 
			            	placeholder = "Job Description"
			            	name = "description"
			            	error = {errors.description}
			            	onChange = {this.onChange}
			            	value = {this.state.description}
			            	into = "Tell us about the position"
			            />
			            <input type="submit" className="btn btn-info btn-block mt-4" />
			          </form>
			        </div>
			      </div>
			    </div>
			  </div>
		)
	}
}

AddExpeience.propTypes = {
	addExperience : PropTypes.func.isRequired,
	profile : PropTypes.object.isRequired,
	errors : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profile : state.profile.profile,
	errors : state.errors
});

export default connect(mapStateToProps, {addExperience})(withRouter(AddExpeience));