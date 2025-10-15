import type { ApiResponse, CreateCommentPayload, CreateThreadPayload, LoginPayload, RegisterPayload, Thread, User, ThreadVote, CommentVote, Leaderboard, ThreadDetail, Comment } from './type';

const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  async function _fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    });
  }

  function putAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  async function register({ name, email, password }: RegisterPayload): Promise<User> {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const responseJson: ApiResponse<{ user: User }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function login({ email, password }: LoginPayload): Promise<string> {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const responseJson: ApiResponse<{ token: string }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.token;
  }

  async function getAllUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson: ApiResponse<{ users: User[] }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.users;
  }

  async function getOwnProfile(): Promise<User> {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson: ApiResponse<{ user: User }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.user;
  }

  async function createThread({ title, body, category }: CreateThreadPayload): Promise<Thread> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        category
      })
    });

    const responseJson: ApiResponse<{ thread: Thread }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.thread;
  }

  async function getAllThreads(): Promise<Thread[]> {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson: ApiResponse<{ threads: Thread[] }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.threads;
  }

  async function getThreadDetail(id: string): Promise<ThreadDetail> {
    const response = await fetch(`${BASE_URL}/threads/${id}`);

    const responseJson: ApiResponse<{ detailThread: ThreadDetail }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.detailThread;
  }

  async function createComment(threadId: string, { content }: CreateCommentPayload): Promise<Comment> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content
      })
    });

    const responseJson: ApiResponse<{ comment: Comment }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.comment;
  }

  async function upvoteThread(threadId: string): Promise<ThreadVote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
      method: 'POST'
    });

    const responseJson: ApiResponse<{ vote: ThreadVote }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }

  async function downvoteThread(threadId: string): Promise<ThreadVote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
      method: 'POST'
    });

    const responseJson: ApiResponse<{ vote: ThreadVote }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }

  async function neutralizeThread(threadId: string): Promise<ThreadVote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
      method: 'POST'
    });

    const responseJson: ApiResponse<{ vote: ThreadVote }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }

  async function upvoteComment(threadId: string, commentId: string): Promise<CommentVote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
      method: 'POST'
    });

    const responseJson: ApiResponse<{ vote: CommentVote }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }

  async function downvoteComment(threadId: string, commentId: string): Promise<CommentVote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
      method: 'POST'
    });

    const responseJson: ApiResponse<{ vote: CommentVote }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }

  async function neutralizeComment(threadId: string, commentId: string): Promise<CommentVote> {
    const response = await _fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
      method: 'POST'
    });

    const responseJson: ApiResponse<{ vote: CommentVote }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.vote;
  }

  async function getLeaderboards(): Promise<Leaderboard[]> {
    const response = await fetch(`${BASE_URL}/leaderboards`);

    const responseJson: ApiResponse<{ leaderboards: Leaderboard[] }> = await response.json();
    const { status, message, data } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    return data.leaderboards;
  }

  return {
    register,
    putAccessToken,
    getAccessToken,
    login,
    getAllUsers,
    getOwnProfile,
    createThread,
    getAllThreads,
    getThreadDetail,
    createComment,
    upvoteThread,
    downvoteThread,
    neutralizeThread,
    upvoteComment,
    downvoteComment,
    neutralizeComment,
    getLeaderboards,
    _fetchWithAuth
  };
})();

export default api;