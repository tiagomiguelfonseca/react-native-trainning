/**
 * @author Meghna Malhotra
 * @email meghna.malhotra@studiographene.com
 * @create date 2022-06-30 14:13:20
 * @modify date 2023-09-09 13:22:09
 * @desc Util file for AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import Logger from './LoggerUtil';

/**
 * The function sets an asynchronous storage item with a given key and data, converting the data to a
 * string if it is not already.
 * @param key - The key is a unique identifier for the data you want to store in AsyncStorage. It is
 * used to retrieve the data later on.
 * @param data - The `data` parameter is the value that you want to store in the AsyncStorage. It can
 * be of any type, but if it is not a string, it will be converted to a JSON string using
 * `JSON.stringify()` before storing it in AsyncStorage.
 */
export const setAsync = async function (key: string, data: any): Promise<void> {
  try {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    Logger.warn('Async Error set error', error);
  }
};

/**
 * The function `getAsync` is an asynchronous function that retrieves data from AsyncStorage in
 * JavaScript, with an optional parameter to parse the data if needed.
 * @param key - The key is a string that represents the key of the data you want to retrieve from
 * AsyncStorage. It is used to identify the specific data you want to get.
 * @param [isParsed=false] - The `isParsed` parameter is a boolean flag that indicates whether the
 * retrieved data should be parsed as JSON or not. If `isParsed` is `true`, the retrieved data will be
 * parsed as JSON using `JSON.parse()`. If `isParsed` is `false` or not provided,
 * @returns the value stored in AsyncStorage with the given key. If the `isParsed` parameter is set to
 * `true`, the function will parse the stored value as JSON before returning it.
 */
export const getAsync = async function (
  key: string,
  isParsed: boolean = false,
): Promise<any> {
  try {
    let data = await AsyncStorage.getItem(key);
    if (data && isParsed) {
      data = JSON.parse(data);
    }
    return data;
  } catch (error) {
    Logger.warn('Async Error get error', error);
  }
};

/**
 * The function removes an item from AsyncStorage in JavaScript using async/await syntax.
 * @param key - The key is a string that represents the unique identifier for the data you want to
 * remove from AsyncStorage.
 */
export const removeAsync = async function (key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Logger.warn('Async Error remove error', error);
  }
};

/**
 * The function clears all data stored in AsyncStorage and logs an error if one occurs.
 */
export const clearAsync = async function (): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    Logger.warn('Async Error clear error', error);
  }
};

/**
 * The function sets an encrypted item asynchronously in storage, converting the data to a string if it
 * is not already.
 * @param key - The key is a unique identifier for the data that you want to store in the encrypted
 * storage. It is used to retrieve the data later when needed.
 * @param data - The `data` parameter is the value that you want to store in the encrypted storage. It
 * can be of any type, but if it is not a string, it will be converted to a JSON string using
 * `JSON.stringify()` before storing it.
 */
export const setAsyncEncrypted = async function (
  key: string,
  data: any,
): Promise<void> {
  try {
    if (typeof data !== 'string') {
      data = JSON.stringify(data);
    }
    await EncryptedStorage.setItem(key, data);
  } catch (error) {
    Logger.warn('Async Error set error', error);
  }
};

/**
 * The function `getAsyncEncrypted` retrieves an item from encrypted storage asynchronously, optionally
 * parsing the data if specified.
 * @param key - The key parameter is a string that represents the key used to retrieve the data from
 * the encrypted storage.
 * @param [isParsed=false] - The `isParsed` parameter is a boolean flag that indicates whether the
 * retrieved data should be parsed as JSON. If `isParsed` is `true`, the retrieved data will be parsed
 * using `JSON.parse()` before being returned. If `isParsed` is `false` or not provided, the
 * @returns the value of the `data` variable.
 */
export const getAsyncEncrypted = async function (
  key: string,
  isParsed: boolean = false,
): Promise<any> {
  try {
    let data = await EncryptedStorage.getItem(key);
    if (data && isParsed) {
      data = JSON.parse(data);
    }
    return data;
  } catch (error) {
    Logger.warn('Async Error get error', error);
  }
};

/**
 * The function removes an item from EncryptedStorage asynchronously, and logs a warning if there is an
 * error.
 * @param key - The `key` parameter is a string that represents the key or identifier of the item you
 * want to remove from the `EncryptedStorage`.
 */
export const removeAsyncEncrypted = async function (
  key: string,
): Promise<void> {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (error) {
    Logger.warn('Async Error remove error', error);
  }
};

/**
 * The function clears the async encrypted storage and logs a warning if there is an error.
 */
export const clearAsyncEncrypted = async function (): Promise<void> {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    Logger.warn('Async Error clear error', error);
  }
};
