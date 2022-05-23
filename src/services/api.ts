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

export const getUsers = () => {
  return request.get('users');
};
