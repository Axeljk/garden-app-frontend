const URL_PREFIX = "https://peas-by-spring-database.herokuapp.com"; //process.env.DB_ADDRESS || "http://localhost:3001";

const API = {
  checkToken: (token) => {
    return fetch(`${URL_PREFIX}/api/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // User routes:
  login: (username, email, password) => {
    return fetch(`${URL_PREFIX}/api/users/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  signup: (username, email, password) => {
    return fetch(`${URL_PREFIX}/api/users`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  editUser: (userId, data) => {
    return fetch(`${URL_PREFIX}/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
		"Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
  },
  getUser: (userId) => {
    return fetch(`${URL_PREFIX}/api/users/${userId}`);
  },
  deleteUser: (userId) => {
    return fetch(`${URL_PREFIX}/api/users/${userId}`, {
      method: "DELETE",
    });
  },

  // Garden routes:
  getGarden: (gardenId) => {
    return fetch(`${URL_PREFIX}/api/gardens/${gardenId}`, {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}
	});
  },
  editGarden: (data, id) => {
    return fetch(`${URL_PREFIX}/api/gardens/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
		"Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
  },
  deleteGarden: (id, userId) => {
    return fetch(`${URL_PREFIX}/api/gardens/${id}`, {
      method: "DELETE",
	  body: JSON.stringify(userId),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
  saveNewGarden: (data) => {
    return fetch(`${URL_PREFIX}/api/gardens/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  //Plant routes:
  getPlant: (token, plantId) => {
		return fetch(`${URL_PREFIX}/api/plants/${plantId}`, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		});
  },
  addPlant: (data) => {
    return fetch(`${URL_PREFIX}/api/plants/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
		"Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
  },
  editPlant: (plantId, name, planted, previousYield, species) => {
    return fetch(`${URL_PREFIX}/api/plants/${plantId}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        planted,
        previousYield,
        species,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deletePlant: (plantId) => {
    return fetch(`${URL_PREFIX}/api/plants/${plantId}`, {
      method: "DELETE",
    });
  },
  getPlantImage(plant) {
	return fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${plant}&origin=*`)
		.then(res => res.json())
		.then(data => {
			let pageTitle = data.query.search[0].title;
			return fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${pageTitle}&origin=*`)
				.then( res => res.json())
				.then(data => data.query.pages[Object.getOwnPropertyNames(data.query.pages)[0]].original.source);
		});
  },

  addSpecimen: (data) => {
    return fetch(`${URL_PREFIX}/api/specimens/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`, Probably don't need validation to add a specimen
      },
    });
  },
// Event routes:
getEvents: () => {
  return fetch(`${URL_PREFIX}/api/events/`, {
  headers: {
    "Content-Type": "application/json",
    }
});
},



};

export default API;
