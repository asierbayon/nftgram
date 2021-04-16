import http from './base-api-service';

export const feed = () => http.get('/feed');

export const like = (id) => http.post(`/assets/${id}/likes`);

export const unlike = (id) => http.delete(`/assets/${id}/likes`);

const service = {
  feed,
  like,
  unlike,
}

export default service;