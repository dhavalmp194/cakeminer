// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import wallet from './wallet'
import minerData from './minerData'

const rootReducer = combineReducers({
  wallet,
  minerData
})

export default rootReducer
