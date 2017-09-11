import { combineReducers } from 'redux'
import pageState from './page_state'
import activeTab from './active_tab'

const rootReducer = combineReducers ({
  pageState,
  activeTab
})

export default rootReducer
