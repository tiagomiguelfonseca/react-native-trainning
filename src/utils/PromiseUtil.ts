/**
 * @author Himanshu Yadav
 * @email himanshu.yadav@studiographene.com
 * @create date 2022-07-12 13:00:52
 * @modify date 2022-07-12 13:02:01
 * @desc Util file containing functions on promises
 */
import {Errors} from '../constants/Strings';
export function timeoutPromise(
  timeoutSpec: {timeoutMsec: number; timeoutFn: Function},
  promise: Promise<Response>,
): Promise<any> {
  const timeouter = new Promise((_, reject) => {
    setTimeout(
      () => wrappedReject(timeoutSpec, reject),
      timeoutSpec.timeoutMsec,
    );
  });
  return Promise.race([timeouter, promise]);
}

export function wrappedReject(
  timeoutSpec: {timeoutMsec: number; timeoutFn: Function},
  reject: {(reason?: any): void; (arg0: string): void},
) {
  if (timeoutSpec.timeoutFn) {
    timeoutSpec.timeoutFn(timeoutSpec.timeoutMsec);
  }
  reject(Errors.noInternet);
}

export function createTimeoutReject(msec: number, fn: Function) {
  return {timeoutMsec: msec, timeoutFn: fn};
}
