const URL_PREFIX = process.env.PORT || "http://localhost:3001"

const API = {
    checkToken:token=>{
        return fetch(`${URL_PREFIX}/api/profiles/token`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    },
    login: (username, email, password) => {

        return fetch(`${URL_PREFIX}/api/profiles/login`,{
            method: 'POST',
            body:JSON.stringify({
				username: username,
                email: email,
                password: password
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })
    },
    signup: (username, email, password) => {
        return fetch(`${URL_PREFIX}/api/profiles`,{
            method: 'POST',
            body:JSON.stringify({
				username,
                email,
                password
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })
    },
    saveNewLayout:(token,name,garden) => {
        return fetch(`${URL_PREFIX}/layout/`,{
            method: 'POST',
            body:JSON.stringify({
                // name,
                garden
            }),
            headers: {
                'Content-Type':'application/json',
                Authorization:`Bearer ${token}`
            }
        })
    }
}

export default API;