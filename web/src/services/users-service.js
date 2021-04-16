import http from './base-api-service';

export const register = (user) => http.post('/users', user)

export const login = (email, password) => http.post('/login', { email, password })