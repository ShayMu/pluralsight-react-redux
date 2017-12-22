import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import * as courseActions from '../../actions/courseActions';

class CoursesPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      course: { title: "" }
    };

    this.onTitleChanged = this.onTitleChanged.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
  }

  onTitleChanged(event) {
    const course = this.state.course;
    course.title = event.target.value;
    this.setState({ course: course });
  }

  onClickSave() {
    this.props.createCourse(this.state.course);
  }

  courseRow(course, index) {
    return (
      <div key={index}> {course.title}</div>
      );
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <h2>Add Course</h2>
        <input
          type="text"
          onChange={this.onTitleChanged}
          value={this.state.course.title} />
        <input
          type="submit"
          value="Save"
          onClick={this.onClickSave} />

        <h2>Courses List</h2>
        {this.props.courses.map(this.courseRow)}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  createCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => { dispatch(courseActions.createCourse(course)); }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
