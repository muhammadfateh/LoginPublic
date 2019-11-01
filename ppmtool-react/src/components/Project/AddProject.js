import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";

class AddProject extends Component {
  constructor(props) {
    super(props);

    //these are the state obejct which we are going to define now for further usage.
    this.state = {
      projectName: "",
      projectIdentifier: "",
      projectDescription: "",
      endDate: "",
      startDate: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    //when an object recieve new props which are the errors on submission in our case,
    //this method save those errors in 'errors' of our state
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handler = e => {
    //it will be used just to update the value of state object in order to update he control values,
    //because each control is associated with state objects. They can't be directly changed.
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    var addProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      projectDescription: this.state.projectDescription,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    };
    this.props.createProject(addProject, this.props.history);
  };

  render() {
    //getting the error object from state.
    const { errors } = this.state;
    /*the format of code is so simple, each input field has been validated using is-invalid field
    and if their is any error in 'errors' object for specific form control it will display that speicific 
    message for each form control. I am not goint to add description before each control.

    I have just added details of one control 'VALIDATIONS', 'HANDLER' and 'PROPS'
    */
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Create / Edit Project form
                </h5>
                <hr />
                <form onSubmit={this.submitHandler}>
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
                        this.handler
                      }
                    />
                    {/*Below error will be shown only if ProjectName error exists.*/}
                    {errors.projectName && (
                      <div className="invalid-feedback">
                        {errors.projectName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        /*is-invalid class will be used only if their is ProjectIdentifier error in responseEntity we got. */
                        "is-invalid": errors.projectIdentifier
                      })}
                      placeholder="Unique Project ID"
                      name="projectIdentifier"
                      value={this.state.projectIdentifier}
                      onChange={this.handler}
                    />
                    {errors.projectIdentifier && (
                      <div className="invalid-feedback">
                        {errors.projectIdentifier}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.projectDescription
                      })}
                      placeholder="Project Description"
                      name="projectDescription"
                      value={this.state.projectDescription}
                      onChange={this.handler}
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
                      name="startDate"
                      value={this.state.startDate}
                      onChange={this.handler}
                    />
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="endDate"
                      value={this.state.endDate}
                      onChange={this.handler}
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
      </div>
    );
  }
}
AddProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProject }
)(AddProject);
