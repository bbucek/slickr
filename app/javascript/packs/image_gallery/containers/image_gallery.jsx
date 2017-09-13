import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Grid from '../components/grid.jsx';
import React, { Component } from 'react';

const ImageGallery = ({store, images, actions}) => (
    <div>
      <Grid images={images}/>
    </div>
  );

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  images: state.loadedImages
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageGallery)
