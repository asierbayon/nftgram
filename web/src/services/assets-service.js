import http from './base-api-service';

export const feed = () => http.get('/feed');

export const like = (id) => http.post(`/assets/${id}/like`);

const service = {
  feed,
  like
}

export default service;