import { combineReducers } from 'redux'
import pageState from './page_state'
import activeTab from './active_tab'
import modalIsOpen from './modal_is_open'

const rootReducer = combineReducers ({
  pageState,
  activeTab,
  modalIsOpen
})

export default rootReducer
