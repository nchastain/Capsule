import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  DAYS_FETCH_SUCCESS,
  DAY_ENTRY_ADD
} from './types'
import moment from 'moment'

export const DayEntryAdd = (entryID, day) => {
  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/days/${day}/entries`).child(entryID)
    .set(true)
  }
}

export const DaysFetch = () => {
  // const { currentUser } = firebase.auth()
  return (dispatch) => {
    // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/days`)
      .on('value', snapshot => {
        dispatch({ type: DAYS_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}