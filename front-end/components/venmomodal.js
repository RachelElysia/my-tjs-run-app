"use strict";

import React, { useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from '../styles/Home.module.css'
import Fade from 'react-reveal/fade';

const close = <FontAwesomeIcon icon={faTimes} />


const Modal = ({showModal, setShowModal}) => {

  const modalRef = useRef();

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  return (
    <>
      {showModal ? (
        <div className={styles['modal-background']} onClick={closeModal} ref={modalRef}>
          <Fade bottom>
            <div className={styles['modal-wrapper']} showModal={showModal}>
              <div className={styles['modal-content']}>
                <h1>I love TJ's!</h1>
                <p>@Rachel-Perkins</p>
                <img src={'http://localhost:5000/img/venmoqr.jpg'} className={styles['modal-img']} alt='My Venmo Info' />
              </div>
              <button className={styles['close-modal-button']}
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}>
                {close}
              </button>
            </div>
          </Fade>
        </div>
      ) : null}
    </>
  );
};


export default Modal;