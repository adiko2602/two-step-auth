import axios from "axios";

const api = "http://127.0.0.1:8000";

export async function Login(email, password) {
  return await axios
    .post(`${api}/auth/login`, { email, password })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}

export async function Register(email, password) {
  return await axios
    .post(`${api}/auth/register`, { email, password })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}

export async function Token(totp, jwt) {
  return await axios
    .post(`${api}/auth/verify-totp`, { totp },
      {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}
