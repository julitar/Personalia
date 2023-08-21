import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import styles from "../../styles/tags.module.css"
import { Card } from "../component/card";
import manage_tags from "../../img/manage_tags.jpg";


export const Tags = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className={`container ${styles.privateContainer}`}>
            <div className="row privateHeader  mt-4">
                <div className="col-lg-3">
                    <div>
                        <img className={`${styles.privateImage} rounded-3`} src={manage_tags} />
                    </div>
                </div>
                <div className={`col-lg-6 ${styles.privateHeaderfilters}`}>
                    <h2 className={styles.headTitle}>Manage tags</h2>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                    
                </div>
                <div className={`col-lg-3 ${styles.privateOptions}`}>
                    <div className="newContactButton">
                        <button type="button" className={`btn btn-light px-4 ${styles.buttonPrimary}`} >New Contact</button>

                    </div>
                    <div className="manageTags">
                        <button type="button" className={`btn btn-light px-4 ${styles.buttonPrimary}`}>Manage Tags</button>
                        
                    </div>
                </div>
            </div>
            </div>
    );
    }