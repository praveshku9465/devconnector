import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import TextAreaInputGroup from '../common/TextAreaInputGroup';

class CommentForm extends Component {

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
		const { post } = this.props.post;

		const commentData = {
			text : this.state.text,
			name : user.name,
			avatar : user.avatar
		}
		this.props.addComment(post._id, commentData);
		this.setState({
			text : '',
			errors : {}
		})
	}

	render(){

		const { errors } = this.state;

		return (
			 <div class="post-form mb-3">
			   <div class="card card-info">
			     <div class="card-header bg-info text-white">
			       Say Somthing...
			     </div>
			     <div class="card-body">
			       <form onSubmit={this.onSubmit}>
			         <div class="form-group">
			           <TextAreaInputGroup
	                    	placeholder = "Comment Here"
	                    	value = {this.state.text}
	                    	error = {errors.text}
	                    	onChange = {this.onChange}
	                    	name = "text"
	                    />
			         </div>
			         <button type="submit" class="btn btn-dark">Submit</button>
			       </form>
			     </div>
			   </div>
			 </div>
		)
	}
}

CommentForm.propTypes = {
	errors : PropTypes.object.isRequired,
	auth : PropTypes.object.isRequired,
	addComment : PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	auth : state.auth,	
	errors : state.errors,
	post : state.post
})

export default connect(mapStateToProps, { addComment })(CommentForm);