const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			theme: "theme-light",
			token: null,
			userData: [],
			userTags: [],
		},

		actions: {

			login: async (email, password) => {

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/login", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ email, password })
					});

					const data = await response.json();

					if (response.status === 200) {
						const token = data.token;
						localStorage.setItem("jwt-token", token);
						setStore({ token: token })
					} else {
						alert(data.message);
					}
				} catch (error) {
					console.error(error);
				}
			},

			logout: () => {
				localStorage.removeItem("jwt-token");
				setStore({ token: null });
			},

			updateLogin: () => {
				if (localStorage.getItem("jwt-token"))
					setStore({ token: localStorage.getItem("jwt-token") });
			},

			signup: (email, password) => {
				const config = {
					method: 'POST',
					body: JSON.stringify({ email, password }),
					headers: {
						'Content-Type': 'application/json'
					}
				}
				fetch(process.env.BACKEND_URL + "/api/signup", config)
					.then(res => {
						if (!res.ok) {
							throw new Error('Error en la solicitud');
						}
						return res.json();
					})
					.then(response => {
						if (response.Error) {
							console.log('Error:', response);
							alert(response.Error);
						} else {
							console.log('Exito:', response);
						}
					})
					.catch(error => {
						console.error('Error:', error);
					});
			},

			profile: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/profile', {
						method: 'GET',
						headers: {
							"Authorization": "Bearer " + localStorage.getItem("jwt-token")
						}
					});

					const data = await response.json();

					if (response.status === 200) {
						console.log(data)
						setStore({ userData: data })

					} else {
						console.error('Error:', response.statusText);
					}
				} catch (error) {
					console.error('Error:', error);
				}
			},

			userData: async (formData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/profile", {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("jwt-token")
						},
						body: JSON.stringify(formData),
					});

					if (!response.ok) {
						throw new Error("We couldn't save your changes");
					}
					alert("Changes saved successfuly")

				} catch (error) {
					console.error(error);
					alert(error)
				}
			},


			newTag: async (tag) => {

				const actions = getActions()

				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/tags", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + localStorage.getItem("jwt-token")
						},
						body: JSON.stringify(tag),
					});

					if (!response.ok) {
						throw new Error("Create tag failed");
					}

					actions.showTags();
					alert("New tag created successfuly")

				} catch (error) {
					console.error(error);
					alert(error)
				}
			},

			showTags: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/tags", {
						method: "GET",
						headers: {
							"Authorization": "Bearer " + localStorage.getItem("jwt-token")
						},
					});

					const data = await response.json();

					if (response.status === 200) {
						console.log(data)
						setStore({ userTags: data })

					} else {
						console.error('Error:', response.statusText);
					}
				} catch (error) {
					console.error('Error:', error);
				}
			},

			deleteTag: async (tag_id) => {

				const actions = getActions()

				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/tags/${tag_id}`, {
						method: "DELETE",
						headers: {
							"Authorization": "Bearer " + localStorage.getItem("jwt-token")
						},
					});

					if (!response.ok) {
						throw new Error("Delete tag failed");
					}

					actions.showTags();
					console.log(`Tag id ${tag_id} deleted successfully`);
					alert("Tag deleted successfully")

				} catch (error) {
					console.error(error);
					alert(error)
				}
			},


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
