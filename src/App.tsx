import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './states';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import { Menubar } from 'primereact/menubar';
import LeaderboardsPage from './pages/LeaderboardsPage';
import ThreadDetailPage from './pages/ThreadDetailPage';
import Loading from './components/Loading';

function App() {
  const navigate = useNavigate();

  const {
    authUser: { authUser },
    isPreload
  }: RootState = useSelector((state: never) => state);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  if (authUser === null) {
    return (
      <>
        <main>
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </>
    );
  }

  const items = [
    {
      label: 'Threads',
      icon: 'pi pi-comments',
      command: () => {
        navigate('/threads');
      }
    },
    {
      label: 'Leaderboards',
      icon: 'pi pi-trophy',
      command: () => {
        navigate('/leaderboards');
      }
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: () => {
        onSignOut();
      }
    }
  ];

  return (
    <>
      <div className="app-container">
        <header className='fixed top-0 w-full flex items-center justify-between px-4 py-2 bg-white shadow-zinc-500 shadow'>
          <h2 className='text-xl font-bold pl-2'>Aplikasi Diskusi</h2>
          <div className='flex justify-end'>
            <Menubar model={items} className='border-none shadow-none bg-transparent' />
          </div>
        </header>
        <Loading />
        <main>
          <Routes>
            <Route path="/threads" element={<HomePage />} />
            <Route path="/threads/:threadId" element={<ThreadDetailPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/*" element={<Navigate to="/threads" replace />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;