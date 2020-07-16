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
        username: user.username,
        password: user.password
    }

    return axios.post('http://localhost:5000/users/login', returningUser)
    .then(response => {
        console.log(response.data);
        if (typeof response.data === 'string'){
        localStorage.setItem('usertoken', response.data)
        } else {
          console.log("password incorrect");
        }
        return response.data
      })
}

export const getProfile = user => {
    return axios
      .get('users/profile', {
        //headers: { Authorization: ` ${this.getToken()}` }
      })
      .then(response => {
        console.log(response)
        return response.data
      })
      .catch(err => {
        console.log(err)
      })
  }