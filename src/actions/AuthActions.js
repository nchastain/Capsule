import firebase from 'firebase'
import { Actions } from 'react-native-router-flux'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from './types'

export function auth (email, pw) {
  return firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function saveUser (user) {
  return firebaseRef.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export var resetPassword = (password) => {
  var user = firebase.auth().currentUser

  return user.updatePassword(password).then(function () {
    // console.log('updated password')
  }, function(error) {
    // console.log('error updating password')
  })
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log(error)

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch))
      })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER })
    Actions.Login()
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })

  Actions.Today()
}
