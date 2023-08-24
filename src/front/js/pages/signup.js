import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import signup from "../../img/signup.jpg";
import styles from "../../styles/signup.module.css"


import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);
	const [success, setSuccess] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
	}, []);


	const handleSubmit = async (e, email, password) => {
		e.preventDefault();

		if (!email || !password) {
			alert("Please fill in all the required fields");
			return;
		}

		if (password !== confirmPassword) {
			console.log("Passwords do not match");
			return;
		}

		try {
			await actions.signup(email, password);
			console.log("Signup successful");
			setSuccess(true);
		} catch (error) {
			console.error("Login failed:", error);
		}
	}


	return (

		<>

			{success ? (

				<div className="container my-5">
					<div className="my_jumbotron jumbotron p-5 col-10 m-auto text-center rounded-3">
						<h3 className={`display-6 ${styles.header}`}>Welcome aboard! </h3>
						<p className={`col-10 mx-auto mb-3 fs-5 text-muted ${styles.text}`}>
							You're now part of the <strong>PERSONALIA</strong> community
						</p>
						<Link to="/">
							<button className={`btn ${styles.outlineButtonSecondary} btn-lg px-4 rounded-pill`} type="button">
								¡Start!
							</button>
						</Link>
					</div>
				</div>

			) : (

				<div className="container justify-content-center">
					<div className="row justify-content-center p-3">
						<div className="m-5 text-center col-10">
							<h2 className={styles.header}>New here?</h2>
							<p className={styles.text}>Join our community of organized individuals! Register now to unlock the full potential of Personalia.</p>
						</div>
						<div className="col-10 mb-4 border rounded-3">
							<div className="row justify-content-center">
								<div className="col-6 text-center p-0 d-none d-sm-block image-container">
									<img src={signup} alt="girl_signup" className={`img-fluid rounded-start ${styles.myImg}`} data-bs-toggle="tooltip" title="Phone illustrations by Storyset" />
								</div>
								<div className="col-6 p-5">
									<h1 className={`display-5 fw-bold ${styles.title}`}>Sign up!</h1>
									<form className="form-floating" onSubmit={handleSubmit}>
										<div className="form-floating my-3">
											<input type="email" className="form-control" id="email" placeholder="name@mail.com" onChange={(e) => setEmail(e.target.value)} />
											<label className={styles.my_label} htmlFor="email">Email</label>
										</div>
										<div className="form-floating my-3">
											<input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
											<label className={styles.my_label} htmlFor="password">Password</label>
										</div>
										<div className="form-floating my-3">
											<input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setConfirmPassword(e.target.value)} />
											<label className={styles.my_label} htmlFor="password">Confirm password</label>
										</div>
										<div className="text-center mt-4">
											<button className={`px-4 btn btn-lg ${styles.outlineButtonTertiary}`} type="submit" onClick={(e) => handleSubmit(e, email, password)}>Register</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-8 my-5">
						</div>
					</div>
				</div>
			)}


		</>
	);
};
