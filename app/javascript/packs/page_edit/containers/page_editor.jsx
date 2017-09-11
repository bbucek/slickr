import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Editor from "../components/editor.jsx";
import PageForm from "../components/page_form.jsx";
import PageLog from "../components/page_log.jsx";
import PublishingComponent from "../components/publishing.jsx";
import * as PageActions from '../actions'

const changeTab = function(tab, actions) {
  actions.changeTab(tab)
}

const MyEditor = ({store, page, active_tab, actions}) => (
      <div>
        <div id="resource_tabs">
          <a href='#' onClick={changeTab.bind(this, 'content', actions)} className={active_tab == 'content' ? 'active' : '' }>Page content</a>
          <a href='#' onClick={changeTab.bind(this, 'meta', actions)} className={active_tab == 'meta' ? 'active' : '' }>Page meta</a>
          <a href='#' onClick={changeTab.bind(this, 'social', actions)} className={active_tab == 'social' ? 'active' : '' }>Page social</a>
        </div>
        <div id='collection_selection'>
          { active_tab == 'content' ?
             <div>
              <div>{page.title}</div>
              <PublishingComponent actions={actions} page={page} />
              <PageLog actions={actions} changes={page.changes} />
              <PageForm actions={actions} page={page} />
              <Editor />
              </div>
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
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  page: state.pageState,
  active_tab: state.activeTab
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PageActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEditor)

