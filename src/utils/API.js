const URL_PREFIX = process.env.PORT || 3001

const API = {
    checkToken:token=>{
        return fetch(`${URL_PREFIX}/users/check-token`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    },
    login: (email,password) => {
        return fetch(`${URL_PREFIX}/users/login`,{
            method: 'POST',
            body:JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })
    },
    signup: (email,password) => {
        return fetch(`${URL_PREFIX}/users/signup`,{
            method: 'POST',
            body:JSON.stringify({
                email,
                password
            }),
            headers: {
                'Content-Type':'application/json'
            }
        })
    }
}

export default API;