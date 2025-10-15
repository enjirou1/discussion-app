/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import type { Reducer } from '@reduxjs/toolkit';
import { ActionType, initialAuthState, type AuthAction, type AuthState } from './action';

const authUserReducer: Reducer<AuthState, any> = (payload: AuthState = initialAuthState, action: AuthAction) => {
  switch (action.type) {
    case ActionType.SET_AUTH_USER:
      return action.payload!;
    case ActionType.UNSET_AUTH_USER:
      return action.payload!;
    default:
      return payload;
  };
};

export default authUserReducer;