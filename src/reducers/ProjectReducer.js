import {
  PROJECT_CLEAR
} from '../actions/types'

const INITIAL_STATE = {
  title: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}