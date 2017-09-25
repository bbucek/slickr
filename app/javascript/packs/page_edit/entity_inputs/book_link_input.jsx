import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'react-select';

export default class BookLinkInput extends React.Component {
  constructor(props) {
    super(props);
    this.onPageChange = this.onPageChange.bind(this);
    // load pages from somewhere
    this.pages = [
      { url: "/home", title: "Home"},
      { url: "/about", title: "About"},
      { url: "/my/subpage", title: "Subpage"}
    ]
  }

  onPageChange(event) {
    const url = event.target.value;
    this.props.setEntity({url});
    this.props.cancelEntity();
    // Force blur to work around Firefox's NS_ERROR_FAILURE
    event.target.blur();
  }

  render() {
    return (
      <Select
        name="form-field-name"
        value="Home"
        options={this.pages}
      />
    );
  }
}
