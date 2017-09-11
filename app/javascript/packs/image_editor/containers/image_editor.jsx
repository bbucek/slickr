import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import CroppingElement from '../components/cropping_element.jsx';
import React, { Component } from 'react';
import * as ImageActions from '../actions'


const ImageEditor = ({store, image, actions}) => (
    <div>
      <div>Crop data: {image.crop_data.x}, {image.crop_data.y}, {image.crop_data.width}, {image.crop_data.height}</div>
      <div id='preview-crop'></div>
      <CroppingElement actions={actions} image={image}/>
    </div>
  );

ImageEditor.propTypes = {
  image: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  image: state.imageState
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ImageActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageEditor)
