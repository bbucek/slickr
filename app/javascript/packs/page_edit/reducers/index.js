import { combineReducers } from 'redux'
import pageState from './page_state'
import activeTab from './active_tab'
import modalIsOpen from './modal_is_open'
import loadedImages from './loaded_images'
import editorState from './editor_state'
import schedulingActive from './scheduling_active'

const rootReducer = combineReducers ({
  pageState,
  activeTab,
  modalIsOpen,
  loadedImages,
  editorState,
  schedulingActive
})

export default rootReducer
