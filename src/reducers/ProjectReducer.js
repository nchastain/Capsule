import {
  PROJECT_CLEAR,
  PROJECT_UPDATE_PROGRESS
} from '../actions/types'

const INITIAL_STATE = {
  title: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROJECT_CLEAR:
      return INITIAL_STATE
    case PROJECT_UPDATE_PROGRESS:
      return state
    default:
      return state
  }
}
