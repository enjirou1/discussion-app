import React from 'react';
import useInput from '../hooks/useInput';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { useSelector } from 'react-redux';
import type { RootState } from '@/states';

interface LoginInputProps {
  login: (data: {
    email: string
    password: string
  }) => void
}

const LoginInput: React.FC<LoginInputProps> = ({ login }) => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const {
    authUser: { loading, error }
  }: RootState = useSelector((state: never) => state);

  return (
    <form className="flex flex-col gap-3 w-full max-w-sm">
      <h2 className='text-3xl text-center mb-5'>Aplikasi Diskusi</h2>
      <div className='mb-3'>
        <InputText type="email" value={email} onChange={onEmailChange} placeholder="Email" className="w-full" />
      </div>
      <div className='mb-3'>
        <InputText type="password" value={password} onChange={onPasswordChange} placeholder="Password" className="w-full" />
      </div>
      <div className='mb-3'>
        <Button type="button" onClick={() => login({ email, password })} className="w-full flex justify-center" loading={loading}>Login</Button>
      </div>
      {(error && !error.includes('HTTP')) ? <Message severity='error' text={error} /> : null}
    </form>
  );
};

export default LoginInput;