import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  NOTE_ADD,
  NOTES_FETCH_SUCCESS,
  ADD_ENTRY
} from './types'

export const NoteAdd = ({ text, date, tagIDs }) => {
  // const { currentUser } = firebase.auth()
  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/notes`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/notes`)
      .push({ text, date, tagIDs })
      .then(() => {
        dispatch({ type: NOTE_ADD, payload: { text, date, tagIDs } })
        Actions.Today()
      })
  }
}

export const NotesFetch = () => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/notes`)
      .on('value', snapshot => {
        dispatch({ type: NOTES_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}

export const AddEntry = ({ text, date, tagIDs, type }) => {
  return (dispatch) => {
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/entries`)
    .push({ text, date, tagIDs, type })
    .then(() => {
      dispatch({ type: ADD_ENTRY, payload: { text, date, tagIDs, type } })
      Actions.Today()
    })
  }
}