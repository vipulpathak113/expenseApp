import React, { Component } from "react";
import Draggable from "react-draggable";
import ModalDialog from "react-bootstrap/ModalDialog";

class DraggableModalDialog extends React.Component {
  render() {
    return (
      <Draggable handle=".modalheader">
        <ModalDialog {...this.props} />
      </Draggable>
    );
  }
}

export default DraggableModalDialog;
