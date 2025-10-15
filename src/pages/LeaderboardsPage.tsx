import React, { useEffect } from 'react';
import type { AppDispatch, RootState } from '@/states';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'primereact/card';
import type { Leaderboard } from '@/utils/type';
import { asyncReceiveLeaderboards } from '@/states/leaderboards/action';
import ListContent from '@/components/ListContent';

function LeaderboardsPage() {
  const {
    leaderboards: { leaderboards, loading, error },
  }: RootState = useSelector((state: never) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className='flex justify-center pt-18' style={{ height: '100%' }}>
      <div className='flex flex-col gap-4 px-4 py-10 min-h-screen bg-white overflow-y-auto' style={{ width: '600px', height: '80vh' }}>
        <h2 className='text-3xl text-center mb-5'>Leaderboards</h2>
        <ListContent
          loading={loading}
          error={error}
          totalData={leaderboards?.length ?? 0}>
          {
            (leaderboards ?? []).map((leaderboard: Leaderboard) => {
              return (
                <Card key={leaderboard.user.id}>
                  <div className='flex justify-between items-center mb-3'>
                    <div className='flex items-center'>
                      <img src={leaderboard.user?.avatar} alt="" className='w-10 h-10 rounded-full mr-4' />
                      <p className='text-md font-semibold mr-3'>{leaderboard.user?.name}</p>
                    </div>
                    <p className='text-xl font-bold'>{leaderboard.score}</p>
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

export default LeaderboardsPage;