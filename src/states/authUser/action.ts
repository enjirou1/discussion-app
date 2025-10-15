/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LoginPayload, User } from '@/utils/type';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER'
};

export type AuthAction = {
  type: string
  payload: AuthState | null
}

export type AuthState = {
  authUser: User | null,
  loading: boolean,
  error: string | null
}

export const initialAuthState: AuthState = {
  authUser: null,
  loading: false,
  error: null
};

function setAuthUserActionCreator(authUser: User | null, loading: boolean, error: string | null): AuthAction {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
      loading: loading ?? false,
      error: error
    }
  };
}

function unsetAuthUserActionCreator(): AuthAction {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
      loading: false,
      error: null
    }
  };
}

function asyncSetAuthUser({ email, password }: LoginPayload) {
  return async (dispatch: any) => {
    dispatch(setAuthUserActionCreator(null, true, null));
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser, false, null));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null, false, (error as Error).message));
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch: any) => {
    dispatch(unsetAuthUserActionCreator());
    api.putAccessToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
};