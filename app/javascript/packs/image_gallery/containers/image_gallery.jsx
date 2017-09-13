import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../components/grid.jsx';
import Buttons from '../components/buttons.jsx';
import React, { Component } from 'react';
import * as ImageActions from '../actions'

const ImageGallery = ({store, images, selectedImages, actions}) => (
    <div>
      <Grid images={images} actions={actions}/>
      <Buttons selectedImages={selectedImages} />
    </div>
  );

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  images: state.loadedImages,
  selectedImages: state.selectedImages
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ImageActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageGallery)
