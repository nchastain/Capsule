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

export const ProjectAdd = ({ title, type, hasProgress, progressCurrent, progressTarget, progressUnits }) => {
  // const { currentUser } = firebase.auth()
  let currentDate = new Date()
  let parsedProgressTarget = parseInt(progressTarget) || 0
  let parsedProgressCurrent = parseInt(progressCurrent) || 0
  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/projects`)
      .push({ 
        title,
        type,
        time: currentDate.getTime(),
        progressCurrent: parsedProgressCurrent,
        progressTarget: parsedProgressTarget,
        progressUnits,
        hasProgress,
        complete: false
      })
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

export const ProjectComplete = (id, status) => {
  firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/projects/${id}`)
  .update({ complete: status })
  return (dispatch) => {
    dispatch({ type: PROJECT_COMPLETE })
  }
}

export const ProjectUpdateProgress = (id, progress) => {
  let formattedProgress = parseInt(progress)
  console.log(id, progress)
  return (dispatch) => {
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/projects/${id}/progressCurrent`)
    .transaction((data) => data + formattedProgress)
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
