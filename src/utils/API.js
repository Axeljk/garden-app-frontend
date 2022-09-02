const URL_PREFIX = process.env.PORT || "http://localhost:3001";

const API = {
  checkToken: (token) => {
    return fetch(`${URL_PREFIX}/api/profiles/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  // Profile routes:
  login: (username, email, password) => {
    return fetch(`${URL_PREFIX}/api/profiles/login`, {
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
    return fetch(`${URL_PREFIX}/api/profiles`, {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  editProfile: (profileId, username, email, password, location) => {
    return fetch(`${URL_PREFIX}/api/plants/${profileId}`, {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
        location,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getProfile: (profileId) => {
    return fetch(`${URL_PREFIX}/api/layouts/${profileId}`);
  },
  deleteProfile: (profileId) => {
    return fetch(`${URL_PREFIX}/api/plants/${profileId}`, {
      method: "DELETE",
    });
  },

  // Layout routes:
  getLayout: (layoutId) => {
    return fetch(`${URL_PREFIX}/api/layouts/${layoutId}`);
  },
  editLayout: (
    layoutId,
    name,
    height,
    width,
    direction,
    startDate,
    endDate,
    current,
    plants
  ) => {
    return fetch(`${URL_PREFIX}/api/layouts/${layoutId}`, {
      method: "POST",
      body: JSON.stringify({
        name,
        height,
        width,
        direction,
        startDate,
        endDate,
        current,
        plants,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  deleteLayout: (layoutId) => {
    return fetch(`${URL_PREFIX}/api/layouts/${layoutId}`, {
      method: "DELETE",
    });
  },

  //Plant routes:
  getPlant: (plantId) => {
    return fetch(`${URL_PREFIX}/api/plants/${plantId}`);
  },
  addPlant: (name, planted, previousYield, species) => {
    return fetch(`${URL_PREFIX}/api/plants/`, {
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
};

export default API;
