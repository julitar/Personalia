import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import styles from "../../styles/tags.module.css"
import manage_tags from "../../img/manage_tags.jpg";
import { Link } from "react-router-dom";


export const Tags = () => {
    const { store, actions } = useContext(Context);
    const [newTag, setNewTag] = useState('')
    const [selectedTag, setSelectedTag] = useState(null);
    const [tagName, setTagName] = useState('');

    useEffect(() => {
        actions.showTags()
    }, [])

    const submitNewTag = () => {
        if (newTag.trim() !== '') {
            actions.newTag({ name: newTag });
            setNewTag('');
        } else {
            alert('Please enter a valid tag name');
        }
    }

    const handleDelete = (tag_id) => {
        actions.deleteTag(tag_id);
    }

    const openEditModal = async (tagId) => {
        setSelectedTag(tagId);

        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/tags/${tagId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch tag details');
            }

            const tagDetails = await response.json();
            setTagName(tagDetails.name);
        } catch (error) {
            console.error('Error fetching tag details:', error);
        }
    }

    const handleSaveChanges = async (tag_id) => {

        if (tag_id && tagName.trim() !== '') {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/tags/${tag_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                    },
                    body: JSON.stringify({ name: tagName })
                });

                actions.showTags();
                console.log(`Tag ${selectedTag} updated successfully`);
                alert("Tag updated successfully");

            } catch (error) {
                console.error(error);
                alert(error);
            }
        } else {
            alert('Please provide a valid tag name');
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

                <div className={`col-lg-6 col-sm-10 m-auto ${styles.tags_jumbotron}`}>
                    <h1 className={`mb-2 text-center ${styles.yourtags_title}`}>Your tags</h1>

                    <ul>
                        {store.userTags.map((tag) => (
                            <li className={styles.item} key={tag.id}>
                                <button
                                    className={styles.item_button}
                                    data-bs-toggle="modal"
                                    data-bs-target="#editTag"
                                    onClick={() => openEditModal(tag.id)}>
                                    {tag.name}
                                </button>
                            </li>
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


                {/*-- Modal --*/}
                <div className="modal fade" id="editTag" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className={`${styles.modal} modal-content`}>
                            <div className="col d-flex justify-content-end">
                                <button className={`${styles.close_button} m-2`} data-bs-dismiss="modal" aria-label="Close"><i className="fa-regular fa-circle-xmark"></i></button>
                            </div>
                            <div className="modal-body justify-content-center">
                                <h1 className={`fs-5 mb-2 text-center ${styles.modal_title}`} id="exampleModalLabel">Edit tag</h1>
                                <div className="p-4 text-center">
                                    <input
                                        className={styles.edittag_input}
                                        type="text"
                                        name="tag"
                                        value={tagName}
                                        onChange={(e) => setTagName(e.target.value)}
                                    />
                                    <i className={`fa-solid fa-pen ${styles.icon}`}></i>
                                </div>
                            </div>

                            <div className="row justify-content-center">
                                <button onClick={() => (handleDelete(selectedTag))} data-bs-dismiss="modal" className={`mx-4 ${styles.outlineButtonTertiary2}`}>Delete Tag <i className="fa-solid fa-trash"></i></button>
                            </div>

                            <div className="row justify-content-center">
                                <button className={styles.buttonTertiary} data-bs-dismiss="modal" onClick={() => (handleSaveChanges(selectedTag))}>Save Changes</button>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div className={`${styles.space} col-12`}>

            </div>
        </div >
    );
}