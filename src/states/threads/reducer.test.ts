import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import type { ThreadAction, ThreadState } from './action';

describe('threadsReducers function', () => {
  it('should return initial state when given by unknown action', () => {
    // arrange
    const initialState: ThreadState = {
      threads: [],
      thread: null,
      threadId: '',
      userId: '',
      loading: false,
      error: null
    };
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState: ThreadState = {
      threads: [],
      thread: null,
      threadId: '',
      userId: '',
      loading: false,
      error: null
    };
    const action: ThreadAction = {
      type: 'RECEIVE_THREADS',
      payload: {
        ...initialState,
        threads: [
          {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            category: 'redux',
            createdAt: '2023-05-29T07:55:52.266Z',
            ownerId: 'user-mQhLzINW_w5TxxYf',
            totalComments: 1,
            upVotesBy: [
              'user-mQhLzINW_w5TxxYf'
            ],
            downVotesBy: []
          },
          {
            id: 'thread-91KocEqYPRz68MhD',
            title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
            body: '\u003Cdiv\u003EBagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003ESeperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EBerhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EOleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EBeberapa hal yang dapat kamu tulis pada perkenalan diri:\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003E- Siapa kamu dan dari mana kamu berasal?\u003C/div\u003E\u003Cdiv\u003E- Apa pekerjaan atau pendidikan kamu saat ini?\u003C/div\u003E\u003Cdiv\u003E- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?\u003C/div\u003E',
            category: 'perkenalan',
            createdAt: '2023-05-29T07:54:35.746Z',
            ownerId: 'user-aROWej8yYA1sOfHN',
            totalComments: 1,
            upVotesBy: [
              'user-mQhLzINW_w5TxxYf'
            ],
            downVotesBy: []
          }
        ]
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      threads: action.payload?.threads
    });
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState: ThreadState = {
      threads: [
        {
          id: 'thread-Np47p4jhUXYhrhRn',
          title: 'Bagaimana pengalamanmu belajar Redux?',
          body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
          category: 'redux',
          createdAt: '2023-05-29T07:55:52.266Z',
          ownerId: 'user-mQhLzINW_w5TxxYf',
          totalComments: 1,
          upVotesBy: [
            'user-mQhLzINW_w5TxxYf'
          ],
          downVotesBy: []
        },
        {
          id: 'thread-91KocEqYPRz68MhD',
          title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
          body: '\u003Cdiv\u003EBagaimana kabarmu? Semoga baik-baik saja ya. Sekali lagi saya ucapkan selamat datang semuanya!\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003ESeperti yang sudah disampaikan sebelumnya, pada diskusi ini kamu bisa memperkenalkan diri kamu dan juga berkenalan dengan teman sekelas lainnya.\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EBerhubungan baik dengan teman sekelas dan instruktur merupakan bagian penting dari pembelajaran di kelas ini, karena mereka dapat membantu jika kamu mengalami kendala dalam mempelajari dan memahami materi.&nbsp;&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EOleh karena itu, luangkanlah waktumu untuk saling mengenal dan mencairkan suasana. Membangun interaksi dengan siswa lain akan membuat pengalaman belajar kamu jauh lebih menyenangkan dan menarik.&nbsp;\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003EBeberapa hal yang dapat kamu tulis pada perkenalan diri:\u003C/div\u003E\u003Cdiv\u003E\u003Cbr\u003E\u003C/div\u003E\u003Cdiv\u003E- Siapa kamu dan dari mana kamu berasal?\u003C/div\u003E\u003Cdiv\u003E- Apa pekerjaan atau pendidikan kamu saat ini?\u003C/div\u003E\u003Cdiv\u003E- Kenapa kamu mengambil pelatihan ini? Apakah mungkin karena kamu sedang mengejar perubahan dalam karir, atau lainnya?\u003C/div\u003E',
          category: 'perkenalan',
          createdAt: '2023-05-29T07:54:35.746Z',
          ownerId: 'user-aROWej8yYA1sOfHN',
          totalComments: 1,
          upVotesBy: [
            'user-mQhLzINW_w5TxxYf'
          ],
          downVotesBy: []
        }
      ],
      thread: null,
      threadId: '',
      userId: '',
      loading: false,
      error: null
    };
    const action: ThreadAction = {
      type: 'ADD_THREAD',
      payload: {
        ...initialState,
        thread: {
          id: 'thread-Ab47p4jhUXYhrhRn',
          title: 'Kenapa harus pakai Next JS?',
          body: 'Sebutkan pros dan cons dari Next JS',
          category: 'redux',
          createdAt: '2023-05-29T07:55:52.266Z',
          ownerId: 'user-mQhLzINW_w5TxxYf',
          totalComments: 1,
          upVotesBy: [
            'user-mQhLzINW_w5TxxYf'
          ],
          downVotesBy: []
        }
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      threads: [
        action.payload?.thread,
        ...initialState.threads!
      ],
      thread: action.payload?.thread
    });
  });
});