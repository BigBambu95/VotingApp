import React from 'react';


const Modal = ({ children, isShow, toggleModal }) => {

        if(!isShow) return null;

        return(
            <div className="modal-window">
                <div className="modal-window__body">
                    <div className="modal-window__body__text">{children}</div>
                    <button className="btn" onClick={() => toggleModal()}>Ок</button>
                </div>
                <div className="modal-window__overlay" onClick={toggleModal}></div>
            </div>
        )
};


export default Modal;