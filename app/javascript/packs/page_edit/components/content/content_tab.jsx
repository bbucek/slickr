import React from 'react';
import ReactDOM from 'react-dom';
import PageForm from "./page_form.jsx";
import Editor from "./editor.jsx";

export default class ContentTab extends React.Component {
  render() {
    const page = this.props.page
    const actions = this.props.actions
    return (
        <div>
          <PageForm actions={actions} page={page} />
          <Editor />
        </div>
      );
    }
}

