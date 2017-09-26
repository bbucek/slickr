import { combineReducers } from 'redux'
import pageState from './page_state'
import activeTab from './active_tab'
import modalIsOpen from './modal_is_open'
import loadedImages from './loaded_images'
import loadedBooks from './loaded_books'
import loadedAuthors from './loaded_authors'
import editorState from './editor_state'

const rootReducer = combineReducers ({
  pageState,
  activeTab,
  modalIsOpen,
  loadedImages,
  loadedBooks,
  loadedAuthors,
  editorState
})

export default rootReducer
