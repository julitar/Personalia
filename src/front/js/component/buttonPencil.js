import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/buttonPencil.module.css"

export const ButtonPencil = ({ contact, index }) => {
    const userContact = contact;
    const key = index;
    return (
        <button className={`btn btn-light ${styles.buttonPencil}`}>
            <i className="fa-solid fa-pen-to-square"></i>
        </button>
    );
};