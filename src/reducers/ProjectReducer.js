import {
  PROJECT_CLEAR,
  PROJECT_UPDATE_PROGRESS,
  PROJECT_SELECT,
  PROJECT_COMPLETE
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
    case PROJECT_COMPLETE:
      return state
    case PROJECT_SELECT:
      return action.payload
    default:
      return state
  }
}
