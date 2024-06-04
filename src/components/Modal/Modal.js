import './Modal.scss';
import React, { useEffect } from 'react';


function Modal({closeModal, modalPerson, messageCount}){

    useEffect(() => {
        console.log(messageCount);
      }, [messageCount]);

      const opacity = messageCount[modalPerson.stringId] ? Math.min(1, messageCount[modalPerson.stringId] * 0.1) : 0;
 


    return (
        <>
        <div className='modal-backdrop'></div>
        <div className='Modal'>
            <div className='Modal-content'>
        <img className='Modal-img'src={modalPerson.realPhoto} style={{ opacity }}/>
           <p> Name: {modalPerson.name}</p>
           <p>Bio: {modalPerson.bio}</p>
           <p>Gender: {modalPerson.gender}</p>
           <p>Height: {modalPerson.height}</p>
           <p>Interests: {modalPerson.interests}</p>


            <button className='close-button' onClick={closeModal}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                </div>
        </div></>
    );
}

export default Modal;