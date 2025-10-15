/* eslint-disable indent */
import type { Reducer } from '@reduxjs/toolkit';
import { ActionType } from './action';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isPreloadReducer: Reducer<boolean, any> = (isPreload = true, action = {}) => {
  switch (action.type) {
    case ActionType.SET_IS_PRELOAD:
      return action.payload.isPreload;
    default:
      return isPreload;
  }
};

export default isPreloadReducer;