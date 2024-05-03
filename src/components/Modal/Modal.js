import './Modal.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';
import React, { useEffect,useState } from 'react';
import $ from 'jquery';


function Modal({closeModal, modalPerson, messageCount}){
    // useEffect(() => {
    //     $('.ui.modal').modal('show'); 
    // }, []);
    console.log(modalPerson)

    useEffect(() => {
        console.log(messageCount);
      }, [messageCount]);

      const opacity = messageCount[modalPerson.stringId] ? Math.min(1, messageCount[modalPerson.stringId] * 0.1) : 0;
 


    return (
        <div className='Modal'>
            <div className='Modal-content'>
        <img src={modalPerson.realPhoto} style={{ opacity }}/>
           <p> Name: {modalPerson.name}</p>
           <p>Bio: {modalPerson.bio}</p>
           <p>Gender: {modalPerson.gender}</p>
           <p>Height: {modalPerson.height}</p>
           <p>Interests: {modalPerson.interests}</p>


            <button className='button-dislike' onClick={closeModal}>
                    <span class="material-symbols-outlined">close</span>
                </button>
                </div>
        </div>
    );
}

export default Modal;