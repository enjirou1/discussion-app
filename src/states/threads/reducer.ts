/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import type { Reducer } from '@reduxjs/toolkit';
import { ActionType, initialThreadState, type ThreadAction, type ThreadState } from './action';

const threadsReducer: Reducer<ThreadState, any> = (payload: ThreadState = initialThreadState, action: ThreadAction) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload!;
    case ActionType.ADD_THREAD:
      if (action.payload!.thread === null) return payload;
      action.payload!.threads = [action.payload!.thread!, ...(payload.threads ?? [])];
      return action.payload!;
    case ActionType.UPVOTE_THREAD:
      action.payload!.threads = (payload.threads ?? []).map((thread) => {
        if (thread.id === action.payload!.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload!.userId!)
              ? thread.upVotesBy.filter((id) => id !== action.payload!.userId)
              : thread.upVotesBy.concat([action.payload!.userId!]),
            downVotesBy: thread.downVotesBy.includes(action.payload!.userId!)
              ? thread.downVotesBy.filter((id) => id !== action.payload!.userId)
              : thread.downVotesBy
          };
        }
        return thread;
      });
      return action.payload!;
    case ActionType.DOWNVOTE_THREAD:
      action.payload!.threads = (payload.threads ?? []).map((thread) => {
        if (thread.id === action.payload!.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload!.userId!)
              ? thread.upVotesBy.filter((id) => id !== action.payload!.userId)
              : thread.upVotesBy,
            downVotesBy: thread.downVotesBy.includes(action.payload!.userId!)
              ? thread.downVotesBy.filter((id) => id !== action.payload!.userId)
              : thread.downVotesBy.concat([action.payload!.userId!]),
          };
        }
        return thread;
      });
      return action.payload!;
    case ActionType.NEUTRALIZE_THREAD:
      action.payload!.threads = (payload.threads ?? []).map((thread) => {
        if (thread.id === action.payload!.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload!.userId!)
              ? thread.upVotesBy.filter((id) => id !== action.payload!.userId)
              : thread.upVotesBy,
            downVotesBy: thread.downVotesBy.includes(action.payload!.userId!)
              ? thread.downVotesBy.filter((id) => id !== action.payload!.userId)
              : thread.downVotesBy,
          };
        }
        return thread;
      });
      return action.payload!;
    default:
      return payload;
  }
};

export default threadsReducer;