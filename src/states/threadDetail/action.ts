/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Comment, ThreadDetail } from '@/utils/type';
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
  UPVOTE_THREAD_DETAIL: 'UPVOTE_THREAD_DETAIL',
  DOWNVOTE_THREAD_DETAIL: 'DOWNVOTE_THREAD_DETAIL',
  NEUTRALIZE_THREAD_DETAIL: 'NEUTRALIZE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UPVOTE_COMMENT_THREAD_DETAIL: 'UPVOTE_COMMENT_THREAD_DETAIL',
  DOWNVOTE_COMMENT_THREAD_DETAIL: 'DOWNVOTE_COMMENT_THREAD_DETAIL',
  NEUTRALIZE_COMMENT_THREAD_DETAIL: 'NEUTRALIZE_COMMENT_THREAD_DETAIL',
};

export type ThreadDetailAction = {
  type: string
  payload: ThreadDetailState | null
}

export type ThreadDetailState = {
  threadDetail?: ThreadDetail | null,
  userId?: string,
  commentId?: string
  comment?: Comment | null
  loading: boolean,
  error: string | null
}

export const initialThreadDetailState: ThreadDetailState = {
  threadDetail: null,
  userId: '',
  commentId: '',
  comment: null,
  loading: false,
  error: null
};

function receiveThreadDetailActionCreator(threadDetail: ThreadDetail | null, loading: boolean, error: string | null) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
      loading,
      error
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upvoteThreadDetailActionCreator(userId: string, loading: boolean, error: string | null) {
  return {
    type: ActionType.UPVOTE_THREAD_DETAIL,
    payload: {
      userId,
      loading,
      error
    },
  };
}

function downvoteThreadDetailActionCreator(userId: string, loading: boolean, error: string | null) {
  return {
    type: ActionType.DOWNVOTE_THREAD_DETAIL,
    payload: {
      userId,
      loading,
      error
    },
  };
}

function neutralizeThreadDetailActionCreator(userId: string, loading: boolean, error: string | null) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_DETAIL,
    payload: {
      userId,
      loading,
      error
    },
  };
}

function addComment(comment: Comment | null, loading: boolean, error: string | null) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
      loading,
      error
    },
  };
}

function upvoteCommentActionCreator(loading: boolean, error: string | null, { commentId, userId }: { commentId: string, userId: string }) {
  return {
    type: ActionType.UPVOTE_COMMENT_THREAD_DETAIL,
    payload: {
      commentId,
      userId,
      loading,
      error
    },
  };
}

function downvoteCommentActionCreator(loading: boolean, error: string | null, { commentId, userId }: { commentId: string, userId: string }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT_THREAD_DETAIL,
    payload: {
      commentId,
      userId,
      loading,
      error
    },
  };
}

function neutralizeCommentActionCreator(loading: boolean, error: string | null, { commentId, userId }: { commentId: string, userId: string }) {
  return {
    type: ActionType.NEUTRALIZE_COMMENT_THREAD_DETAIL,
    payload: {
      commentId,
      userId,
      loading,
      error
    },
  };
}

function asyncReceiveThreadDetail(threadId: string) {
  return async (dispatch: any) => {
    dispatch(showLoading());
    dispatch(receiveThreadDetailActionCreator(null, true, null));

    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail, false, null));
    } catch (error) {
      dispatch(receiveThreadDetailActionCreator(null, false, (error as Error).message));
    }

    setTimeout(() => {
      dispatch(hideLoading());
    }, 3000);
  };
}

function asyncUpvoteThreadDetail() {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser }, threadDetail: { threadDetail } } = getState();
    dispatch(upvoteThreadDetailActionCreator(authUser.id, false, null));

    try {
      await api.upvoteThread(threadDetail.id);
    } catch (error) {
      dispatch(upvoteThreadDetailActionCreator(authUser.id, false, (error as Error).message));
    }
  };
}

function asyncDownvoteThreadDetail() {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser }, threadDetail: { threadDetail } } = getState();
    dispatch(downvoteThreadDetailActionCreator(authUser.id, false, null));

    try {
      await api.downvoteThread(threadDetail.id);
    } catch (error) {
      dispatch(downvoteThreadDetailActionCreator(authUser.id, false, (error as Error).message));
    }
  };
}

function asyncNeutralizeThreadDetail() {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser }, threadDetail: { threadDetail } } = getState();
    dispatch(neutralizeThreadDetailActionCreator(authUser.id, false, null));

    try {
      await api.neutralizeThread(threadDetail.id);
    } catch (error) {
      dispatch(neutralizeThreadDetailActionCreator(authUser.id, false, (error as Error).message));
    }
  };
}

function asyncAddComment(comment: string) {
  return async (dispatch: any, getState: any) => {
    dispatch(showLoading());
    const { threadDetail: { threadDetail } } = getState();
    dispatch(addComment(null, true, null));

    try {
      const result = await api.createComment(threadDetail.id, { content: comment });
      dispatch(addComment(result, false, null));
    } catch (error) {
      dispatch(addComment(null, false, (error as Error).message));
    }

    setTimeout(() => {
      dispatch(hideLoading());
    }, 3000);
  };
}

function asyncUpvoteCommentThreadDetail(commentId: string) {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser }, threadDetail: { threadDetail } } = getState();
    dispatch(upvoteCommentActionCreator(false, null, { commentId, userId: authUser.id }));

    try {
      await api.upvoteComment(threadDetail.id, commentId);
    } catch (error) {
      dispatch(upvoteCommentActionCreator(false, (error as Error).message, { commentId, userId: authUser.id }));
    }
  };
}

function asyncDownvoteCommentThreadDetail(commentId: string) {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser }, threadDetail: { threadDetail } } = getState();
    dispatch(downvoteCommentActionCreator(false, null, { commentId, userId: authUser.id }));

    try {
      await api.downvoteComment(threadDetail.id, commentId);
    } catch (error) {
      dispatch(downvoteCommentActionCreator(false, (error as Error).message, { commentId, userId: authUser.id }));
    }
  };
}

function asyncNeutralizeCommentThreadDetail(commentId: string) {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser }, threadDetail: { threadDetail } } = getState();
    dispatch(neutralizeCommentActionCreator(false, null, { commentId, userId: authUser.id }));

    try {
      await api.neutralizeComment(threadDetail.id, commentId);
    } catch (error) {
      dispatch(neutralizeCommentActionCreator(false, (error as Error).message, { commentId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upvoteThreadDetailActionCreator,
  downvoteThreadDetailActionCreator,
  neutralizeThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncUpvoteThreadDetail,
  asyncDownvoteThreadDetail,
  asyncNeutralizeThreadDetail,
  asyncAddComment,
  asyncUpvoteCommentThreadDetail,
  asyncDownvoteCommentThreadDetail,
  asyncNeutralizeCommentThreadDetail
};