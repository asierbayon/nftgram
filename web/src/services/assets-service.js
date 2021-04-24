import http from './base-api-service';

export const feed = () => http.get('/feed');

export const asset = (id) => http.get(`/assets/${id}`)

export const like = (id) => http.post(`/assets/${id}/likes`);

export const unlike = (id) => http.delete(`/assets/${id}/likes`);

export const upload = (asset) => http.post('/assets', asset)

const service = {
  feed,
  asset,
  like,
  unlike,
  upload
}

export default service;