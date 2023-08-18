const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			theme: "theme-light",
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			changeTheme: () => {
				const store = getStore();
				if (store.theme === "theme-light") {
					setStore({ theme: "theme-dark" })
					console.log(store.theme)
				} else {
					setStore({ theme: "theme-light" })
					console.log(store.theme)
				}
			}
		}
	};
};

export default getState;
