import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  componentDidMount() {
    //getting the list of projects below
    this.props.getProjects();
  }
  render() {
    const { projects } = this.props.project;
    return (
      <div>
        <div className="projects">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Projects</h1>
                <br />
                <CreateProjectButton />
                <br />
                <hr />
                {//traversing through each item of 'projects' amd passing it as props to ProjectItem
                //a new ProjectItem is created for each project.
                projects.map(project => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//always 'import PropTypes from "prop-types"' before using propTypes below.
Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};
//mapping the state To Props
const mapStateToProps = state => ({
  //project is used here because it is same used in 'reducers/index.js'
  project: state.project
});
export default connect(
  mapStateToProps,
  { getProjects }
)(Dashboard);
