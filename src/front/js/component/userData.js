import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UserData = () => {
  const { store, actions } = useContext(Context);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    actions.profile()
    console.log(store.userData)
  }, []);

  const handleSaveChanges = () => {

  }

  const handleInputChange = () => {

  }


  return (

    <>
      <div className="container-fluid m-5">

        {/* {message && <div className="alert alert-warning" role="alert">{message}</div>} */}


        <div className="card col-12 m-auto shadow">
          <div className="card-body ">
            <h1>Your info</h1>

            <form className="row m-3 justify-content-center" onSubmit={handleSaveChanges}>
              <div className="col-10">
                <label htmlFor="name" className="form-label my_label">Name:</label>
                {!editMode ? (
                  <input className="my_input form-control" type="text" value={store.userData.name} readOnly />
                ) : (
                  <input
                    type="text"
                    name="nombre"
                    value={store.userData.name}
                    onChange={handleInputChange}
                    className="my_input form-control"
                  />
                )}
              </div>
              <div className="col-10 my-2">
                <label htmlFor="lastname" className="form-label my_label">Lastname:</label>
                {!editMode ? (
                  <input className="my_input form-control" type="text" value={store.userData.lastname} readOnly />
                ) : (
                  <input
                    type="text"
                    name="lastname"
                    value={store.userData.lastname}
                    onChange={handleInputChange}
                    className="my_input form-control"
                  />
                )}
              </div>
              <div className="col-10 my-2">
                <label htmlFor="email" className="form-label my_label">Email:</label>
                {!editMode ? (
                  <input className="my_input form-control" type="email" value={store.userData.email} readOnly />
                ) : (
                  <input
                    type="email"
                    name="email"
                    value={store.userData.email}
                    onChange={handleInputChange}
                    className="my_input form-control"
                  />
                )}
              </div>
              <div className="col-10 my-2">
                <label htmlFor="birthdate" className="form-label my_label">Birthdate:</label>
                {!editMode ? (
                  <input className="my_input form-control" type="birthdate" value={store.userData.birthdate} readOnly />
                ) : (
                  <input
                    type="birthdate"
                    name="birthdate"
                    value={store.userData.birthdate}
                    onChange={handleInputChange}
                    className="my_input form-control"
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  );

};

export default UserData;