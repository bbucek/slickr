import React from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

export default class NewImage extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }

    this.onClickUpload = this.onClickUpload.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onClickUpload() {
    this.props.actions.createImage(this.state.files[0].preview)
  }

  showCreateImage() {
    if(this.state.files.length === 1) {
      return (
        <div className="title_bar" id="title_bar">
          <div className="action_items">
            <span className="action_item"><a href="#" onClick={this.onClickUpload}>Create Image</a></span>
          </div>
        </div>
      )
    }
  }

  onDrop(files) {
    files.forEach((file)=> {
      const formData = new FormData();
      formData.append('image[attachment][]', file);
      this.props.actions.createImage(formData)
    });
  }

  render() {
    console.log(this.state.files)
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
        <aside>
          <h2>Accepted files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          {this.showCreateImage()}
        </aside>
      </section>
    );
  }
}
