import {
  TAG_SELECT
} from '../actions/types'

export default (state = '', action) => {
  switch (action.type) {
    case TAG_SELECT:
      return action.payload
    default:
      return state
  }
}
