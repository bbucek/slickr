import React from 'react';
import ReactDOM from 'react-dom';

export default class TitleBarButtons extends React.Component {
  render(){
    return(
        <div className="action_items">
          <span className="action_item"><a onClick={this.props.savePage} href='#'>Save page</a></span>
          <span className="action_item"><a href='#'><svg className="svg-icon"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-draft"></use></svg>Create draft</a></span>
          <span className="action_item"><a href='#'><svg className="svg-icon"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-preview"></use></svg>Preview</a></span>
          <span className="action_item"><a href='#'><svg className="svg-icon"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-calendar"></use></svg>Schedule</a></span>
          <span className="action_item"><a href="/admin/pages/new"><svg className="svg-icon"><use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#svg-publish"></use></svg>Publish now</a></span>
        </div>
    )
  }
}


