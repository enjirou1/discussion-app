/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Leaderboard } from '@/utils/type';
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

export type LeaderboardAction = {
  type: string
  payload: LeaderboardState | null
}

export type LeaderboardState = {
  leaderboards: Leaderboard[],
  loading: boolean,
  error: string | null
}

export const initialLeaderboardState: LeaderboardState = {
  leaderboards: [],
  loading: false,
  error: null
};

function receiveLeaderboardsActionCreator(leaderboards: Leaderboard[], loading: boolean, error: string | null): LeaderboardAction {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
      loading,
      error
    }
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch: any) => {
    dispatch(showLoading());
    dispatch(receiveLeaderboardsActionCreator([], true, null));

    try {
      const leaderboards = await api.getLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards, false, null));
    } catch (error) {
      dispatch(receiveLeaderboardsActionCreator([], false, (error as Error).message));
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards
};