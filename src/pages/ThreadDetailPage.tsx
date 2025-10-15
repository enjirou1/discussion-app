import React, { useEffect } from 'react';
import type { AppDispatch, RootState } from '@/states';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddComment, asyncDownvoteCommentThreadDetail, asyncDownvoteThreadDetail, asyncNeutralizeCommentThreadDetail, asyncNeutralizeThreadDetail, asyncReceiveThreadDetail, asyncUpvoteCommentThreadDetail, asyncUpvoteThreadDetail } from '@/states/threadDetail/action';
import { useParams } from 'react-router-dom';
import { postedAt } from '@/utils';
import useInput from '@/hooks/useInput';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { asyncReceiveUsers } from '@/states/users/action';
import type { Comment } from '@/utils/type';

function ThreadDetailPage() {
  const { threadId } = useParams();
  const [comment, onCommentChange, setComment] = useInput('');

  const {
    threadDetail: { threadDetail, loading },
    authUser: { authUser },
  }: RootState = useSelector((state: never) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveUsers());
    dispatch(asyncReceiveThreadDetail(threadId!));
  }, [dispatch, threadId]);

  const onLikeThread = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (threadDetail?.upVotesBy?.includes(authUser?.id ?? '')) {
      dispatch(asyncNeutralizeThreadDetail());
    } else {
      dispatch(asyncUpvoteThreadDetail());
    }
  };

  const onDislikeThread = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (threadDetail?.downVotesBy?.includes(authUser?.id ?? '')) {
      dispatch(asyncNeutralizeThreadDetail());
    } else {
      dispatch(asyncDownvoteThreadDetail());
    }
  };

  const onLikeComment = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (threadDetail?.comments?.find((comment) => comment.id === id)?.upVotesBy?.includes(authUser?.id ?? '')) {
      dispatch(asyncNeutralizeCommentThreadDetail(id));
    } else {
      dispatch(asyncUpvoteCommentThreadDetail(id));
    }
  };

  const onDislikeComment = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (threadDetail?.comments?.find((comment) => comment.id === id)?.downVotesBy?.includes(authUser?.id ?? '')) {
      dispatch(asyncNeutralizeCommentThreadDetail(id));
    } else {
      dispatch(asyncDownvoteCommentThreadDetail(id));
    }
  };

  const onSubmitComment = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setComment('');
    dispatch(asyncAddComment(comment));
  };

  return (
    <div className='flex justify-center pt-18' style={{ height: '100%' }}>
      <div className='flex flex-col gap-4 px-4 py-10 min-h-screen bg-white overflow-y-auto' style={{ width: '600px', height: '80vh' }}>
        <div className='flex items-center'>
          <img src={threadDetail?.owner?.avatar} alt="" className='w-10 h-10 rounded-full mr-2' />
          <p className='text-md font-bold mr-3'>{threadDetail?.owner?.name}</p>
          <p className='text-xs text-gray-500'>{postedAt(threadDetail?.createdAt ?? '')}</p>
        </div>
        <p className='text-2xl font-semibold text-black'>{threadDetail?.title}</p>
        <div className='text-md text-black' dangerouslySetInnerHTML={{ __html: threadDetail?.body ?? '' }}></div>
        <p className='text-blue-500'>#{threadDetail?.category}</p>
        <div className='mb-2'>
          <i className='pi pi-thumbs-up mr-4 cursor-pointer' onClick={loading ? () => { } : (e) => onLikeThread(e)}> {threadDetail?.upVotesBy.length}</i>
          <i className='pi pi-thumbs-down mr-4 cursor-pointer' onClick={loading ? () => { } : (e) => onDislikeThread(e)}> {threadDetail?.downVotesBy.length}</i>
        </div>
        <p className='text-xl font-semibold text-black'>Komentar ({threadDetail?.comments.length})</p>
        <div className='flex gap-2 mb-2'>
          <InputText type="text" value={comment} onChange={onCommentChange} placeholder="Comment" className="w-full" />
          <Button icon="pi pi-send" severity="secondary" aria-label="Bookmark" onClick={loading ? () => { } : (e: React.MouseEvent<HTMLElement, MouseEvent>) => onSubmitComment(e)} />
        </div>
        {
          threadDetail?.comments.map((comment: Comment) => {
            return (
              <div className='flex flex-col' key={comment.id} style={{ marginBottom: '10px' }}>
                <div className='flex items-center mb-2'>
                  <img src={comment?.owner?.avatar} alt="" className='w-7 h-7 rounded-full mr-2' />
                  <p className='text-sm font-semibold mr-3'>{comment?.owner?.name}</p>
                  <p className='text-xs text-gray-500'>{postedAt(comment?.createdAt ?? '')}</p>
                </div>
                <p className='text-sm text-black mb-2' dangerouslySetInnerHTML={{ __html: comment?.content ?? '' }}></p>
                <div className='mb-2'>
                  <i className='pi pi-thumbs-up mr-4 cursor-pointer' style={{ fontSize: '0.8rem' }} onClick={loading ? () => { } : (e) => onLikeComment(e, comment?.id ?? '')}> {comment?.upVotesBy.length}</i>
                  <i className='pi pi-thumbs-down mr-4 cursor-pointer' style={{ fontSize: '0.8rem' }} onClick={loading ? () => { } : (e) => onDislikeComment(e, comment?.id ?? '')}> {comment?.downVotesBy.length}</i>
                </div>
                <hr />
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default ThreadDetailPage;