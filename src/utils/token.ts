import {getSecureValue, setSecureValue, removeSecureValue} from './keychain';
import {updateAxiosHeaders} from '../services/request';

// Cache variable for storing token for easy access
const TOKEN_CACHE = {access_token: ''};

/**
 * setTokenCache()
 * - set access token in cache dictionary
 * - update token in Axios instance
 */
const setTokenCache = (token: string) => {
  TOKEN_CACHE.access_token = token;
  updateAxiosHeaders();
};

/**
 * updateTokenCacheFromLocal()
 * - get access token from secure storage
 * - update the token in cache
 */
const updateTokenCacheFromLocal = () => {
  return getSecureValue('access_token')
    .then(token => {
      setTokenCache(token);
      return token;
    })
    .catch(() => {});
};

/**
 * getToken()
 * get ACCESS TOKEN from secure storage and return
 * - If exists in Cache, return from cache
 * - Else get from keychain, set in cache then return token
 * - Do not return error. Handle error here itself
 */
export const getToken = async () => {
  if (TOKEN_CACHE.access_token !== '') {
    return Promise.resolve(TOKEN_CACHE.access_token);
  } else {
    let token = await updateTokenCacheFromLocal();
    return Promise.resolve(token);
  }
};

/**
 * setToken()
 * set ACCESS TOKEN, REFRESH TOKEN to secure storage
 * set access token to cache
 */
export const setToken = async (access_token: string, refresh_token: string) => {
  let promises = [
    setSecureValue('access_token', access_token),
    setSecureValue('refresh_token', refresh_token),
  ];
  Promise.all(promises)
    .then(() => {
      setTokenCache(access_token);
    })
    .catch(() => {});
};

/**
 * removeTokens()
 * Delete all tokens
 */
export const removeTokens = () => {
  let promises = [
    removeSecureValue('access_token'),
    removeSecureValue('refresh_token'),
  ];
  Promise.all(promises)
    .then(() => {
      setTokenCache('');
      updateAxiosHeaders();
    })
    .catch(() => {});
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
