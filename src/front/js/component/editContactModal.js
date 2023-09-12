import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/editContactModal.module.css"


export const EditContactModal = ({ contact, index, onClose, isOpen }) => {
    console.log(contact)
    const userContact = contact;
    const key = index;

    const [name, setName] = useState(contact.name);
    const [lastname, setLastname] = useState(contact.lastname);
    const [company, setCompany] = useState(contact.company || "");
    const [phone, setPhone] = useState(contact.phone || "");
    const [email, setEmail] = useState(contact.email || "");
    const [socialmedia, setSocialmedia] = useState(contact.socialmedia || "");
    const [birthdate, setBirthdate] = useState(contact.birthdate || "");
    const [currentPassword, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSaveChanges = () => {
        const updatedContact = {
            name,
            lastname,
            company,
            phone: phone !== "" ? parseInt(phone) : null,
            email,
            socialmedia,
            birthdate: birthdate ? birthdate : null,
        };

        const contactId = contact.id;

        fetch(process.env.BACKEND_URL + `/api/user/contacts/${contactId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt-token")
            },
            body: JSON.stringify(updatedContact),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Contact updated successfully") {
                    // Realizar acciones necesarias, como cerrar el modal o actualizar la lista de contactos
                    onClose(updatedContact);
                    // ... Actualizar la lista de contactos si es necesario
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (event.target.classList.contains('modal')) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={`modal ${styles.modalBackgroud}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
            <div className={`modal-dialog modal-lg ${styles.modalDialog}`} style={{ width: "100%" }}>
                <div className={`modal-content col-md-10 ${styles.modalContent}`}>
                    <div className={`modal-header ${styles.modalHeader}`}>
                        <h1 className="modal-title fs-5" id="exampleModalLabel">EDIT CONTACT</h1>
                    </div>
                    <div className="modal-body">
                        <div className={`row ${styles.modalBodyRow}`}>
                            <label className="col-md-3 text-end">Name</label>
                            <div className={`col-md-9 ${styles.inputContent}`}>
                                <input type="text" className={`form-control input-user ${styles.inputStyles}`} id="userName" onChange={e => setName(e.target.value)} value={name} />
                            </div>
                        </div>
                        <div className={`row ${styles.modalBodyRow}`}>
                            <label className="col-md-3 text-end">Lastname</label>
                            <div className={`col-md-9 ${styles.inputContent}`}>
                                <input type="text" className={`form-control input-user ${styles.inputStyles}`} id="lastname" onChange={e => setLastname(e.target.value)} value={lastname} />
                            </div>
                        </div>
                        <div className={`row ${styles.modalBodyRow}`}>
                            <label className="col-md-3 text-end">Company</label>
                            <div className={`col-md-9 ${styles.inputContent}`}>
                                <input type="text" className={`form-control input-user ${styles.inputStyles}`} id="company" onChange={e => setCompany(e.target.value)} value={company} />
                            </div>
                        </div>
                        <div className={`row ${styles.modalBodyRow}`}>
                            <label className="col-md-3 text-end">Phone</label>
                            <div className={`col-md-9 ${styles.inputContent}`}>
                                <input type="text" className={`form-control input-user ${styles.inputStyles}`} id="phone" onChange={e => setPhone(e.target.value)} value={phone} />
                            </div>
                        </div>
                        <div className={`row ${styles.modalBodyRow}`}>
                            <label className="col-md-3 text-end">Email</label>
                            <div className={`col-md-9 ${styles.inputContent}`}>
                                <input type="text" className={`form-control input-user ${styles.inputStyles}`} id="email" onChange={e => setEmail(e.target.value)} value={email} />
                            </div>
                        </div>
                        <div className={`row ${styles.modalBodyRow}`}>
                            <label className="col-md-3 text-end">Social Media</label>
                            <div className={`col-md-9 ${styles.inputContent}`}>
                                <input type="text" className={`form-control input-user ${styles.inputStyles}`} id="socialmedia" onChange={e => setSocialmedia(e.target.value)} value={socialmedia} />
                            </div>
                        </div>
                        <div className={`row ${styles.modalBodyRow}`}>
                            <label className="col-md-3 text-end">Birthdate</label>
                            <div className={`col-md-9 ${styles.inputContent}`}>
                                <input type="text" className={`form-control input-user ${styles.inputStyles}`} id="birthdate" onChange={e => setBirthdate(e.target.value)} value={birthdate} />
                            </div>
                        </div>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>Save changes</button>
                    </div>
                </div>
            </div>
        </div >
    );
};