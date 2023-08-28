import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import styles from "../../styles/tags.module.css"
import manage_tags from "../../img/manage_tags.jpg";
import { Link } from "react-router-dom";


export const Tags = () => {
    const { store, actions } = useContext(Context);
    const [newTag, setNewTag] = useState('')

    useEffect(() => {
        actions.showTags()
    }, [store.userTags])

    const submitNewTag = () => {
        if (newTag.trim() !== '') {
            actions.newTag({ name: newTag });
            setNewTag('');
        } else {
            alert('Please enter a valid tag name');
        }
    }

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

            <div className="row mt-3">
                {/* componente para mostrar tags */}

                <div className={`col-lg-6 col-sm-10 m-auto my-4 ${styles.tags_jumbotron}`}>
                    <h1 className={`mb-2 text-center ${styles.yourtags_title}`}>Your tags</h1>

                    <ul>
                        {store.userTags.map((tag) => (
                            <li className={styles.item} key={tag.id}>{tag.name}</li>
                        ))}
                    </ul>

                    <p className={styles.smalltext}>Click to edit or delete a tag</p>
                </div>

                {/* componente para crear tags */}
                <div className="col-lg-4 col-sm-10 m-auto">
                    <div className={`${styles.jumbotron} p-4 text-center rounded-3`}>
                        <h1 className={`mb-2 ${styles.tags_title}`}>Create Tag</h1>
                        <input
                            className={styles.my_input}
                            type="text"
                            name="tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                        />
                        <i className={`fa-solid fa-pen ${styles.icon}`}></i>
                        <div className="row justify-content-center">
                            <button onClick={submitNewTag} className={`mt-4 ${styles.outlineButtonTertiary}`}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}