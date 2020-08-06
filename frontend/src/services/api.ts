import axios from 'axios';

function getToken() {
  const token = localStorage.getItem('@AGSchedules:token');

  if (token) {
    return token;
  }

  return null;
}

const api = axios.create({
  baseURL: 'http://localhost:3333/',
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export default api;
