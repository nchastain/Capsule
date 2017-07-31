import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  PROJECT_ADD,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_CLEAR,
  PROJECT_UPDATE_PROGRESS,
  PROJECT_SELECT,
  PROJECT_COMPLETE
} from './types'

export const ProjectAdd = ({ title, hoursGoal, timed, type }) => {
  // const { currentUser } = firebase.auth()
  let currentDate = new Date()
  let hoursGoalInt = timed ? parseInt(hoursGoal) : null
  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/projects`)
      .push({ title, time: currentDate.getTime(), hoursGoal: hoursGoalInt, timed, type, hoursLogged: 0, complete: false })
      .then(() => {
        dispatch({ type: PROJECT_ADD })
        Actions.ProjectList({ type: 'reset' })
      })
  }
}

export const ProjectSelect = (project) => {
  return (dispatch) => {
    dispatch({ type: PROJECT_SELECT, payload: project })
    Actions.ProjectDetails({ title: project.title })
  }
}

export const ProjectComplete = (id) => {
  firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/projects/${id}`)
  .update({ complete: true })
  return (dispatch) => {
    dispatch({ type: PROJECT_COMPLETE })
  }
}

export const ProjectUpdateProgress = (id, minutes) => {
  let formattedMinutes = parseInt(minutes)
  return (dispatch) => {
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/projects/${id}/hoursLogged`)
    .transaction((data) => data + formattedMinutes / 60)
    .then(() => {
      dispatch({ type: PROJECT_UPDATE_PROGRESS })
    })
  }
}

export const ProjectsFetch = () => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/projects`)
      .on('value', snapshot => {
        dispatch({ type: PROJECTS_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}

export const ProjectClear = () => {
  return (dispatch) => {
    dispatch({ type: PROJECT_CLEAR })
  }
}
