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
		<nav className="navbar navbar-light border-bottom justify-content-center">
			<div className="container justify-content-center">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<p className="navbar-brand mb-0 h1 logo">Personalia</p>
				</Link>
				<button className="mode-button" onClick={toggleMode}>Cambiar Modo</button>
			</div>
		</nav>
	);
};
