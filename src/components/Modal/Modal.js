import './Modal.scss';
import axios from 'axios';
import {Link} from 'react-router-dom';
import React, { useEffect } from 'react';
import $ from 'jquery';


function Modal({closeModal, modalPerson}){
    

    // useEffect(() => {
    //     $('.ui.modal').modal('show'); 
    // }, []);
    console.log(modalPerson)

    return (
        <div className='Modal'>
            <p>this is a modal :D </p>
            <img src={modalPerson.realPhoto}/>
            <p> Name: {modalPerson.name}</p>
            <p>Bio: {modalPerson.bio}</p>
            <p>Gender: {modalPerson.gender}</p>
            <p>Height: {modalPerson.height}</p>
            <p>Interests: {modalPerson.interests}</p>
            <button className='button-dislike' onClick={closeModal}>
                    <span class="material-symbols-outlined">close</span>
                </button>
        </div>
    );
}

export default Modal;