import http from './base-api-service';

export const register = (user) => http.post('/users', user);
export const login = (email, password) => http.post('/login', { email, password });

export const user = (user) => http.get(`/${user}`);

export const follow = (user) => http.post(`/${user}/follow`);
export const unfollow = (user) => http.delete(`/${user}/follow`);
export const following = (user) => http.get(`/${user}/following`);
export const followers = (user) => http.get(`/${user}/followers`);

const service = {
  register,
  login,
  user,
  follow,
  unfollow,
  following,
  followers
}

export default service;