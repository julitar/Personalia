import React, { useState, useEffect, useContext } from "react"
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
			<div className="container justify-content-between">
				<div typeof="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
					<svg xmlns="http://www.w3.org/2000/svg" width="29" height="31" viewBox="0 0 29 31" fill="none">
						<path d="M23.4567 9.89052C26.1878 9.89052 28.402 7.67646 28.402 4.94525C28.402 2.21407 26.1878 0 23.4567 0C20.7255 0 18.5115 2.21407 18.5115 4.94525C18.5115 7.67646 20.7255 9.89052 23.4567 9.89052Z" fill="#19647E" />
						<path d="M4.94525 9.89052C7.67644 9.89052 9.89051 7.67646 9.89051 4.94525C9.89051 2.21407 7.67644 0 4.94525 0C2.21407 0 0 2.21407 0 4.94525C0 7.67646 2.21407 9.89052 4.94525 9.89052Z" fill="#19647E" />
						<path d="M23.4567 30.4414C26.1878 30.4414 28.402 28.2274 28.402 25.4961C28.402 22.7649 26.1878 20.5509 23.4567 20.5509C20.7255 20.5509 18.5115 22.7649 18.5115 25.4961C18.5115 28.2274 20.7255 30.4414 23.4567 30.4414Z" fill="#19647E" />
						<path d="M4.94525 30.4414C7.67644 30.4414 9.89051 28.2274 9.89051 25.4961C9.89051 22.7649 7.67644 20.5509 4.94525 20.5509C2.21407 20.5509 0 22.7649 0 25.4961C0 28.2274 2.21407 30.4414 4.94525 30.4414Z" fill="#19647E" />
					</svg>
				</div>
				<div className={`offcanvas offcanvas-start ${styles.offcanvas}`} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
					<div className="offcanvas-header justify-content-end">
						<i typeof="button" className={`fa-solid fa-xmark ${styles.buttonClose}`} data-bs-dismiss="offcanvas" aria-label="Close"></i>
					</div>
					<div className={`offcanvas-body ${styles.offcanvasBody}`}>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<p className={`navbar-brand mb-0 h1 ${styles.menuLink}`}>Profile</p>
						</Link>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<p className={`navbar-brand mb-0 h1 ${styles.menuLink}`}>Contacts</p>
						</Link>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<p className={`navbar-brand mb-0 h1 ${styles.menuLink}`}>Advanced Search</p>
						</Link>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<p className={`navbar-brand mb-0 h1 ${styles.menuLink}`}>Manage Tags</p>
						</Link>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<p className={`navbar-brand mb-0 h1 ${styles.menuLink}`}>About Us</p>
						</Link>
						<Link to="/" style={{ textDecoration: 'none' }}>
							<p className={`navbar-brand mb-0 h1 ${styles.menuLink}`}>Log Out</p>
						</Link>
					</div>
				</div>
				<Link to="/" style={{ textDecoration: 'none' }}>
					<p className={`navbar-brand mb-0 h1 logo ${styles.title}`}>Personalia</p>
				</Link>
				<input className={styles.darkModeToggleInput} type="checkbox" onClick={toggleMode} id="darkmode-toggle" />
				<label className={styles.darkModeToggle} htmlFor="darkmode-toggle">
					<i className={`fa-solid fa-sun ${styles.sun}`}></i>
					<i className={`fa-solid fa-moon ${styles.moon}`}></i>
				</label>
			</div>
		</nav>
	);
};
