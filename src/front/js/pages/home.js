import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!<i class="fa-solid fa-wand-magic-sparkles"></i></h1>
			<div class="d-flex gap-2 justify-content-center py-5">
				<span class="badge d-flex align-items-center p-1 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill">
					<img class="rounded-circle me-1" width="24" height="24" src="https://github.com/mdo.png" alt=""/>Primary
				</span>
				<span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
					<img class="rounded-circle me-1" width="24" height="24" src="https://github.com/mdo.png" alt=""/>Secondary
				</span>
				<span class="badge d-flex align-items-center p-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill">
					<img class="rounded-circle me-1" width="24" height="24" src="https://github.com/mdo.png" alt=""/>Success
				</span>
			</div>
		</div>
	);
};
