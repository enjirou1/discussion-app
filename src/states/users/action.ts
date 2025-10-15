/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @TODO: Define all the actions (creator) for the users state
 */
import type { User } from '@/utils/type';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

export type UserAction = {
  type: string
  payload: UserState | null
}

export type UserState = {
  users: User[],
  loading: boolean,
  error: string | null
}

export const initialUserState: UserState = {
  users: [],
  loading: false,
  error: null
};

function receiveUsersActionCreator(users: User[], loading: boolean, error: string | null): UserAction {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
      loading,
      error
    }
  };
}

function asyncReceiveUsers() {
  return async (dispatch: any) => {
    dispatch(receiveUsersActionCreator([], true, null));

    try {
      const users = await api.getAllUsers();
      dispatch(receiveUsersActionCreator(users, false, null));
    } catch (error) {
      dispatch(receiveUsersActionCreator([], false, (error as Error).message));
    }
  };
}

function asyncRegisterUser({ name, email, password }: { name: string, email: string, password: string }) {
  return async (dispatch: any) => {
    dispatch(receiveUsersActionCreator([], true, null));
    try {
      const result = await api.register({ name, email, password });
      dispatch(receiveUsersActionCreator([result], false, null));
    } catch (error) {
      dispatch(receiveUsersActionCreator([], false, (error as Error).message));
    }
  };
}

export {
  ActionType,
  receiveUsersActionCreator,
  asyncReceiveUsers,
  asyncRegisterUser
};