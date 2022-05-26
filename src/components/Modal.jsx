import React from 'react';

const Modal = ({ children, setOpenModal }) => {
  const closeModal = () => setOpenModal((state) => !state);

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-content">
        <div className="box">
          {children}

          <div className="has-text-centered">
            <button className="button is-info" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={closeModal}
      ></button>
    </div>
  );
};

export default Modal;
