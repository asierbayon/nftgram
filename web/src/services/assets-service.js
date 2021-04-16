import http from './base-api-service';

export const feed = () => http.get('/feed')

const service = {
  feed,
}

export default service;