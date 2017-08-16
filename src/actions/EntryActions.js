import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  ADD_ENTRY,
  ENTRY_UPDATE,
  ENTRY_ADD,
  ENTRIES_FETCH_SUCCESS,
  ENTRY_SAVE_SUCCESS,
  ENTRY_CLEAR
} from './types'
import { DayEntryAdd } from './DayActions'
import moment from 'moment'

export const EntryUpdate = (entry, location) => {
  const { currentUser } = firebase.auth()
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${entry.uid}`)
      .set(entry)
      .then(() => {
        dispatch({ type: ENTRY_SAVE_SUCCESS })
        if (location !== 'no-redirect') {
          location === 'today' ? Actions.Today({ type: 'reset' }) : Actions.EntryList({ type: 'reset'})
        }
      })
  }
}

export const AddEntry = ({ text, tags, description, date, type, projectID, addedProgress}, noteID) => {
  let actionObj = { type: ADD_ENTRY, payload: { text, tags, description, date, type } }
  if (projectID) actionObj.payload.projectID = projectID
  if (addedProgress) actionObj.payload.addedProgress = addedProgress
  let entryObj = actionObj.payload
  const { currentUser } = firebase.auth()
  let newRef = firebase.database().ref(`/users/${currentUser.uid}/entries/${noteID}`)
  return (dispatch) => {
    newRef.set(entryObj)
    .then(() => {
      dispatch(actionObj)
      Actions.Today({activeDay: moment.unix(date)})
    })
  }
}

export const EntryClear = () => {
  return (dispatch) => {
    dispatch({ type: ENTRY_CLEAR })
  }
}

export const EntriesFetch = () => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries`)
      .on('value', snapshot => {
        dispatch({ type: ENTRIES_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}

export const EntrySave = ({ description, seconds, uid, projectID }) => {
  const { currentUser } = firebase.auth()

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)  
      .set({ description, seconds, projectID })
      .then(() => {
        dispatch({ type: ENTRY_SAVE_SUCCESS })
        Actions.Today({ type: 'reset' })
      })
  }
}

export const EntryDelete = ({ uid }, location) => {
  const { currentUser } = firebase.auth()

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/entries/${uid}`)  
      .remove()
      .then(() => {
        location === 'today' ? Actions.Today({ type: 'reset' }) : location ? Actions.EntryList({ type: 'reset'}) : null
      })
  }
}
