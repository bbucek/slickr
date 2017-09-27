import React from 'react';
import PropTypes from 'prop-types'
import ContentTab from "./content/content_tab.jsx";
import MetaTab from "./meta/meta_tab.jsx";
import SocialTab from "./social/social_tab.jsx";
import PublishingTab from "./publishing/publishing_tab.jsx";
import {editorStateFromRaw, editorStateToJSON} from "megadraft";
import { Formik } from 'formik';
import Yup from 'yup';
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


const PageForm = ({schedulingActive, active_tab, editorState, page, actions, values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset}) => {
  return(
    <form id='page_content_form' onSubmit={handleSubmit}>
      <div id="resource_tabs">
        <a href='#' onClick={changeTab.bind(this, 'content', actions)} className={tabClasses('content', active_tab)}>Page content</a>
        <a href='#' onClick={changeTab.bind(this, 'meta', actions)} className={tabClasses('meta', active_tab)}>SEO</a>
        <a href='#' onClick={changeTab.bind(this, 'social', actions)} className={tabClasses('social', active_tab)}>Social media</a>
        <a href='#' onClick={changeTab.bind(this, 'publishing', actions)} className={tabClasses('publishing', active_tab)}>Page publishing</a>
      </div>
      <div className='page_editing_area' id='collection_selection'>
        { active_tab == 'content' ?
          <ContentTab page={page} actions={actions} values={values} handleChange={handleChange.bind(this)} editorState={editorState} />
        : null }
        { active_tab == 'meta' ?
          <MetaTab values={values} handleChange={handleChange.bind(this)} />
        : null}
        { active_tab == 'social' ?
          <SocialTab values={values} handleChange={handleChange.bind(this)} />
        : null}
        { active_tab == 'publishing' ?
          <PublishingTab page={page} actions={actions} values={values} schedulingActive={schedulingActive} handleChange={handleChange.bind(this)} />
        : null}
      </div>
    </form>
  )
}

export default Formik({
  mapPropsToValues: (props) => ({
    title: props.page.title,
    page_intro: props.page.page_intro,
    meta_title: props.page.meta_title,
    meta_description: props.page.meta_description
  }),
  handleSubmit: (values, { props, setErrors, setSubmitting }) => {
    // do stuff with your payload
    // e.preventDefault(), setSubmitting, setError(undefined) are
    // called before handleSubmit is. So you don't have to do repeat this.
    // handleSubmit will only be executed if form values pass validation (if you specify it).
    const content = editorStateToJSON(props.editorState)
    props.actions.updatePageContent(Object.assign({}, {content: editorStateToJSON(props.editorState)}, values))
  }
})(PageForm)
