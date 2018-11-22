import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import TextAreaInputGroup from '../common/TextAreaInputGroup';

class PostForm extends Component {

	constructor(){
		super();
		this.state = {
			text : '',
			errors : {}
		}

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({
				errors : nextProps.errors
			});
		}
	}

	onChange(e){
		this.setState({
			text : e.target.value
		});
	}

	onSubmit(e){
		e.preventDefault();

		const { user } = this.props.auth;

		const postData = {
			text : this.state.text,
			name : user.name,
			avatar : user.avatar
		}
		this.props.addPost(postData);
		this.setState({
			text : '',
			errors : {}
		})
	}

	render(){

		const { errors } = this.state;

		return (
			 <div className="post-form mb-3">
	            <div className="card card-info">
	              <div className="card-header bg-info text-white">
	                Say Somthing...
	              </div>
	              <div className="card-body">
	                <form onSubmit={this.onSubmit}>
	                  <div className="form-group">
	                    <TextAreaInputGroup
	                    	placeholder = "Create a post"
	                    	value = {this.state.text}
	                    	error = {errors.text}
	                    	onChange = {this.onChange}
	                    	name = "text"
	                    />
	                  </div>
	                  <button type="submit" className="btn btn-dark">Submit</button>
	                </form>
	              </div>
	            </div>
	          </div>
		)
	}
}

PostForm.propTypes = {
	errors : PropTypes.object.isRequired,
	auth : PropTypes.object.isRequired,
	addPost : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth : state.auth,	
	errors : state.errors
})

export default connect(mapStateToProps, { addPost })(PostForm);