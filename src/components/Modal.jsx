import React from 'react';

const Modal = ({ children, setOpenModal }) => {
  return (
    <div className="modal is-active">
      <div
        className="modal-background"
        onClick={() => setOpenModal((state) => !state)}
      ></div>
      <div className="modal-content">
        <div className="box">{children}</div>
      </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );
};

export default Modal;
