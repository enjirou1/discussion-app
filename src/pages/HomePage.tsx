import React, { useEffect, useState, type FormEvent } from 'react';
import type { AppDispatch, RootState } from '@/states';
import { useDispatch, useSelector } from 'react-redux';
import { asyncAddThread, asyncDownvoteThread, asyncNeutralizeThread, asyncReceiveThreads, asyncUpvoteThread } from '@/states/threads/action';
import { Card } from 'primereact/card';
import type { Thread, User } from '@/utils/type';
import { asyncReceiveUsers } from '@/states/users/action';
import { postedAt } from '@/utils';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';;
import { Button } from 'primereact/button';
import useInput from '@/hooks/useInput';
import ListContent from '@/components/ListContent';
import { Chip } from 'primereact/chip';

function HomePage() {
  const navigate = useNavigate();
  const [title, onTitleChange, setTitle] = useInput('');
  const [body, onBodyChange, setBody] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');

  const {
    threads: { threads, loading, error },
    users: { users },
    authUser: { authUser }
  }: RootState = useSelector((state: never) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreads());
    dispatch(asyncReceiveUsers());
  }, [dispatch]);

  const onSubmitThread = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitle('');
    setBody('');
    setCategory('');
    dispatch(asyncAddThread({ title: title, body: body, category: category }));
  };

  const onLikeThread = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (threads?.find((thread: Thread) => thread.id === id)?.upVotesBy?.includes(authUser?.id ?? '')) {
      dispatch(asyncNeutralizeThread(id));
    } else {
      dispatch(asyncUpvoteThread(id));
    }
  };

  const onDislikeThread = (e: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    if (threads?.find((thread: Thread) => thread.id === id)?.downVotesBy?.includes(authUser?.id ?? '')) {
      dispatch(asyncNeutralizeThread(id));
    } else {
      dispatch(asyncDownvoteThread(id));
    }
  };

  return (
    <div className='flex justify-center pt-18' style={{ height: '100%' }}>
      <div className='flex flex-col gap-4 px-4 py-10 min-h-screen bg-white overflow-y-auto' style={{ width: '600px', height: '80vh' }}>
        <form onSubmit={onSubmitThread} className='flex flex-col gap-2 mb-4' noValidate>
          <InputText
            type="text"
            value={title}
            onChange={onTitleChange}
            placeholder="Judul"
            className="w-full" />
          <InputText
            type="text"
            value={category}
            onChange={onCategoryChange}
            placeholder="Kategori"
            className="w-full" />
          <InputTextarea
            value={body}
            rows={3}
            onChange={onBodyChange}
            placeholder="Konten"
            className="w-full" />
          <Button
            type='submit'
            icon="pi pi-send"
            iconPos="right"
            severity="secondary"
            className='w-full'
            label='Kirim'
            loading={loading} />
        </form>
        <div className='flex flex-wrap gap-2'>
          {

            Array.from(new Set(['Semua', ...(threads ?? []).map((thread: Thread) => thread.category)])).map((category: string) => {
              return (
                <Chip
                  key={category}
                  label={category}
                  className='mr-2 cursor-pointer'
                  onClick={() => setCategoryFilter(category)} />
              );
            })
          }
        </div>
        <ListContent
          loading={loading}
          error={error}
          totalData={(categoryFilter === 'Semua' ? threads : threads?.filter((thread: Thread) => thread.category === categoryFilter))?.length ?? 0}>
          {
            ((categoryFilter === 'Semua' ? threads : threads?.filter((thread: Thread) => thread.category === categoryFilter)) ?? []).map((thread: Thread) => {
              const user: User | undefined = users.find((user: User) => user.id == thread.ownerId);
              return (
                <Card key={thread.id} onClick={() => navigate(`/threads/${thread.id}`)} className='cursor-pointer hover:bg-gray-100()'>
                  <div className='flex items-center mb-3'>
                    <img src={user?.avatar} alt="" className='w-10 h-10 rounded-full mr-2' />
                    <p className='text-md font-bold mr-3'>{user?.name}</p>
                    <p className='text-xs text-gray-500'>{postedAt(thread.createdAt)}</p>
                  </div>
                  <h2 className='text-lg font-semibold mb-2'>{thread.title}</h2>
                  <p className='text-sm overflow-ellipsis line-clamp-2 mb-2' dangerouslySetInnerHTML={{ __html: thread.body }}></p>
                  <p className='text-blue-500 mb-3'>#{thread.category}</p>
                  <div>
                    <i className='pi pi-thumbs-up mr-4' onClick={loading ? () => { } : (e) => onLikeThread(e, thread.id)}> {thread.upVotesBy.length}</i>
                    <i className='pi pi-thumbs-down mr-4' onClick={loading ? () => { } : (e) => onDislikeThread(e, thread.id)}> {thread.downVotesBy.length}</i>
                    <i className='pi pi-comments'> {thread.totalComments}</i>
                  </div>
                </Card>
              );
            })
          }
        </ListContent>
      </div>
    </div>
  );
}

export default HomePage;