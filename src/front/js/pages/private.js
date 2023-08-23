import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import styles from "../../styles/private.module.css"
import { Card } from "../component/card";
import privateimg from "../../img/privateimg.jpg";
import { ButtonPencil } from "../component/buttonPencil";
import { ButtonDelete } from "../component/buttonDelete";


export const Private = () => {
    const { store, actions } = useContext(Context);
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        console.log(store)
        const getContacts = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + '/api/user/contacts', {
                    method: 'GET',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt-token")
                    }
                });

                const data = await response.json()

                if (response.status === 200) {
                    console.log(data)
                    setContacts(data.contacts);
                } else {
                    console.error('Error fetching contacts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        }

        getContacts();

    }, []);

    //console.log(contacts)
    return (
        <div className={`container ${styles.privateContainer}`}>
            <div className="row privateHeader  mt-4">
                <div className="col-lg-3">
                    <div>
                        <img className={`${styles.privateImage} rounded-3`} src={privateimg} />
                    </div>
                </div>
                <div className={`col-lg-6 ${styles.privateHeaderfilters}`}>
                    <h2 className={styles.headTitle}>YOUR CONTACTS</h2>
                    <input className={`form-control mr-sm-2 ${styles.search}`} type="search" placeholder="Search" aria-label="Search"></input>
                    <div className="dropdown">
                        <button className={`btn btn-secondary dropdown-toggle ${styles.dropdown}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            # Tags
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
                        <button type="button" className={`btn btn-light px-4 ${styles.buttonPrimary}`} >New Contact</button>

                    </div>
                    <div className="manageTags">
                        <button type="button" className={`btn btn-light px-4 ${styles.buttonPrimary}`}>Manage Tags</button>

                    </div>
                </div>
            </div>
            <div className="contactList row">
                {
                    contacts.map((userContact, index) => {
                        return (
                            <div className={`col-md-6 ${styles.contact}`} key={index}>
                                <Card contact={userContact} index={index} />
                                <div className={` ${styles.buttonsContainer} mt-3 mb-3`}>
                                    <ButtonPencil contact={userContact} index={index} />
                                    <ButtonDelete contact={userContact} index={index} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};
