import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROEJCT } from "./types";

//updates a project if 'id' is also provided otherwise creates new object.
export const createProject = (project, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/project", project);
    history.push("/dashboard");
    //if you go on happy path the errors payload is set to empty, that works especially for updating an obejct.
    dispatch({
      type: GET_ERRORS,
      payLoad: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payLoad: err.response.data
    });
  }
};

//getting a list of all projects
export const getProjects = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/project/all");
  dispatch({
    type: GET_PROJECTS,
    payLoad: res.data
  });
};

//gets the single object by id, if found returns back the object othrewise navigates to '/dashboar'
export const getProject = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:8080/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payLoad: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

//delete a project by using the identifier and returns that identifier as payload.
export const deleteProject = id => async dispatch => {
  if (window.confirm("Are you sure? It is not reversible..")) {
    await axios.delete(`http://localhost:8080/api/project/${id}`);
    dispatch({
      type: DELETE_PROEJCT,
      payLoad: id
    });
  }
};
