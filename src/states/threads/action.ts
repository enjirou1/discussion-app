/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Thread } from '@/utils/type';
import api from '../../utils/api';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UPVOTE_THREAD: 'UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'DOWNVOTE_THREAD',
  NEUTRALIZE_THREAD: 'NEUTRALIZE_THREAD',
};

export type ThreadAction = {
  type: string
  payload: ThreadState | null
}

export type ThreadState = {
  threads?: Thread[],
  thread?: Thread | null,
  threadId?: string,
  userId?: string,
  loading: boolean,
  error: string | null
}

export const initialThreadState: ThreadState = {
  threads: [],
  thread: null,
  threadId: '',
  userId: '',
  loading: false,
  error: null
};

function receiveThreadsActionCreator(threads: Thread[], loading: boolean, error: string | null): ThreadAction {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
      loading,
      error
    },
  };
}

function addThreadActionCreator(thread: Thread | null, loading: boolean, error: string | null): ThreadAction {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
      loading,
      error
    },
  };
}

function upvoteThreadActionCreator(loading: boolean, error: string | null, { threadId, userId }: { threadId: string, userId: string }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
      loading,
      error
    },
  };
}

function downvoteThreadActionCreator(loading: boolean, error: string | null, { threadId, userId }: { threadId: string, userId: string }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
      loading,
      error
    },
  };
}

function neutralizeThreadActionCreator(loading: boolean, error: string | null, { threadId, userId }: { threadId: string, userId: string }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD,
    payload: {
      threadId,
      userId,
      loading,
      error
    },
  };
}

function asyncReceiveThreads() {
  return async (dispatch: any) => {
    dispatch(showLoading());
    dispatch(receiveThreadsActionCreator([], true, null));

    try {
      const threads = await api.getAllThreads();
      dispatch(receiveThreadsActionCreator(threads, false, null));
    } catch (error) {
      dispatch(receiveThreadsActionCreator([], false, (error as Error).message));
    }

    setTimeout(() => {
      dispatch(hideLoading());
    }, 3000);
  };
}

function asyncAddThread({ title, body, category }: { title: string, body: string, category: string }) {
  return async (dispatch: any) => {
    dispatch(showLoading());
    dispatch(addThreadActionCreator(null, true, null));

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread, false, null));
    } catch (error) {
      dispatch(addThreadActionCreator(null, false, (error as Error).message));
    }

    dispatch(hideLoading());
  };
}

function asyncUpvoteThread(threadId: string) {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser } } = getState();
    dispatch(upvoteThreadActionCreator(false, null, { threadId, userId: authUser.id }));

    try {
      await api.neutralizeThread(threadId);
      await api.upvoteThread(threadId);
    } catch (error) {
      dispatch(upvoteThreadActionCreator(false, (error as Error).message, { threadId, userId: authUser.id }));
    }
  };
}

function asyncDownvoteThread(threadId: string) {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser } } = getState();
    dispatch(downvoteThreadActionCreator(false, null, { threadId, userId: authUser.id }));

    try {
      await api.neutralizeThread(threadId);
      await api.downvoteThread(threadId);
    } catch (error) {
      dispatch(downvoteThreadActionCreator(false, (error as Error).message, { threadId, userId: authUser.id }));
    }
  };
}

function asyncNeutralizeThread(threadId: string) {
  return async (dispatch: any, getState: any) => {
    const { authUser: { authUser } } = getState();
    dispatch(neutralizeThreadActionCreator(false, null, { threadId, userId: authUser.id }));

    try {
      await api.neutralizeThread(threadId);
    } catch (error) {
      dispatch(neutralizeThreadActionCreator(false, (error as Error).message, { threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upvoteThreadActionCreator,
  downvoteThreadActionCreator,
  neutralizeThreadActionCreator,
  asyncReceiveThreads,
  asyncAddThread,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralizeThread
};