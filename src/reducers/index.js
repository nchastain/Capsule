import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import EntryFormReducer from './EntryFormReducer'
import EntriesReducer from './EntriesReducer'

export default combineReducers({
  auth: AuthReducer,
  entryForm: EntryFormReducer,
  entries: EntriesReducer
})
