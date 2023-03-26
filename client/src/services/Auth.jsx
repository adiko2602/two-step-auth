import axios from "axios";

const api = "localhost:5000";

export async function Login(email, password) {
  return await axios
    .post(`${api}/auth/login`, { email, password })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function Register(email, password) {
  return await axios
    .post(`${api}/auth/register`, { email, password })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

export async function Token(token) {
  return await axios
    .post(`${api}/auth/login/token`, { token })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
