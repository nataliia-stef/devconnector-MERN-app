import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileActions';

class Experience extends Component {
  onDeleteHandler(experienceID) {
    //this.props.deleteExperience(experienceID);
    console.log('hello' + experienceID);
  }

  render() {
    const experience = this.props.experience.map(experience => {
      //check if the user provided the TO date
      let experienceTo;
      if (experience.to && !experience.current) {
        experienceTo = <Moment format="YYYY/MM/DD">{experience.to}</Moment>;
      } else if (experience.current) {
        experienceTo = 'Present';
      } else {
        experienceTo = 'Not Provided';
      }

      return (
        <tr key={experience._id}>
          <td>{experience.company}</td>
          <td>{experience.title}</td>
          <td>
            {experience.location !== '' ? experience.location : 'Not Provided'}
          </td>
          <td>
            <Moment format="YYYY/MM/DD">{experience.from}</Moment> -{' '}
            {experienceTo}
          </td>
          <td>
            <button
              //   onClick={this.onDeleteHandler.bind(this, experience._id)}
              onClick={() => this.onDeleteHandler(experience._id)}
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
        <h4 className="mb-4">Experience Credentials</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Location</th>
              <th>Years</th>
              <th>{''}</th>
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
