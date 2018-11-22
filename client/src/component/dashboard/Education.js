import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteEducation } from '../../actions/profileActions';

class Education extends Component {

	onDelete(id){
		this.props.deleteEducation(id);
	}

	render() {
		const education = this.props.education.map(item => (
			<tr key={item._id}>
				<td>{item.school}</td>
				<td>{item.degree}</td>
				<td><Moment format="YYYY/MM/DD">{item.from}</Moment> - {' '} 
					{item.to === null ? 
						('Now'):
						(<Moment format="YYYY/MM/DD">{item.to}</Moment>
					)}
				</td>	
				<td><button className="btn btn-danger" onClick={
					this.onDelete.bind(this, item._id)
				}>Delete</button></td>
			</tr>
		));

		return (
		  <div>
            <h4 className="mb-2">Education Credentials</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Degree</th>
                  <th>Years</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {education}
              </tbody>
            </table>
          </div>
		)
	}
} 

Education.propTypes = {
	deleteEducation : PropTypes.func.isRequired
}


export default connect(null, {deleteEducation})(Education);