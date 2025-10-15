/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Reducer } from '@reduxjs/toolkit';
import { ActionType, initialLeaderboardState, type LeaderboardAction, type LeaderboardState } from './action';

const leaderboardsReducer: Reducer<LeaderboardState, any> = (payload: LeaderboardState = initialLeaderboardState, action: LeaderboardAction) => {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload!;
    default:
      return payload;
  }
};

export default leaderboardsReducer;