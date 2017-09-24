import React from 'react';
import ReactDOM from 'react-dom';
import Editor from "./editor.jsx";
import { Formik } from 'formik';
import Yup from 'yup';

const PageForm = ({editorState, page, actions, values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset}) => {
  return(
    <form onSubmit={handleSubmit}>
      <fieldset>
        <ol>
          <li className="input string">
            <label htmlFor="title">Page header</label>
            <input type="text" name="title" value={values.title} onChange={handleChange} />
          </li>
          <li className="input string">
            <label htmlFor="intro">Page introduction</label>
            <input type="text" name="intro" value="Sample" onChange={handleChange} />
            <p className='hint_text'></p>
          </li>
          <li className="input string">
            <label htmlFor="content">Page content</label>
            <Editor editorState={editorState} actions={actions}/>
            <p className='hint_text'></p>
          </li>
        </ol>
      </fieldset>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default Formik({
  mapPropsToValues: (props) => ({
    title: props.page.title
  }),
  handleSubmit: (values, { props, setErrors, setSubmitting }) => {
    // do stuff with your payload
    // e.preventDefault(), setSubmitting, setError(undefined) are
    // called before handleSubmit is. So you don't have to do repeat this.
    // handleSubmit will only be executed if form values pass validation (if you specify it).
    props.actions.setPageTitle(values.title)
  }
})(PageForm)
