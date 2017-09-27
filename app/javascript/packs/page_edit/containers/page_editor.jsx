import draftToHtml from 'draftjs-to-html';
import {editorStateToJSON} from "megadraft";
import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PageForm from '../components/page_form.jsx'
import TitleBarButtons from '../components/title_bar_buttons.jsx'
import * as PageActions from '../actions'

let _csrf_param = () => { return document.getElementsByName("csrf-param")[0].content }
let _csrf_token = () => { return document.getElementsByName("csrf-token")[0].content }

// const submitPreview = (page, editorState) => {
//
//   const form = document.createElement("form");
//   form.setAttribute('action', page.admin_preview_page_path)
//   form.setAttribute('method', "POST")
//   form.setAttribute('target', "_blank")
//   form.style.display = 'none';
//   const content = editorStateToJSON(editorState)
//   document.body.appendChild(form);
//   const data = {
//     title: page.title,
//     page_intro: page.page_intro,
//     content: draftToHtml(JSON.parse(content))
//   }
//   const input = document.createElement("textarea");
//   input.name = 'page'
//   input.value = JSON.stringify(data)
//   const csrf_input = document.createElement('input')
//   csrf_input.type = 'hidden'
//   csrf_input.name = _csrf_param()
//   csrf_input.value = _csrf_token()
//   form.appendChild(input);
//   form.appendChild(csrf_input);
//   form.submit();
//   document.body.removeChild(form);
// }

const MyEditor = ({schedulingActive, store, page, active_tab, actions, modalIsOpen, editorState}) => {
  return(
    <div id='page_edit_content_grid'>
      <div className="title_bar" id="title_bar">
        <div id="titlebar_left">
          <span className="breadcrumb">
            <a href="/admin">Admin</a>
            <span className="breadcrumb_sep"> / </span>
            <a href="/admin/pages">Pages</a>
            <span className="breadcrumb_sep"> / </span>
            <a href={page.admin_page_path}>{page.title}</a>
          </span>
          <h2 id="page_title">Edit Page</h2>
        </div>
        <div id="titlebar_right">
          <TitleBarButtons page={page} editorState={editorState} actions={actions} />
        </div>
      </div>
      <PageForm page={page} actions={actions} schedulingActive={schedulingActive} editorState={editorState} modalIsOpen={modalIsOpen} active_tab={active_tab} />
    </div>
  )
}

MyEditor.propTypes = {
  page: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  loadedImages: PropTypes.array.isRequired,
  editorState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  page: state.pageState,
  active_tab: state.activeTab,
  modalIsOpen: state.modalIsOpen,
  loadedImages: state.loadedImages,
  editorState: state.editorState,
  schedulingActive: state.schedulingActive
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PageActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MyEditor);
