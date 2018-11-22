import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostItem extends Component{
  render(){
    const { post } = this.props.post;

	return (
		<div className="card card-body mb-3">
            <div className="row">
              <div className="col-md-2">
                <a href="profile.html">
                  <img className="rounded-circle d-none d-md-block" src={post.avatar}
                    alt="" />
                </a>
                <br />
                <p className="text-center">{post.name}</p>
              </div>
              <div className="col-md-10">
                <p className="lead">{post.text}</p>
              </div>
            </div>
          </div>
	)
}
}

PostItem.propTypes = {
	post : PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post : state.post
})

export default connect(mapStateToProps)(PostItem);