import request from './request';

export const login = data => {
  return request.post('login', data);
};

export const getUsers = () => {
  return request.get('users');
};
