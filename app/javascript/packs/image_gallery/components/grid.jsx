import React from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';

export default class Grid extends React.Component {
  constructor(props){
    super(props);

    this.onSelectImage = this.onSelectImage.bind(this);
  }

  onSelectImage (index, image) {
    if(image.isSelected === false)
      this.props.actions.addSelectedImage(image)
    else
      this.props.actions.removeSelectedImage(image.id)

    this.props.actions.toggleIsSelected(image.id)
  }

  render () {
    var images = this.props.images.map((i) => {
      var altClass = i.data.alt_text == "" ? "alt_text_missing" : ""
      i.build_for_gallery.customOverlay = (
        <div>
          <div style={captionStyle}>
            <div>{i.build_for_gallery.caption}</div>
            { i.build_for_gallery.hasOwnProperty('tags') && this.setCustomTags(i.build_for_gallery) }
          </div>
          <div className={altClass}></div>
        </div>
      );
      return i;
    });

    return (
      <div style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        border: "1px solid #ddd",
        overflow: "auto"
      }}>
        <Gallery
          images={images.map(function(a) {return a.build_for_gallery})}
          onSelectImage={this.onSelectImage}
          lightboxWidth={1536}
        />
      </div>
    );
  }
}

const captionStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  maxHeight: "240px",
  overflow: "hidden",
  position: "absolute",
  bottom: "0",
  width: "100%",
  color: "white",
  padding: "2px",
  fontSize: "90%"
};

const customTagStyle = {
  wordWrap: "break-word",
  display: "inline-block",
  backgroundColor: "white",
  height: "auto",
  fontSize: "75%",
  fontWeight: "600",
  lineHeight: "1",
  padding: ".2em .6em .3em",
  borderRadius: ".25em",
  color: "black",
  verticalAlign: "baseline",
  margin: "2px"
};

Grid.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      build_for_gallery: PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired,
        srcset: PropTypes.array,
        caption: PropTypes.string.isRequired,
        thumbnailWidth: PropTypes.number.isRequired,
        thumbnailHeight: PropTypes.number.isRequired,
        isSelected: PropTypes.bool.isRequired,
        editPath: PropTypes.string.isRequired
      })
    })
  ).isRequired
};
