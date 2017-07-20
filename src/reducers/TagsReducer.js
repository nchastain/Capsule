import {
  TAGS_FETCH_SUCCESS,
  TAG_ADD
} from '../actions/types'

export default (state = {text: 'Example', id: 896}, action) => {
  switch (action.type) {
    case TAGS_FETCH_SUCCESS:
      return action.payload
    default:
      return state
  }
}
