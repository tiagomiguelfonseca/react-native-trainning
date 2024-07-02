import Urls from '../../network/NetworkUrls';
import NetworkManager from '../../network/NetworkManager';
import {GET_USER_LIST, LOGOUT, SAVE_USER_DATA} from './Constants';
import {parseUserList} from './ParseData';
import {removeAsync, setAsyncEncrypted} from '../../utils/AsyncUtil';
import {AsyncKeys} from '../../constants/Constants';
import {FunctionWithOneParam, VoidFunction} from '../../types/commonTypes';
import {UserData} from '../../types/user';

export const getUserList =
  (onSuccess: FunctionWithOneParam, onError?: VoidFunction) =>
  async (dispatch: any) => {
    const apiResponse = await NetworkManager.get(Urls.userList);
    if (apiResponse?.apiSuccess && apiResponse?.responseData?.length) {
      const parsedData = parseUserList(apiResponse?.responseData);
      dispatch({
        type: GET_USER_LIST,
        userList: parsedData,
      });
      onSuccess?.(parsedData);
    } else {
      onError?.();
    }
  };

export const login =
  (onSuccess: FunctionWithOneParam) => (dispatch: Function) => {
    // Using dummy data to imitate auth flow
    const userData = {
      id: 1,
      name: 'Jon Doe',
      email: 'doejon@gmail.com',
      token: 'akdladkflankflasdkfalsdalkskda',
    };
    dispatch(setUserData(userData));
    saveData(userData);
    onSuccess?.(userData);
  };

export const register =
  (onSuccess: FunctionWithOneParam) => (dispatch: Function) => {
    // Using dummy data to imitate auth flow
    const userData = {
      id: 1,
      name: 'Jon Doe',
      email: 'doejon@gmail.com',
      token: 'akdladkflankflasdkfalsdalkskda',
    };
    dispatch(setUserData(userData));
    saveData(userData);
    onSuccess?.(userData);
  };

export const logout = (onSuccess = () => {}) => {
  onSuccess();
  NetworkManager.setAuthToken(null);
  removeAsync(AsyncKeys.userData);
  return {
    type: LOGOUT,
  };
};

export const setUserData = (data: UserData) => {
  NetworkManager.setAuthToken(data.token);
  return {
    type: SAVE_USER_DATA,
    userData: data,
  };
};

export const saveData = (data: UserData) => {
  setAsyncEncrypted(AsyncKeys.userData, data);
};
