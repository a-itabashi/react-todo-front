import { useState, FormEvent } from 'react'
import { CheckBadgeIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { useMutateAuth } from 'hooks/useMutateAuth'


export const Auth = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { loginMutation, registerMutation } = useMutateAuth();

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: pw
      });
    } else {
      await registerMutation
        .mutateAsync({
          email: email,
          password: pw
        })
        .then(() =>
          loginMutation.mutate({
            email: email,
            password: pw
          })
        );
    }
  };
  return (
    <div className='flex min-h-screen flex-col items-center justify-center font-mono text-gray-600'>
      <div className='flex items-center'>
        <CheckBadgeIcon className='mr-2 h-8 w-8 text-blue-500' />
        <span className='text-center text-3xl font-extrabold'>Todo app by React/Go(Echo)</span>
      </div>
      <h2 className='my-6'>{isLogin ? 'Login' : 'Create a new account'}</h2>
      <form onSubmit={submitAuthHandler}>
        <div>
          <input
            className='mb-3 border border-gray-300 px-3 py-2 text-sm'
            name='email'
            type='email'
            autoFocus
            placeholder='Email address'
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className='mb-3 border border-gray-300 px-3 py-2 text-sm'
            name='password'
            type='password'
            placeholder='Password'
            onChange={e => setPw(e.target.value)}
            value={pw}
          />
        </div>
        <div className='my-2 flex justify-center'>
          <button
            className='rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-40'
            disabled={!email || !pw}
            type='submit'
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>
      <ArrowPathIcon
        onClick={() => setIsLogin(!isLogin)}
        className='my-2 h-6 w-6 cursor-pointer text-blue-500'
      />
    </div>
  );
};
