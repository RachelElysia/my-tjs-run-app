"use strict";

import React, { useState, useEffect } from 'react';

const Modal = () => {
  const [isShown, setIsShown] = useState(false);

  const showModal = () => {
    setIsShown(true);
  };

  const closeModal = () => {
    setIsShown(false);
  };

  const dynammicModalClass = () => (isShown ? { display: 'block' } : '');

  useEffect(() => {
    if (!sessionStorage.popupModal) {
      const timer = setTimeout(() => {
        setIsShown(true);
        sessionStorage.popupModal = 1;
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  // return isShown ? <h3>Modal content</h3> : null;
  return isShown ? (
    <div className="modal" style={dynammicModalClass()} id="channelModal">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-light">Free Measure. Free Quote.</h5>

            <button
              onClick={closeModal}
              style={{ color: '#fff' }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div className="modal-body">
            <div className="row">
              <div className="col-6">
                <img src="image.jpg" alt="react-hooks" />
              </div>

              <div className="col-6">
                <p className="lead text-light">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae cumque, assumenda cupiditate
                  incidunt reiciendis earum
                </p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn-lg btn btn-primary">
              <span style={{ color: '#fff' }}>
                <i className="fa fa-phone mr-1 " />
                <a href="tel:01234567" style={{ color: '#fff' }}>
                  0123 4567{' '}
                </a>
              </span>
            </button>
            <button onClick={closeModal} type="button" className="btn btn-lg">
              No Thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;