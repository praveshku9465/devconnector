import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registeruser } from '../../actions/authAction';
import TextInputGroup from '../common/TextInputGroup';

class Register extends Component {

	constructor(){
		super();
		this.state = {
			name : '',
			email : '',
			password : '',
			password2 : '',
			errors : {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount(){
		if(this.props.auth.isAuthenticated){
			this.props.history.push('/dashboard');
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors : nextProps.errors});
		}
	}

	onChange(e){
		this.setState({[e.target.name] : e.target.value});
	}

	onSubmit(e){
		e.preventDefault()

		const newUser = {
			name : this.state.name,
			email : this.state.email,
			password : this.state.password,
			password2 : this.state.password2
		}

		this.props.registerUser(newUser, this.props.history);
	}


	render(){
		const { errors } = this.state;
		const { user } = this.props.auth;

		return (
		  <div className="register">
		  	{user ? user.name : null}
		    <div className="container">
		      <div className="row">
		        <div className="col-md-8 m-auto">
		          <h1 className="display-4 text-center">Sign Up</h1>
		          <p className="lead text-center">Create your DevConnector account</p>
		          <form onSubmit={this.onSubmit} noValidate>
		            
		            <TextInputGroup 
			              placeholder="Name"
			              value={this.state.name}
			              onChange={this.onChange}
			              name="name"
			              error={errors.name}
			            />
		            
		            <TextInputGroup 
			              type="email" 
			              placeholder="Eamil Address"
			              value={this.state.email}
			              onChange={this.onChange}
			              name="email"
			              error={errors.email}
			              info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
			            />
		            
		            <TextInputGroup 
			              type="password" 
			              placeholder="Password"
			              value={this.state.password}
			              onChange={this.onChange}
			              name="password"
			              error={errors.password}
			        />
		            
		            <TextInputGroup 
			              type="password" 
			              placeholder="Confirm Password"
			              value={this.state.password2}
			              onChange={this.onChange}
			              name="password2"
			              error={errors.password2}
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

Register.propTypes = {
	registerUser : PropTypes.func.isRequired,
	auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth : state.auth,
	errors : state.errors
})

export default connect(mapStateToProps, {registerUser : registeruser})(withRouter(Register));