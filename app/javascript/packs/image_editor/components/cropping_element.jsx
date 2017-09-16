import React from 'react';
import ReactDOM from 'react-dom';
import Cropper from 'react-cropper';

export default class CroppingElement extends React.Component {
  _crop(){
    console.log('ttttt')
    // on initial load. Can't compare objects for equality so convert to strings and make comparison
    if(JSON.stringify(this.props.image.crop_data) === JSON.stringify({x: null, y: null, width: null, height: null})) {
      this.refs.cropper.setData({
        x: 0,
        y: 0,
        width: this.refs.cropper.cropper.canvasData.naturalWidth,
        height: this.refs.cropper.cropper.canvasData.naturalHeight
      })
      this.props.actions.updateCropData({x: 0, y: 0, width: this.refs.cropper.cropper.canvasData.naturalWidth, height: this.refs.cropper.cropper.canvasData.naturalHeight})
    } else {
      this.props.actions.updateCropData(this.refs.cropper.getData())
    }
    // image in dataUrl
    // console.log("GET DATA", this.refs.cropper.getData());
    // console.log("GET CONTAINER DATA", this.refs.cropper.getContainerData());
    // console.log("GET IMAGE DATA", this.refs.cropper.getImageData());
    // console.log("GET CANVAS DATA", this.refs.cropper.getCanvasData());
    // console.log("GET CROP BOX", this.refs.cropper.getCropBoxData());
  }
  componentDidMount() {
    console.log('mounting!')
    this._crop.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should')
    console.log(nextProps)
    if(nextProps.image.do_it === 'nope') {
      this.refs.cropper.setData({
        x: 0,
        y: 0,
        width: this.refs.cropper.cropper.canvasData.naturalWidth,
        height: this.refs.cropper.cropper.canvasData.naturalHeight
      })
      return false
    } else {
      return true
    }
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
        // aspectRatio={16 / 9}
        guides={false}
        crop={this._crop.bind(this)}
      />
    );
  }
}
