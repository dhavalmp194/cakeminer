// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import wallet from './wallet'
import minerData from './minerData'
import layout from './layout'


const rootReducer = combineReducers({
  wallet,
  minerData,
  layout
})

export default rootReducer
