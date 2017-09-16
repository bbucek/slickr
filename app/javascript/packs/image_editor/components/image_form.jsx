import React from 'react';
import ReactDOM from 'react-dom';
import { Formik } from 'formik';
import Yup from 'yup';

const ImageForm = ({page, values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset}) => {
  var buttonText = JSON.stringify(values.crop_data) === JSON.stringify({x: null, y: null, width: null, height: null}) ? "Submit" : "Crop & Submit"
  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="alt_text">Alt Text</label>
      <input type="text" name="alt_text" value={values.alt_text} onChange={handleChange} />
      <button type="submit" disabled={isSubmitting}>{buttonText}</button>
    </form>
  )
}

export default Formik({
  mapPropsToValues: (props) => ({
    id: props.image.id,
    alt_text: props.image.data['alt_text'],
    crop_data: props.image.crop_data
  }),
  handleSubmit: (values, { props, setErrors, setSubmitting }) => {
    // do stuff with your payload
    // e.preventDefault(), setSubmitting, setError(undefined) are
    // called before handleSubmit is. So you don't have to do repeat this.
    // handleSubmit will only be executed if form values pass validation (if you specify it).

    props.actions.updateImage({
      id: values.id,
      data: {alt_text: values.alt_text}
    })
  }
})(ImageForm)
