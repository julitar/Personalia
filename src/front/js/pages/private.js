import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import styles from "../../styles/private.module.css"
import { Card } from "../component/card";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className={`container ${styles.privateContainer}`}>
            <div className="row privateHeader">
                <div className="col-lg-3">
                    <div>
                        <img className={styles.privateImage} src="https://www.hogarmania.com/archivos/201710/mantener-ordenado-escritorio-1280x720x80xX.jpg" />
                    </div>
                </div>
                <div className={`col-lg-6 ${styles.privateHeaderfilters}`}>
                    <h2 className={styles.headTitle}>YOUR CONTACTS</h2>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`col-lg-3 ${styles.privateOptions}`}>
                    <div className="newContactButton">
                        <button type="button" className={`btn btn-light ${styles.newContactButton}`} >New Contact</button>

                    </div>
                    <div className="manageTags">
                        <button type="button" className={`btn btn-light ${styles.manageTagsButtton}`}>Manage Tags</button>
                        
                    </div>
                </div>
            </div>
            <div className="contactList row">
                <div className={`col-md-6 ${styles.contact}`}>
                    <Card />
                    <div className={` ${styles.buttonsContainer} mt-3 mb-3`}>
                        <button className={`btn btn-light ${styles.button}`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className={`btn btn-light ${styles.button}`}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className={`col-md-6 ${styles.contact}`}>
                    <Card />
                    <div className={` ${styles.buttonsContainer} mt-3 mb-3`}>
                        <button className={`btn btn-light ${styles.button}`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className={`btn btn-light ${styles.button}`}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className={`col-md-6 ${styles.contact}`}>
                    <Card />
                    <div className={` ${styles.buttonsContainer} mt-3 mb-3`}>
                        <button className={`btn btn-light ${styles.button}`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className={`btn btn-light ${styles.button}`}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <div className={`col-md-6 ${styles.contact}`}>
                    <Card />
                    <div className={` ${styles.buttonsContainer} mt-3 mb-3`}>
                        <button className={`btn btn-light ${styles.button}`}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button className={`btn btn-light ${styles.button}`}>
                            <i className="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>
            

        </div>
	);
};