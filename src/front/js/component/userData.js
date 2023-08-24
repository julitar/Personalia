import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import styles from "../../styles/userdata.module.css"

export const UserData = () => {
  const { store, actions } = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    birthdate: '',
  });

  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  useEffect(() => {
    const fetchProfileData = async () => {
      await actions.profile()
      console.log(store.userData)
      setFormData({
        name: store.userData.name || 'Your name',
        lastname: store.userData.lastname || 'Your lastame',
        email: store.userData.email,
        birthdate: store.userData.birthdate,
      });
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveChanges = async () => {
    console.log(formData);
    actions.userData(formData);
    setEditMode(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/password", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + localStorage.getItem("jwt-token")
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        console.log('Contraseña cambiada con éxito');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('Contraseña cambiada con éxito');

      } else {
        console.error('Error al cambiar la contraseña');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert('Error al cambiar la contraseña');
      }

    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }

  };


  return (

    <>
      <div className={`container-fluid my-4 ${styles.userContainer}`}>

        {/* {message && <div className="alert alert-warning" role="alert">{message}</div>} */}
        <div className="row justify-content-center m-auto">
          <div className={`card col-lg-6 col-md-8 col-sm-10 ${styles.card}`}>
            <div className="card-body">
              <h1 className={styles.title}>Your info</h1>

              <form className="row justify-content-center" onSubmit={handleSaveChanges}>
                <div className="mb-3 row justify-content-center m-auto">
                  <label htmlFor="name" className={`col-3 col-form-label ${styles.label}`}>Name</label>
                  <div className="col-6">
                    {!editMode ? (
                      <input className={styles.my_input} type="text" value={formData.name} readOnly />
                    ) : (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={styles.my_input}
                      />
                    )}
                  </div>
                </div>
                <div className="mb-3 row justify-content-center m-auto">
                  <label htmlFor="lastname" className={`col-3 col-form-label ${styles.label}`}>Lastname</label>
                  <div className="col-6">
                    {!editMode ? (
                      <input className={styles.my_input} type="text" value={formData.lastname} readOnly />
                    ) : (
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className={styles.my_input}
                      />
                    )}
                  </div>
                </div>

                <div className="mb-3 row justify-content-center m-auto">
                  <label htmlFor="email" className={`col-3 col-form-label ${styles.label}`}>Email</label>
                  <div className="col-6">
                    {!editMode ? (
                      <input className={styles.my_input} type="email" value={formData.email} readOnly />
                    ) : (
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.my_input}
                      />
                    )}
                  </div>
                </div>

                <div className="mb-3 row justify-content-center m-auto">
                  <label htmlFor="birthdate" className={`col-3 col-form-label ${styles.label}`}>Birthdate</label>
                  <div className="col-6">


                    <input
                      type="text"
                      name="birthdate"
                      value={formData.birthdate}
                      readOnly={!editMode}
                      onChange={handleInputChange}
                      className={`${styles.my_input} border-bottom`}
                    />


                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-3 col-sm-12 d-flex flex-column align-items-center justify-content-md-end align-items-md-start text-center">
            <button className={`mb-3 mt-3 mt-md-0 ${styles.outlineButtonSecondary}`}>Change password</button>

            {editMode ? (
              <button className={styles.outlineButtonSecondary} onClick={handleSaveChanges}>Save data</button>
            ) : (
              <button className={styles.outlineButtonSecondary} onClick={() => setEditMode(true)}>Edit data</button>)
            }
          </div>
        </div >

        {/* cambio de contraseña */}

        <div className="modal-password my-5">
          <h1 className={styles.titlepassword}>Change password</h1>
          <div className="row">

            <div className="mb-3 row justify-content-center m-auto">
              <label htmlFor="currentPassword" className={`col-3 col-form-label ${styles.label}`}>Current password</label>
              <div className="col-6">
                <input
                  type="password"
                  name="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className={styles.my_input}
                />
              </div>
            </div>

            <div className="mb-3 row justify-content-center m-auto">
              <label htmlFor="newPassword" className={`col-3 col-form-label ${styles.label}`}>Current password</label>
              <div className="col-6">
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className={styles.my_input}
                />
              </div>
            </div>

            <div className="mb-3 row justify-content-center m-auto">
              <label htmlFor="confirmPassword" className={`col-3 col-form-label ${styles.label}`}>Confirm password</label>
              <div className="col-6">
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.my_input}
                />
              </div>
            </div>

            <div className="row justify-content-center">
              <button className={`mx-4 ${styles.outlineButtonTertiary}`}>Cancel</button>
              <button className={styles.buttonTertiary} onClick={handleChangePassword}>Save</button>
            </div>
          </div >
        </div>
      </div >
    </>

  );

};

export default UserData;