import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/card.module.css"

export const Card = ({ contact, index }) => {
    const userContact = contact;
    const key = index;
    return (
        <>
            <div className={`card mb-3 mt-3 shadow ${styles.card}`} >
                <div className="row g-0">
                    <div className={`col-5 ${styles.cardImageDiv}`}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTceLXizJ893rCgsmJOMY7fzckPwQG1Fzmvg&usqp=CAU"
                            className={`img-fluid rounded-start ${styles.cardImage}`}
                            alt="..." />
                    </div>
                    <div className="col-7">
                        <div className={`card-body ${styles.cardBody}`}>
                            <h5 className={`card-title ${styles.cardTitle}`}>{`${userContact.name || ""} ${userContact.lastname || ""}`}</h5>
                            <p className="card-text">{`Company: ${userContact.company || ""}`}</p>
                            <p className="card-text">{`Phone: ${userContact.phone || ""}`}</p>
                            <p className="card-text">{`Email: ${userContact.email || ""}`}</p>
                            <p className="card-text">{`Social Media: ${userContact.socialmedia || ""}`}</p>
                            <p className="card-text">{`Birthday: ${userContact.birthday || ""}`}</p>
                            <div className="tags">
                                <div className="tag">
                                    <button type="button" className={`btn btn-light ${styles.tagButton}`}>Tags</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
