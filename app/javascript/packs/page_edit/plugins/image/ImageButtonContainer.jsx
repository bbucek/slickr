import React from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PageActions from '../../actions'
import cx from 'classnames';
import store from '../../../page_edit.jsx'
import ImageButton from "./ImageButton.jsx";

const ImageButtonContainer = ({store, modalIsOpen, actions}) => (
      <div>
        <ImageButton modalIsOpen={modalIsOpen}
                     actions={actions}
        />
      </div>
    )

ImageButtonContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  modalIsOpen: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  active_tab: state.activeTab,
  modalIsOpen: state.modalIsOpen
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(PageActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageButtonContainer)
