/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import type { Reducer } from '@reduxjs/toolkit';
import { ActionType, initialThreadDetailState, type ThreadDetailAction, type ThreadDetailState } from './action';

const threadDetailReducer: Reducer<ThreadDetailState, any> = (payload: ThreadDetailState = initialThreadDetailState, action: ThreadDetailAction) => {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload!;
    case ActionType.ADD_COMMENT:
      if (action.payload!.comment === null) return payload;
      action.payload!.threadDetail = {
        ...payload.threadDetail!,
        comments: [action.payload!.comment!, ...(payload.threadDetail!.comments ?? [])]
      };
      return action.payload!;
    case ActionType.UPVOTE_THREAD_DETAIL:
      action.payload!.threadDetail = {
        ...payload.threadDetail!,
        upVotesBy: payload.threadDetail!.upVotesBy.includes(action.payload!.userId!)
          ? payload.threadDetail!.upVotesBy.filter((id) => id !== action.payload!.userId)
          : payload.threadDetail!.upVotesBy.concat([action.payload!.userId!]),
        downVotesBy: payload.threadDetail!.downVotesBy.includes(action.payload!.userId!)
          ? payload.threadDetail!.downVotesBy.filter((id) => id !== action.payload!.userId)
          : payload.threadDetail!.downVotesBy
      };
      return action.payload!;
    case ActionType.DOWNVOTE_THREAD_DETAIL:
      action.payload!.threadDetail = {
        ...payload.threadDetail!,
        upVotesBy: payload.threadDetail!.upVotesBy.includes(action.payload!.userId!)
          ? payload.threadDetail!.upVotesBy.filter((id) => id !== action.payload!.userId)
          : payload.threadDetail!.upVotesBy,
        downVotesBy: payload.threadDetail!.downVotesBy.includes(action.payload!.userId!)
          ? payload.threadDetail!.downVotesBy.filter((id) => id !== action.payload!.userId)
          : payload.threadDetail!.downVotesBy.concat([action.payload!.userId!])
      };
      return action.payload!;
    case ActionType.NEUTRALIZE_THREAD_DETAIL:
      action.payload!.threadDetail = {
        ...payload.threadDetail!,
        upVotesBy: payload.threadDetail!.upVotesBy.includes(action.payload!.userId!)
          ? payload.threadDetail!.upVotesBy.filter((id) => id !== action.payload!.userId)
          : payload.threadDetail!.upVotesBy,
        downVotesBy: payload.threadDetail!.downVotesBy.includes(action.payload!.userId!)
          ? payload.threadDetail!.downVotesBy.filter((id) => id !== action.payload!.userId)
          : payload.threadDetail!.downVotesBy
      };
      return action.payload!;
    case ActionType.UPVOTE_COMMENT_THREAD_DETAIL:
      action.payload!.threadDetail = {
        ...payload.threadDetail!,
        comments: (payload.threadDetail?.comments ?? []).map((comment) => {
          if (comment.id === action.payload!.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload!.userId!)
                ? comment.upVotesBy.filter((id) => id !== action.payload!.userId)
                : comment.upVotesBy.concat([action.payload!.userId!]),
              downVotesBy: comment.downVotesBy.includes(action.payload!.userId!)
                ? comment.downVotesBy.filter((id) => id !== action.payload!.userId)
                : comment.downVotesBy
            };
          }
          return comment;
        })
      };
      return action.payload!;
    case ActionType.DOWNVOTE_COMMENT_THREAD_DETAIL:
      action.payload!.threadDetail = {
        ...payload.threadDetail!,
        comments: (payload.threadDetail?.comments ?? []).map((comment) => {
          if (comment.id === action.payload!.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload!.userId!)
                ? comment.upVotesBy.filter((id) => id !== action.payload!.userId)
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(action.payload!.userId!)
                ? comment.downVotesBy.filter((id) => id !== action.payload!.userId)
                : comment.downVotesBy.concat([action.payload!.userId!])
            };
          }
          return comment;
        })
      };
      return action.payload!;
    case ActionType.NEUTRALIZE_COMMENT_THREAD_DETAIL:
      action.payload!.threadDetail = {
        ...payload.threadDetail!,
        comments: (payload.threadDetail?.comments ?? []).map((comment) => {
          if (comment.id === action.payload!.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload!.userId!)
                ? comment.upVotesBy.filter((id) => id !== action.payload!.userId)
                : comment.upVotesBy,
              downVotesBy: comment.downVotesBy.includes(action.payload!.userId!)
                ? comment.downVotesBy.filter((id) => id !== action.payload!.userId)
                : comment.downVotesBy,
            };
          }
          return comment;
        })
      };
      return action.payload!;
    default:
      return payload;
  }
};

export default threadDetailReducer;