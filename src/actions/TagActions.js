import { Actions } from 'react-native-router-flux'
import {
  TAG_SELECT,
  TAG_ADD,
  TAGS_FETCH_SUCCESS
} from './types'
import firebase from 'firebase'

export const TagSelect = (tag) => {
  return (dispatch) => {
    dispatch({ type: TAG_SELECT, payload: tag })
    Actions.TagDetails({title: `#${tag.text}`})
  }
}

export const AddTag = (newTagObj) => {
  return (dispatch) => {
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/tags`)
      .push(newTagObj)
  }
}

export const TagsFetch = () => {
  // const { currentUser } = firebase.auth()
  return (dispatch) => {
  // firebase.database().ref(`/users/${currentUser.uid}/entries`)
    firebase.database().ref(`/users/dqL31pcmiIZFEoDwd03dIJVy0Ls1/tags`)
      .on('value', snapshot => {
        dispatch({ type: TAGS_FETCH_SUCCESS, payload: snapshot.val() })
      })
  }
}
