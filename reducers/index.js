import { combineReducers } from 'redux'

import preferences from './preferences'
import routes from './routes'

export default combineReducers({ preferences, routes })