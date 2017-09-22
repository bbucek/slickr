/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React from "react";
import ReactDOM from 'react-dom';
import ImagePickerModal from '../../components//content/image_picker_modal.jsx';

export default class BlockButton extends React.Component {
  constructor(props) {
    super();

    this.openImagePicker = this.openImagePicker.bind(this);
  }

  openImagePicker () {
    this.props.actions.toggleImagePicker()
  }

  render() {
    console.log(this.props.actions)
    return (
      <div>
        <button className={this.props.className} type="button" onClick={this.openImagePicker} title="Image Gallery">
          <svg className="sidemenu__button__icon" width="24" height="24" viewBox="0 0 24 24" >
            <path d="M18.222 6H5.778C4.8 6 4 6.6 4 7.333v9.334C4 17.4 4.8 18 5.778 18h12.444C19.2 18 20 17.4 20 16.667V7.333C20 6.6 19.2 6 18.222 6zm-4.084 4l-3 4.51L9 11.503 6 16h12l-3.862-6z" fill="currentColor" fillRule="evenodd"/>
          </svg>
        </button>
        <ImagePickerModal
          modalIsOpen={this.props.modalIsOpen}
          actions={this.props.actions}
        />
      </div>
    );
  }
}
