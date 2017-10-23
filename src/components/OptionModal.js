import React, { Component } from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => {
  return (
    <Modal
      isOpen={!!props.selectedOption}
      onRequestClose={props.handleCloseModal}
      contentLabel="Selected Option"
      closeTimeoutMS={200}
      className="modal"
    >
      <h3 className="modal__title">Your answer is...</h3>
      {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
      <button className="button" onClick={props.handleCloseModal}>Fine</button>
    </Modal>
  );
};

export default OptionModal;
