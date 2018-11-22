import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextAreaInputGroup from '../common/TextAreaInputGroup';
import TextInputGroup from '../common/TextInputGroup';
import { connect } from 'react-redux'; 
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions'

class AddEducation extends Component {
	constructor(props){
		super(props);
		this.state = {
			school : '',
			degree : '',
			fieldofstudy : '',
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
		const eduData = {
			school : this.state.school,
			degree : this.state.degree,
			fieldofstudy : this.state.fieldofstudy,
			from : this.state.from,
			to : this.state.to,
			current : this.state.current,
			description : this.state.description
		}

		this.props.addEducation(eduData, this.props.history);
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
			          <h1 className="display-4 text-center">Add Your Education</h1>
			          <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
			          <small className="d-block pb-3">* = required field</small>
			          <form onSubmit={this.onSubmit}>
			            
			            <TextInputGroup 
			            	type="text"
			            	placeholder="* School"
			            	name = "school"
			            	error = {errors.school}
			            	onChange = {this.onChange}
			            	value = {this.state.school}
			            />
			            
			            <TextInputGroup 
			            	type="text"
			            	placeholder="* Degree"
			            	name = "degree"
			            	error = {errors.degree}
			            	onChange = {this.onChange}
			            	value = {this.state.degree}
			            />
			            
			            <TextInputGroup 
			            	type="text"
			            	placeholder="Field Of Study"
			            	name = "fieldofstudy"
			            	error = {errors.fieldofstudy}
			            	onChange = {this.onChange}
			            	value = {this.state.fieldofstudy}
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
			                Current School
			              </label>
			            </div>
			            
			            <TextAreaInputGroup 
			            	placeholder = "School Description"
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

AddEducation.propTypes = {
	addEducation : PropTypes.func.isRequired,
	profile : PropTypes.object.isRequired,
	errors : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	profile : state.profile.profile,
	errors : state.errors
});

export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));