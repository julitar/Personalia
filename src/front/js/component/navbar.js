import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light border-bottom justify-content-center">
			<div className="container justify-content-center">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<p className="navbar-brand mb-0 h1 logo">Personalia</p>
				</Link>
			</div>
		</nav>
	);
};
