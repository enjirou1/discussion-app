import React from 'react';
import useInput from '../hooks/useInput';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import type { RootState } from '@/states';
import { useSelector } from 'react-redux';
import { Message } from 'primereact/message';

interface RegisterInputProps {
  register: (data: {
    name: string
    email: string
    password: string
  }) => void
}

const RegisterInput: React.FC<RegisterInputProps> = ({ register }) => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const {
    users: { loading, error }
  }: RootState = useSelector((state: never) => state);

  return (
    <form className="flex flex-col gap-3 w-full max-w-sm">
      <h2 className='text-3xl text-center mb-5'>Aplikasi Diskusi</h2>
      <div className='mb-3'>
        <InputText type="name" value={name} onChange={onNameChange} placeholder="Name" className="w-full" />
      </div>
      <div className='mb-3'>
        <InputText type="email" value={email} onChange={onEmailChange} placeholder="Email" className="w-full" />
      </div>
      <div className='mb-3'>
        <InputText type="password" value={password} onChange={onPasswordChange} placeholder="Password" className="w-full" />
      </div>
      <div className='mb-3'>
        <Button type="button" onClick={() => register({ name, email, password })} className="w-full flex justify-center" loading={loading}>Register</Button>
      </div>
      {error && <Message severity='error' text={error} />}
    </form>
  );
};

export default RegisterInput;
