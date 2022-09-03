import { ZoomInOutlined } from "@mui/icons-material";

const URL_PREFIX = process.env.PORT || "http://localhost:3001";

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
  editUser: (userId, username, email, password, location) => {
    return fetch(`${URL_PREFIX}/api/users/${userId}`, {
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
    return fetch(`${URL_PREFIX}/api/gardens/${gardenId}`);
  },
  editGarden: (
    gardenId,
    name,
    height,
    width,
    direction,
    startDate,
    endDate,
    current,
    plants
  ) => {
    return fetch(`${URL_PREFIX}/api/gardens/${gardenId}`, {
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
  deleteGarden: (gardenId) => {
    return fetch(`${URL_PREFIX}/api/gardens/${gardenId}`, {
      method: "DELETE",
    });
  },
  saveNewGarden: (token, name, garden) => {
    return fetch(`${URL_PREFIX}/api/gardens/`, {
      method: "POST",
      body: JSON.stringify({
        // name,
        // description,
        // height,
        // width,
        // direction,
        // startDate,
        // endDate,
        // current,
        // specimens,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  //Plant routes:
  getPlant: (plantId) => {
    return fetch(`${URL_PREFIX}/api/plants/${plantId}`);
  },
  addPlant: (
    form, user
    //TODO: Add Form. Form is the target on the event. Pass in event.target on calling this function
  ) => {
    return fetch(`${URL_PREFIX}/api/plants/`, {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        name: form[0].value,
        type: form[2].value,
        grownHeight: form[4].value,
        grownWidth: form[6].value,
        harvestBloomDate: form[8].value,
        lifespan: form[10].value,
        usdaZone: form[12].value,
        water: form[14].value,
        //form[0].value...      NOT event.target[0].value, event.target[2].value
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
