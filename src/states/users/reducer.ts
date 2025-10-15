/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Reducer } from '@reduxjs/toolkit';
import { ActionType, initialUserState, type UserAction, type UserState } from './action';

const usersReducer: Reducer<UserState, any> = (payload: UserState = initialUserState, action: UserAction) => {
  switch (action.type) {
    case ActionType.RECEIVE_USERS:
      return action.payload!;
    default:
      return payload;
  }
};

export default usersReducer;