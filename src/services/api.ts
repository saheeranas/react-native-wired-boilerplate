import request from './request';

//  Fake login service
export const login = data => {
  let userResp = {
    data: {
      message: 'Login Success',
      user: {
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        access_token: 'TOKEN_FROM_SERVER',
        refresh_token: 'R_TOKEN_FROM_SERVER',
      },
    },
  };

  return new Promise((resolve, reject) => {
    if (data.username !== 'demo@demo.com' && data.password !== '12345678') {
      reject(new Error('Incorrect credentials'));
    }

    resolve(userResp);
  });
};

// Actual login service
// export const login = data => {
//   return request.post('login', data);
// };

// GET USERS
export const getUsers = () => {
  return request.get('users').then(res => res.data.slice(0, 3));
};

export const createUser = (payload: any) => {
  return request.post('users', payload);
};

// GET TODOS
export const getTodos = () => {
  return request.get('todos').then(res => res.data.slice(0, 3));
};

// Create - POST TODO
export const createTodo = (payload: any) => {
  return request.post('todos', payload);
};
