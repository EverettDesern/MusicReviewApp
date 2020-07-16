import axios from 'axios';


export const register = newUser => {
    const user = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    }

    console.log(user);

    return axios.post('http://localhost:5000/users/register', user)
        .then(res => {
            console.log('Registered!');
        })
}

export const login = user => {
    const returningUser = {
        email: user.email,
        password: user.password
    }

    return axios.post('http://localhost:5000/users/login', returningUser)
    .then(res => {
        localStorage.setItem("usertoken", res.data);
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}