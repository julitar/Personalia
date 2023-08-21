import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import styles from "../../styles/tags.module.css"
import manage_tags from "../../img/manage_tags.jpg";
import { Link } from "react-router-dom";


export const Tags = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className={`container ${styles.tagsContainer}`}>
            <div className="row privateHeader mt-4 d-flex">
                <div className="col-lg-3">
                    <div>
                        <img className={`${styles.tagsImage} rounded-3`} src={manage_tags} />
                    </div>
                </div>
                <div className={`col-lg-6 justify-content-center ${styles.privateHeaderfilters}`}>
                    <h2 className={styles.headTitle}>Manage tags</h2>
                    <p className={styles.text}>Edit, delete and create new tags to filter and search your contacts.</p>
                </div>
                <div className={`col-lg-3 justify-content-center ${styles.privateOptions}`}>
                    <Link to="/"><button type="button" className={`btn btn-light mb-2 px-4 ${styles.buttonPrimary}`}>New Contact</button></Link>
                    <Link to="/private"><button type="button" className={`btn btn-light px-4 ${styles.buttonPrimary}`}>Contact List</button></Link>
                </div>
            </div>
            </div>
    );
    }