import store from '../store/index';

export type ReduxState = ReturnType<typeof store.getState>;
export type ReduxDispatch = typeof store.dispatch;
export type VoidFunction = () => void;
export type FunctionWithOneParam = (value: any) => void;
export type FunctionWithTwoParam = (value1: any, value2: any) => void;
export type FunctionWithThreeParam = (
  value1: any,
  value2: any,
  value3: any,
) => void;

export type ArbitraryObject = {[key: string]: any};
