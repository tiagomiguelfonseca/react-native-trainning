/**
 * @author Himanshu Yadav
 * @email himanshu.yadav@studiographene.com
 * @create date 2022-07-12 16:55:19
 * @modify date 2022-11-09 15:00:25
 * @desc A wrapper class to manage network calls and responses
 */
import * as PromiseUtils from '../utils/PromiseUtil';
import NetInfo from '@react-native-community/netinfo';
import {Errors} from '../constants/Strings';
import {Platform} from 'react-native';
import Logger from '../utils/LoggerUtil';
import {ArbitraryObject} from '../types/commonTypes';

type ResponseError = Error & {
  status: number;
  res: any;
};

type RequestBody = BodyInit_ | null;
type RequestParams = ArbitraryObject | FormData | null;

const NETWORK_TIMEOUT = 30 * 1000;

export function jsonToQueryString(json: ArbitraryObject): string {
  const encodedParamsString = Object.keys(json)
    .map(function (key) {
      return `${encodeURIComponent(key)}=${encodeURIComponent(json[key])}`;
    })
    .join('&');
  return `?${encodedParamsString}`;
}

class NetworkManager {
  netStatus = true;
  netUnsubscribeFunc: null | Function = null;
  authToken: string | null = null;
  constructor() {
    this.netUnsubscribeFunc = NetInfo.addEventListener(state => {
      this.netStatus = state.isConnected ?? false;
    });
  }

  setAuthToken(newToken: string | null) {
    this.authToken = newToken;
  }

  async handleStatusCodes(
    error: ResponseError,
    errorResponse: ArbitraryObject,
  ) {
    Logger.log('errorResponse', JSON.stringify(errorResponse));
    switch (error.status) {
      case 401: {
        Logger.warn('Authorization Required');
        break;
      }
      case 403: {
        Logger.warn('Forbidden Access');
        break;
      }
      case 400: {
        Logger.warn('Bad Request');
        break;
      }
      case 500: {
        Logger.warn('Internal Server Error');
      }
    }
  }

  getHeader(
    type: string,
    options: RequestBody = null,
    isMultipart: boolean = false,
  ) {
    let returnData = {
      method: type,
      headers: {
        Accept: 'application/json',
        'Content-Type': isMultipart
          ? 'multipart/form-data'
          : 'application/json',
        platform: Platform.OS,
        //Add auth token(bearer or x-auth) here
        // 'x-auth-token': this.authToken ?? '',
      },
      body: options,
    };
    return returnData;
  }

  apiWrapper(url: string, type: string) {
    return this.apiWrapperWithOptions(url, type);
  }

  async apiWrapperWithOptions(
    url: string,
    type: string,
    options: RequestBody = null,
    isMultipart: boolean = false,
  ) {
    try {
      if (!this.netStatus) {
        throw new Error(Errors.noInternet);
      }
      const headers = this.getHeader(type, options, isMultipart);
      const start = new Date();
      const apiRes = fetch(url, headers);
      const res = await PromiseUtils.timeoutPromise(
        PromiseUtils.createTimeoutReject(NETWORK_TIMEOUT, () => {}),
        apiRes,
      );
      Logger.log('apiUrl', url);
      Logger.log('apiHeaders', headers);
      if (res.status !== 200) {
        throw {status: res.status, res: res};
      } else {
        const response = await res.json();
        Logger.log('successResponse', JSON.stringify(response));
        const timeTaken = new Date().getTime() - start.getTime();
        Logger.log('API timeTaken for URL', url, '##', timeTaken);
        return {responseData: response, apiSuccess: true};
      }
    } catch (error: ResponseError | any) {
      let errorResponse;
      if (error.res) {
        try {
          const response = await error.res.json();
          errorResponse = response;
        } catch (_) {
          errorResponse = {message: error.res.text()};
        }
      } else {
        errorResponse = {message: error.message};
      }
      error.status
        ? this.handleStatusCodes(error, errorResponse)
        : Logger.warn(error.message);
      return {responseData: errorResponse, apiSuccess: false};
    }
  }

  get(url: string, params: RequestParams = null) {
    const apiUrl = params ? `${url}${jsonToQueryString(params)}` : url;
    return this.apiWrapper(apiUrl, 'GET');
  }

  post(url: string, params: RequestParams = null) {
    const formattedParams = JSON.stringify(params);
    return this.apiWrapperWithOptions(url, 'POST', formattedParams);
  }

  postMultipart(url: string, params: FormData | null = null) {
    return this.apiWrapperWithOptions(url, 'POST', params, true);
  }

  put(url: string, params: RequestParams = null) {
    const formattedParams = JSON.stringify(params);
    return this.apiWrapperWithOptions(url, 'PUT', formattedParams);
  }

  patch(url: string, params: RequestParams = null) {
    const formattedParams = JSON.stringify(params);
    return this.apiWrapperWithOptions(url, 'PATCH', formattedParams);
  }

  delete(url: string, params: RequestParams = null) {
    const apiUrl = params ? `${url}${jsonToQueryString(params)}` : url;
    return this.apiWrapper(apiUrl, 'DELETE');
  }
}

export default new NetworkManager();
