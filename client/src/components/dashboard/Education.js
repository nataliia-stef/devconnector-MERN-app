import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profileActions';
import Moment from 'react-moment';

class Education extends Component {
  onDeleteHandler = educationID => {
    this.deleteEducation(educationID);
  };

  render() {
    const education = this.props.education.map(education => {
      let educationTo;
      if (education.to === null && !education.current) {
        educationTo = 'Not Provided';
      } else if (education.current) {
        educationTo = 'Present';
      } else {
        educationTo = <Moment format="YYYY/MM/DD">{education.to}</Moment>;
      }
      return (
        <tr key={education._id}>
          <td>{education.school}</td>
          <td>{education.degree}</td>
          <td>{education.fieldofstudy}</td>
          <td>
            <Moment format="YYYY/MM/DD">{education.from}</Moment> -{' '}
            {educationTo}
          </td>
          <td>
            <button
              onClick={() => this.onDeleteHandler(education._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field of Study</th>
              <th>Years</th>
              <th>{''}</th>
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
