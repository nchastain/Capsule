import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  PROJECT_ADD,
  PROJECTS_FETCH_SUCCESS,
  PROJECT_CLEAR
} from './types'

export const ProjectAdd = ({ title }) => {
  // const { currentUser } = firebase.auth()
  let currentDate = new Date()
  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/projects`)
      .push({ title, time: currentDate.getTime(), hoursGoal: 100, hoursLogged: 0 })
      .then(() => {
        dispatch({ type: PROJECT_ADD })
        Actions.ProjectList({ type: 'reset' })
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

// export const EntrySave = ({ goal, description, time, uid }) => {
//   const { currentUser } = firebase.auth()

//   return (dispatch) => {
//     firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
//       .set({ goal, description, time })
//       .then(() => {
//         dispatch({ type: ENTRY_SAVE_SUCCESS })
//         Actions.EntryList({ type: 'reset' })
//       })
//   }
// }

// export const EntryDelete = ({ uid }) => {
//   const { currentUser } = firebase.auth()

//   return () => {
//     firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
//       .remove()
//       .then(() => {
//         Actions.EntryList({ type: 'reset' })
//       })
//   }
// }
