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
        email: store.userData.email
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
      <div className="container-fluid my-4">

        {/* {message && <div className="alert alert-warning" role="alert">{message}</div>} */}
        <div className="row">
          <div className="card col-lg-8 col-sm-12">
            <div className="card-body">
              <h1>Your info</h1>

              <form className="row justify-content-center" onSubmit={handleSaveChanges}>
                <div class="mb-3 row">
                  <label htmlFor="name" className="col-sm-2 col-form-label my_label">Name</label>
                  <div class="col-sm-10">
                    {!editMode ? (
                      <input className="my_input form-control" type="text" value={formData.name} readOnly />
                    ) : (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="my_input form-control"
                      />
                    )}
                  </div>
                </div>
                <div class="mb-3 row">
                  <label htmlFor="lastname" className="col-sm-2 col-form-label my_label">Lastname</label>
                  <div class="col-sm-10">
                    {!editMode ? (
                      <input className="my_input form-control" type="text" value={formData.lastname} readOnly />
                    ) : (
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleInputChange}
                        className="my_input form-control"
                      />
                    )}
                  </div>
                </div>

                <div class="mb-3 row">
                  <label htmlFor="email" className="col-sm-2 col-form-label my_label">Email</label>
                  <div class="col-sm-10">
                    {!editMode ? (
                      <input className="my_input form-control" type="email" value={formData.email} readOnly />
                    ) : (
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="my_input form-control"
                      />
                    )}
                  </div>
                </div>

                <div class="mb-3 row">
                  <label htmlFor="birthdate" className="col-sm-2 col-form-label my_label">Birthdate</label>
                  <div class="col-sm-10">
                    {!editMode ? (
                      <input className="my_input form-control" type="date" value={formData.birthdate} readOnly />
                    ) : (
                      <input
                        type="text"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        className="my_input form-control"
                      />
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-4 col-sm-12 d-flex flex-column justify-content-end">
            <button className="btn btn-primary m-3">Change password</button>

            {editMode ? (
              <button className="btn btn-primary m-3" onClick={handleSaveChanges}>Save data</button>
            ) : (
              <button className="btn btn-primary m-3" onClick={() => setEditMode(true)}>Edit data</button>)
            }
          </div>
        </div>

        {/* cambio de contraseña */}

        <div className="modal-password">
          <div className="my-2">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="my_input form-control"
            />
          </div>
          <div className="my-2">
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="my_input form-control"
            />
          </div>
          <div className="my-2">
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="my_input form-control"
            />
          </div>
          <button className="btn btn-primary m-3">Cancel</button>
          <button className="btn btn-primary m-3" onClick={handleChangePassword}>Save</button>
        </div>

      </div>
    </>

  );

};

export default UserData;