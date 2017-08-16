import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  PROJECT_ADD,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_CLEAR,
  PROJECT_UPDATE_PROGRESS,
  PROJECT_UPDATE,
  PROJECT_SELECT,
  PROJECT_COMPLETE,
} from './types'

export const ProjectAdd = ({ title, tags, hasProgress, progressCurrent, progressTarget, progressUnits }) => {
  const { currentUser } = firebase.auth()
  let currentDate = new Date()
  let parsedProgressTarget = parseInt(progressTarget) || 0
  let parsedProgressCurrent = parseInt(progressCurrent) || 0
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/projects`)
      .push({ 
        title,
        tags,
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
  const { currentUser } = firebase.auth()
  firebase.database().ref(`/users/${currentUser.uid}/projects/${id}`)
  .update({ complete: status })
  return (dispatch) => {
    dispatch({ type: PROJECT_COMPLETE })
  }
}

export const ProjectUpdateProgress = (id, progress) => {
  let formattedProgress = parseInt(progress)
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/projects/${id}/progressCurrent`)
    .transaction((data) => data + formattedProgress)
    .then(() => {
      dispatch({ type: PROJECT_UPDATE_PROGRESS })
    })
  }
}

export const ProjectUpdate = (id, field, val) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/projects/${id}`)
    .update({[field]: val})
    return (dispatch) => {
      dispatch ({ type: PROJECT_UPDATE })
    }
  }
}

export const ProjectDelete = (id) => {
  const { currentUser } = firebase.auth()
  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/projects/${id}`)  
      .remove()
      .then(() => {
        Actions.ProjectList()
      })
  }
}

export const ProjectsFetch = () => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/projects`)
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
