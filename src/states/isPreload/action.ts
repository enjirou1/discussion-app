/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

export type PreloadAction = {
  type: string
  payload: PreloadState | null
}

export type PreloadState = {
  isPreload: boolean
}

export const initialAuthState: PreloadState = {
  isPreload: false
};

function setIsPreloadActionCreator(isPreload: boolean): PreloadAction {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch: any) => {
    dispatch(setAuthUserActionCreator(null, true, null));
    try {
      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser, false, null));
    } catch (error) {
      dispatch(setAuthUserActionCreator(null, false, (error as Error).message));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
    }
  };
}

export {
  ActionType,
  setIsPreloadActionCreator,
  asyncPreloadProcess,
};