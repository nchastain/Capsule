import { Actions } from 'react-native-router-flux'
import {
  TAG_SELECT
} from './types'

export const TagSelect = (tag) => {
  return (dispatch) => {
    dispatch({ type: TAG_SELECT, payload: tag })
    Actions.TagDetails({ title: tag })
  }
}
