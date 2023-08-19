import React, { useContext, useState, useEffect, useSyncExternalStore } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import chico from "../../img/chico.jpg";
import "../../styles/home.css";

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
			navigate("/");
		  } catch (error) {
			console.error("Login failed:", error);
		  }
	}

	return (
		
    	<div className= "container justify-content-center">
        	<div className= "row justify-content-center p-3">
				<div className= "m-5 text-center col-10">
					<h2>Welcome to our community of organized individuals!</h2>
					<p>Take control of your contacts and make managing them a breeze. Personalia allows you to effortlessly categorize, schedule, and connect with your contacts.</p>
				</div>
				<div class="col-10 mb-4 border rounded-3">
					<div className="row justify-content-center">
						<div className="col-6 text-center">
							<img src={chico} alt="" width="500"/>
						</div>
						<div className="col-6 p-5">
							<h1 class="display-5 fw-bold">Log in</h1>
							<form>		
								<div className="form-floating my-3">
									<input type="email" className="form-control" id="email" placeholder="name@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
									<label className="my_label" htmlFor="email">Email</label>
								</div>
								<div className="form-floating my-3">
									<input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
									<label className="my_label" htmlFor="password">Contraseña</label>
								</div>
								
								<div className="checkbox mb-3">
									<label className="my_label mb-4">
										<input type="checkbox" value="remember-me"/> Recordarme
									</label>
								</div>
								<div className="text-center">
									<button className="w-75 btn btn-primary btn-lg" type="submit" onClick={(e) => handleLogin(e, email, password)}>Iniciar Sesión</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="col-8 my-5">
				<div className="row">
					<div className="col-6">
						<h3>New here?</h3>
						<p>Join our community of organized individuals! Register now to unlock the full potential of Personalia.</p>
					</div>
					<div className="d-flex col-6 align-items-center justify-content-center">
						<Link to="/signup">
							<button className="btn btn-primary btn-lg" type="button">Sign up!</button>
						</Link>
					</div>
				</div>
				</div>
			</div>
		</div>
	);
};
