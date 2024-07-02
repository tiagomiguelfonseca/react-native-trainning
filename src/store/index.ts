/**
 * @author Himanshu Yadav
 * @email himanshu.yadav@studiographene.com
 * @create date 2022-07-12 16:16:59
 * @modify date 2022-07-12 16:45:35
 * @desc Redux store file
 */

import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import rootReducer from './RootReducer';

//Enable redux flipper plugin in dev mode

const middlewares: any[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useReduxDispatch = () => useDispatch<AppDispatch>();

export default store;
