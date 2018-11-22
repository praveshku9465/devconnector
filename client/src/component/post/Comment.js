import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class Comment extends Component {

	render(){

		const { comments } = this.props;
		console.log('dsfasdf', comments)
		return comments.map(comment => <CommentItem key={comment._id} comment={comment}/>);
		
	}
}

Comment.propTypes = {
	comments : PropTypes.array.isRequired
}

export default Comment;