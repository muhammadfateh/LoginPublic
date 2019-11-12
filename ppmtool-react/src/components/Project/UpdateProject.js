import React, { Component } from "react";
import { getProject, createProject } from "../../actions/projectActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class UpdateProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      projectName: "",
      projectIdentifier: "",
      projectDescription: "",
      startDate: "",
      endDate: "",
      errors: {}
    };
  }
  //when a component recieves the props, it can be new or updated. On new load this hook is loaded after 'componentDidMount'
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    //destructuring the object of project
    const {
      id,
      projectName,
      projectIdentifier,
      projectDescription,
      startDate,
      endDate
    } = nextProps.project;

    //setting the state values to update form fields.
    this.setState({
      id,
      projectName,
      projectIdentifier,
      projectDescription,
      startDate,
      endDate
    });
  }

  //when a new component is mounted/loaded this lifecycle hook is loaded automaticaly
  componentDidMount() {
    //passing the id of a specific object which has been used in url path.
    const { id } = this.props.match.params;
    this.props.getProject(id, this.props.history);
  }

  //adding the changeHandler for all textfields to change their values accordingly. Arrow function is used
  //for the sake of avoiding extra statement in constructor.
  onChangeFields = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  //updating the object using the values of state, and take care about all validations.
  onSubmitHandler = e => {
    e.preventDefault();
    const updatedProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      projectDescription: this.state.projectDescription,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };

    console.log(updatedProject);

    this.props.createProject(updatedProject, this.props.history);
  };
  render() {
    //getting the error object from state
    const { errors } = this.state;
    console.log(errors);

    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Update Project form</h5>
              <hr />
              <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName
                    })}
                    placeholder="Project Name"
                    name="projectName"
                    value={
                      //this is the value of our state object
                      this.state.projectName
                    }
                    onChange={
                      //whenever their is change in value handler method is called.
                      this.onChangeFields
                    }
                  />
                  {/*Below error will be shown only if ProjectName error exists.*/}
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                    disabled
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectDescription
                    })}
                    placeholder="Project Description"
                    name="projectDescription"
                    value={this.state.projectDescription}
                    onChange={this.onChangeFields}
                  ></textarea>
                  {errors.projectDescription && (
                    <div className="invalid-feedback">
                      {errors.projectDescription}
                    </div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.onChangeFields}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.onChangeFields}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//mapping state to props
const mapStateToProps = state => ({
  project: state.project.project,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getProject, createProject }
)(UpdateProject);
