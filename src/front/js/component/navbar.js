import React, {useState, useEffect, useContext} from "react"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {

	const { store, actions } = useContext(Context);

	const [mode, setMode] = useState('light'); 

	const toggleMode = () => {
		actions.changeTheme()
		//setMode(mode === 'light' ? 'dark' : 'light');
	};


	return (
		<nav className={`navbar navbar-light bg-light ${mode}` }>
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<button className="mode-button" onClick={toggleMode}>Cambiar Modo</button>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
