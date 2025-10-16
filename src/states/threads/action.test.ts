import api from '@/utils/api';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { asyncReceiveThreads, receiveThreadsActionCreator } from './action';
import { hideLoading, showLoading } from '@dimasmds/react-redux-loading-bar';

const fakeThreadsResponse = [
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
];

const fakeErrorResponse = new Error('Internal Server Error');

const apiMock = api as typeof api & {
  _getAllThreads?: typeof api.getAllThreads
};

describe('asyncReceiveThreads thunk', () => {
  beforeEach(() => {
    apiMock._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllThreads = apiMock._getAllThreads!;
    delete apiMock._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    vi.useFakeTimers();
    // stub implementation
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreads()(dispatch);

    vi.runAllTimers();

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator([], true, null));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse, false, null));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    vi.useRealTimers();
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    vi.useFakeTimers();
    // stub implementation
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreads()(dispatch);

    vi.runAllTimers();

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator([], true, null));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator([], false, fakeErrorResponse.message));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());

    vi.useRealTimers();
  });
});