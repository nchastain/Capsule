import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import EntryFormReducer from './EntryFormReducer'
import EntriesReducer from './EntriesReducer'
import ProjectsReducer from './ProjectsReducer'
import ProjectReducer from './ProjectReducer'

export default combineReducers({
  auth: AuthReducer,
  entryForm: EntryFormReducer,
  entries: EntriesReducer,
  projects: ProjectsReducer,
  project: ProjectReducer
})
