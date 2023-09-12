import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPortal } from 'react-dom';
import styles from "../../styles/buttonPencil.module.css"
import { EditContactModal } from "./editContactModal";

export const ButtonPencil = ({ contact, index, onEdit }) => {
    const userContact = contact;
    const key = index;
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
        console.log("open")
    };
    const closeModal = (updatedContact) => {
        setShowModal(false);
        console.log("close")
        onEdit(updatedContact);
    };

    return (
        <div>
            <button className={`btn btn-light ${styles.buttonPencil}`} onClick={openModal}>
                <i className="fa-solid fa-pen-to-square"></i>
            </button>
            {showModal && createPortal(
                <EditContactModal onClose={closeModal} isOpen={showModal} contact={userContact} />,
                document.getElementById('modal-root')
            )}
        </div>
    );
};