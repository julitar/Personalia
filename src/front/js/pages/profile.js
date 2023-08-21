import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import styles from "../../styles/profile.module.css"
import profile from "../../img/profile.jpg";
import { Link } from "react-router-dom";


export const Profile = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className={`container ${styles.tagsContainer}`}>
            <div className="row privateHeader mt-4 d-flex">
                <div className="col-lg-3">
                    <div>
                        <img className={`${styles.tagsImage} rounded-3`} src={profile} />
                    </div>
                </div>
                <div className={`col-lg-6 justify-content-center ${styles.privateHeaderfilters}`}>
                    <h2 className={styles.headTitle}>Profile</h2>
                    <p className={styles.text}>See and edit your profile data here!</p>
                </div>
                <div className={`col-lg-3 justify-content-center ${styles.privateOptions}`}>
                    <Link to="/"><button type="button" className={`btn btn-light mb-2 px-4 ${styles.buttonPrimary}`}>Back</button></Link>
                </div>
            </div>
            </div>
    );
    }