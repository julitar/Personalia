import React, { useContext, useState, useEffect, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import login from "../../img/login.jpg";
import "../../styles/home.css";
import styles from "../../styles/home.module.css"


export const Home = () => {
	
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e, email, password) => {
		e.preventDefault();
		try {
			await actions.login(email, password);
			console.log("Login successful. Token:", store.token);
			navigate("/private");
		  } catch (error) {
			console.error("Login failed:", error);
		  }
	}

	return (
		
    	<div className= "container justify-content-center">
        	<div className= "row justify-content-center">
				<div className= "m-5 text-center col-10">
					<h2 className={styles.header}>Welcome to our community of organized individuals!</h2>
					<p className={styles.text}>Take control of your contacts and make managing them a breeze. Personalia allows you to effortlessly categorize, schedule, and connect with your contacts.</p>
				</div>
				<div class="col-10 mb-4 border rounded-3">
					<div className="row justify-content-center">
						<div className="col-sm-6 text-center p-0 d-none d-sm-block">
							<img src={login} alt="login_img" className={`img-fluid rounded-start ${styles.myImg}`}/>
						</div>
						<div className="col-sm-6 col-12 p-5">
							<h1 className={`display-5 fw-bold ${styles.title}`}>Log in</h1>
							<form>		
								<div className="form-floating my-3">
									<input type="email" className="form-control" id="email" placeholder="name@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
									<label className={styles.my_label} htmlFor="email">Email</label>
								</div>
								<div className="form-floating my-3">
									<input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
									<label className={styles.my_label} htmlFor="password">Contraseña</label>
								</div>
								
								<div className="checkbox mb-3">
									<label className="my_label mb-4">
										<input type="checkbox" value="remember-me"/> Recordarme
									</label>
								</div>
								<div className="text-center">
									<button className={`px-4 btn btn-lg ${styles.outlineButtonPrimary}`} type="submit" onClick={(e) => handleLogin(e, email, password)}>Go!</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className={`col-12 my-5 d-flex justify-content-center ${styles.container_signup}`}>
				<div className="row align-items-center">
					<div className="col-lg-8 col-sm-12 text-center">
						<h3 className={styles.subtitulo}>New here?</h3>
						<p className={styles.text}>Join our community of organized individuals! <br/> Register now to unlock the full potential of <strong>Personalia</strong>.</p>
					</div>
					<div className="d-flex col-lg-4 col-sm-12 justify-content-center align-items-center">
						<Link to="/signup">
							<button className={`btn ${styles.buttonTertiary}`} type="button">Sign up!</button>
						</Link>
					</div>
				</div>
				</div>
			</div>
		</div>
	);
};
