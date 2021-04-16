import http from './base-api-service';

export const register = (user) => http.post('/users', user);

export const login = (email, password) => http.post('/login', { email, password });

export const user = (user) => http.get(`/${user}`);

const service = {
  register,
  login,
  user,
}

export default service;