import React from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-cropper';

export default class CroppingElement extends React.Component {
  _crop(){
    this.props.actions.updateCropData(this.refs.cropper.getData())
    // image in dataUrl
    // console.log("GET DATA", this.refs.cropper.getData());
    // console.log("GET CONTAINER DATA", this.refs.cropper.getContainerData());
    // console.log("GET IMAGE DATA", this.refs.cropper.getImageData());
    // console.log("GET CANVAS DATA", this.refs.cropper.getCanvasData());
    // console.log("GET CROP BOX", this.refs.cropper.getCropBoxData());
  }
  componentDidMount() {
    this._crop.bind(this)
  }
  render() {
    return (
      <Cropper
        ref='cropper'
        src={this.props.image.attachment.url}
        style={{height: 400, width: '50%'}}
        viewMode={2}
        preview="div#preview-crop"
        // Cropper.js options
        aspectRatio={16 / 9}
        guides={false}
        crop={this._crop.bind(this)} />
      );
    }
}


