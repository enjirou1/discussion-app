import React from 'react';
import LoginInput from '@/components/LoginInput';
import type { AppDispatch } from '@/states';
import { asyncSetAuthUser } from '@/states/authUser/action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'primereact/card';

function LoginPage() {
  const dispatch: AppDispatch = useDispatch();

  const onLogin = ({ email, password }: { email: string; password: string }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <Card className="w-full max-w-md rounded-lg shadow-lg border-none p-8" style={{ borderRadius: '10px' }}>
        <LoginInput login={onLogin} />
        <p className="mt-4 text-center">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;