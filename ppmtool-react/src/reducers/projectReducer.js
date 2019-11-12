import { GET_PROJECTS, GET_PROJECT, DELETE_PROEJCT } from "../actions/types";

const initialState = {
  projects: [],
  project: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payLoad
      };
    case GET_PROJECT:
      return {
        ...state,
        project: action.payLoad
      };
    case DELETE_PROEJCT:
      //when a project is deleted it returns the 'projectIdentifier' as action.payLoad that will be used
      //to filter the list of projects to be shown.
      return {
        ...state,
        projects: state.projects.filter(
          project => project.projectIdentifier !== action.payLoad
        )
      };
    default:
      return state;
  }
}
