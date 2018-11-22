import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost, likePost, unlikePost } from '../../actions/postActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class CommentItem extends Component {

	render(){

		const { comment } = this.props;

		return (
		        <div class="card card-body mb-3">
              <div class="row">
                <div class="col-md-2">
                  <a href="profile.html">
                    <img class="rounded-circle d-none d-md-block" src="https://www.gravatar.com/avatar/anything?s=200&d=mm" alt="" />
                  </a>
                  <br />
                  <p class="text-center">{comment.name}</p>
                </div>
                <div class="col-md-10">
                  <p class="lead">{comment.text}</p>
                </div>
              </div>
            </div>
		)
	}
}

CommentItem.propTypes = {
	comment : PropTypes.object.isRequired,
}


export default CommentItem;