import http from './base-api-service';

export const register = (user) => http.post('/users', user);
export const login = (user) => http.post('/login', user);
export const logout = () => http.post('/logout');
export const update = (user) => {
  console.log('patata', user)
  return http.put('/users', user)
};

export const user = (user) => http.get(`/${user}`);
export const search = (input) => http.get('/users', { params: { search: input } })

export const follow = (user) => http.post(`/${user}/follow`);
export const unfollow = (user) => http.delete(`/${user}/follow`);
export const following = (user) => http.get(`/${user}/following`);
export const followers = (user) => http.get(`/${user}/followers`);

const service = {
  register,
  login,
  logout,
  update,
  user,
  search,
  follow,
  unfollow,
  following,
  followers
}

export default service;