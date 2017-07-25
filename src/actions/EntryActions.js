import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  ENTRY_UPDATE,
  ENTRY_ADD,
  ENTRIES_FETCH_SUCCESS,
  ENTRY_SAVE_SUCCESS,
  ENTRY_CLEAR
} from './types'

export const EntryUpdate = (entry, location) => {
  return (dispatch) => {
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/entries/${entry.uid}`)
      .set(entry)
      .then(() => {
        dispatch({ type: ENTRY_SAVE_SUCCESS })
        location === 'today' ? Actions.Today({ type: 'reset' }) : Actions.EntryList({ type: 'reset'})
      })
  }
}

export const EntryAdd = ({ description, date, seconds, projectID }) => {
  // const { currentUser } = firebase.auth()
  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/entries`)
      .push({ description, date, seconds, projectID })
      .then(() => {
        dispatch({ type: ENTRY_ADD })
        Actions.Today({ type: 'reset' })
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

export const EntrySave = ({ description, seconds, uid, projectID }) => {
  // const { currentUser } = firebase.auth()

  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/entries/${uid}`)  
      .set({ description, seconds, projectID })
      .then(() => {
        dispatch({ type: ENTRY_SAVE_SUCCESS })
        Actions.Today({ type: 'reset' })
      })
  }
}

export const EntryDelete = ({ uid }, location) => {
  // const { currentUser } = firebase.auth()

  return () => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/entries/${uid}`)  
      .remove()
      .then(() => {
        location === 'today' ? Actions.Today({ type: 'reset' }) : Actions.EntryList({ type: 'reset'})
      })
  }
}
