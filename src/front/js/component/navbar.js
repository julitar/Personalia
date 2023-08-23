import React, {useState, useEffect, useContext} from "react"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import styles from "../../styles/navbar.module.css"

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
					<p className={`navbar-brand mb-0 h1 logo ${styles.title}`}>Personalia</p>
				</Link>
				<input className={styles.darkModeToggleInput} type="checkbox" onClick={toggleMode}  id="darkmode-toggle" />
				<label className={styles.darkModeToggle} htmlFor="darkmode-toggle">
					<i className={`fa-solid fa-sun ${styles.sun}`}></i>
					<i className={`fa-solid fa-moon ${styles.moon}`}></i>
				</label>
			</div>
		</nav>
	);
};
