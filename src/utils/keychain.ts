import * as Keychain from 'react-native-keychain';

export const setSecureValue = async (key: string, value: string) =>
  await Keychain.setGenericPassword(
    key /* <- can be a random string */,
    value,
    {service: key},
  );

export const getSecureValue = async (key: string) => {
  const result = await Keychain.getGenericPassword({service: key});
  if (result) {
    return Promise.resolve(result.password);
  }
  return Promise.reject(false);
};

export const removeSecureValue = async (key: string) =>
  await Keychain.resetGenericPassword({service: key});
