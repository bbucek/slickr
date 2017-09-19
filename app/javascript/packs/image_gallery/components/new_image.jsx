import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

export default class NewImage extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }

    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    files.forEach((file)=> {
      const formData = new FormData();
      formData.append('image[attachment]', file);
      this.props.actions.createImage({
        formData: formData, file: file, upload: true
      })
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg, image/png"
            onDrop={this.onDrop}
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
            <p>Only *.jpeg and *.png images will be accepted</p>
          </Dropzone>
        </div>
      </section>
    );
  }
}
