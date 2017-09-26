import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContentTab from "../components/content/content_tab.jsx";
import * as PageActions from '../actions'
import cx from 'classnames';

const changeTab = function(tab, actions) {
  actions.changeTab(tab)
}

const tabClasses = (tabName, active_tab) => {
  let tab = {}
  tab[tabName] = true
  tab['active'] = active_tab == tabName
  tab['links'] = true
  return cx(tab)
}

const MyEditor = ({store, page, active_tab, actions, modalIsOpen, editorState}) => (
      <div>
        <div id="resource_tabs">
          <a href='#' onClick={changeTab.bind(this, 'content', actions)} className={tabClasses('content', active_tab)}>Page content</a>
          <a href='#' onClick={changeTab.bind(this, 'meta', actions)} className={tabClasses('meta', active_tab)}>Page meta</a>
          <a href='#' onClick={changeTab.bind(this, 'social', actions)} className={tabClasses('social', active_tab)}>Page social</a>
        </div>
        <div id='collection_selection'>
          { active_tab == 'content' ?
            <ContentTab page={page} actions={actions} editorState={editorState} />
          : null }
          { active_tab == 'meta' ?
            <div>Meta editor</div>
          : null}
          { active_tab == 'social' ?
            <div>Social editor</div>
          : null}
        </div>
      </div>
    )

MyEditor.propTypes = {
  page: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  loadedImages: PropTypes.array.isRequired,
  loadedBooks: PropTypes.array.isRequired,
  loadedAuthors: PropTypes.array.isRequired,
  editorState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  page: state.pageState,
  active_tab: state.activeTab,
  modalIsOpen: state.modalIsOpen,
  loadedImages: state.loadedImages,
  loadedBooks: state.loadedBooks,
  loadedAuthors: state.loadedAuthors,
  editorState: state.editorState
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PageActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEditor)
