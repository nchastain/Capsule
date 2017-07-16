import {
  ENTRY_UPDATE,
  ENTRY_ADD,
  ENTRY_SAVE_SUCCESS,
  ENTRY_CLEAR
} from '../actions/types'

const INITIAL_STATE = {
  goal: '',
  description: '',
  time: 0,
  date: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ENTRY_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value }
    case ENTRY_ADD:
      return INITIAL_STATE
    case ENTRY_SAVE_SUCCESS:
      return INITIAL_STATE
    case ENTRY_CLEAR:
      return INITIAL_STATE
    default:
      return state
  }
}
