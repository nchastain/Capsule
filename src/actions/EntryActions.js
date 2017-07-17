import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  ENTRY_UPDATE,
  ENTRY_ADD,
  ENTRIES_FETCH_SUCCESS,
  ENTRY_SAVE_SUCCESS,
  ENTRY_CLEAR
} from './types'

export const EntryUpdate = ({ prop, value }) => {
  return {
    type: ENTRY_UPDATE,
    payload: { prop, value }
  }
}

export const EntryAdd = ({ goal, description, date, time }) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries`)
      .push({ goal, description, date, time })
      .then(() => {
        dispatch({ type: ENTRY_ADD })
        Actions.EntryList({ type: 'reset' })
      })
  }
}

export const EntryClear = () => {
  return (dispatch) => {
    dispatch({ type: ENTRY_CLEAR })
  }
}

export const EntriesFetch = () => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/entries`)
      .on('value', snapshot => {
        dispatch({ type: ENTRIES_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}

export const EntrySave = ({ goal, description, time, uid }) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
      .set({ goal, description, time })
      .then(() => {
        dispatch({ type: ENTRY_SAVE_SUCCESS })
        Actions.EntryList({ type: 'reset' })
      })
  }
}

export const EntryDelete = ({ uid }) => {
  const { currentUser } = firebase.auth()

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
      .remove()
      .then(() => {
        Actions.EntryList({ type: 'reset' })
      })
  }
}
