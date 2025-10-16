import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser, receiveUsersActionCreator } from '../states/users/action';
import type { AppDispatch, RootState } from '@/states';
import { Card } from 'primereact/card';
import BeforeLoginContainer from '@/components/styled/BeforeLoginContainer';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const {
    users: { users, loading }
  }: RootState = useSelector((state: never) => state);

  useEffect(() => {
    if (!loading && users.length > 0) {
      navigate('/');
      dispatch(receiveUsersActionCreator([], false, null));
    }
  }, [loading, users, navigate, dispatch]);

  const onRegister = ({ name, email, password }: { name: string; email: string; password: string }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
  };

  return (
    // <div className="min-h-screen flex justify-center items-center bg-gray-50">
    <BeforeLoginContainer>
      <Card className="w-full max-w-md rounded-lg shadow-lg border-none p-8" style={{ borderRadius: '10px' }}>
        <RegisterInput register={onRegister} />
        <p className="mt-4 text-center">
          Already have an account?
          {' '}
          <Link to="/">Login</Link>
        </p>
      </Card>
    </BeforeLoginContainer>
    // </div>
  );
}

export default RegisterPage;
