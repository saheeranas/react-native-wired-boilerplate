import {getSecureValue, setSecureValue} from './keychain';
import {updateAxiosHeaders} from '../services/request';

const TOKEN_CACHE = {access_token: ''};

const setTokenCache = token => {
  TOKEN_CACHE.access_token = token;
  updateAxiosHeaders();
};

export const updateTokenCacheFromLocal = () => {
  getSecureValue('access_token')
    .then(token => {
      console.log('Got from storage');
      console.log(token);
      setTokenCache(token);
    })
    .catch(err => {
      console.log('No token Found');
      console.log(err);
      // return err;
    });
};

/**
 * getToken()
 * get ACCESS TOKEN from secure storage and return
 * - If exists in Cache, return from cache
 * - Else get from keychain, set in cache then return token
 * - Do not return error. Handle error here itself
 */
export const getToken = () => {
  console.log('called');
  return TOKEN_CACHE.access_token;
};

/**
 * setToken()
 * set ACCESS TOKEN, REFRESH TOKEN to secure storage
 * -
 */
export const setToken = async (access_token, refresh_token) => {
  // let promises = [
  //   setSecureValue('access_token', access_token),
  //   setSecureValue('refresh_token', refresh_token),
  // ];
  setSecureValue('access_token', access_token)
    .then(res => {
      // console.log(res);
      setTokenCache(access_token);
    })
    .catch(err => console.log(err));
  // Promise.allSettled(promises)
  //   .then(results => {
  //     TOKEN_CACHE.access_token = access_token;
  //     console.log(results);
  //   })
  //   .catch(err => {
  //     console.log('~~~~Set token catch~~~~');
  //     console.log(err);
  //     // return err;
  //   });
};

/**
 * Request ACCESS TOKEN using REFRESH TOKEN
 * - ONLY request if there is refresh token present
 * - Accessing store directly since useDispatch doesn't work outside react component
 */
// export const requestNewToken = async () => {
//   // 1. Get refresh token from keychain
//   getSecureValue('refresh_token')
//     // 2. Request a new access token
//     .then(rtoken => {
//       if (!rtoken) {
//         throw new Error('Login Failed');
//       }
//       return login(
//         new URLSearchParams({
//           grant_type: 'refresh_token',
//           refresh_token: rtoken,
//         }),
//       );
//     })
//     // 3. Parsing new token from response
//     .then(response => response.data.access_token)
//     .then(acToken => {
//       // 4. Save received token to keyring
//       setSecureValue('token', acToken);
//       // 5. Save received token to redux store
//       // store.dispatch(updateToken({token: acToken}));
//     })
//     .catch(err => console.log('requestNewToken()', err));
// };
