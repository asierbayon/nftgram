import http from './base-api-service';

export const register = (user) => {
  console.log(user)
  http.post('/users', user)
};