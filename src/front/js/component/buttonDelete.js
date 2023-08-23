import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/buttonDelete.module.css"

export const ButtonDelete = ({ contact, index }) => {
    const userContact = contact;
    const key = index;
    return (
        <button className={`btn btn-light ${styles.buttonDelete}`}>
            <i className="fa-regular fa-trash-can"></i>
        </button>
    );
};