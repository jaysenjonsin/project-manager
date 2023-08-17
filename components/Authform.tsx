'use client';
import { useRouter } from 'next/navigation';
import Button from './Button';
import Card from './Card';
import Input from './Input';
import { register, signin } from '../lib/api';
import { useCallback, useState } from 'react';
import Link from 'next/link';

const registerContent = {
  linkUrl: '/signin', //the link is to the other one
  linkText: 'Already have an account?',
  header: 'Create A new account',
  subheader: 'Just a few things to get started',
  buttonText: 'Register',
};
const signinContent = {
  linkUrl: '/register',
  linkText: "Don't have an account?",
  header: 'Welcome back!',
  subheader: 'Enter your credentials to access your account',
  buttonText: 'Sign in',
};

const initial = { email: '', password: '', firstName: '', lastName: '' };

const AuthForm = ({ mode }: { mode: 'register' | 'signin' }) => {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (mode === 'register') await register(formState);
        else await signin(formState);
        router.replace('/home');
      } catch (error) {
        console.error(error);
      } finally {
        //code to be executed regardless of the try result
        setFormState({ ...initial });
      }
    },
    [
      formState.email,
      formState.firstName,
      formState.lastName,
      formState.password,
    ] //memoize this func and only recreate it if one of these formState properties change. if none of these values change, the function will not be recreated and the memoized version of func will be used
  );

  const content = mode === 'register' ? registerContent : signinContent;

  return (
    <Card>
      <div className='w-full'>
        <div className='text-center'>
          <h2 className='text-3xl mb-2'>{content.header}</h2>
          <p className='tex-lg text-black/25'>{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className='py-10 w-full'>
          {mode === 'register' && (
            <div className='flex mb-8 justify-between'>
              <div className='pr-2'>
                <div className='text-lg mb-4 ml-2 text-black/50'>
                  First Name
                </div>
                <Input
                  required
                  placeholder='First Name'
                  value={formState.firstName}
                  className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
                  onChange={
                    (e) =>
                      setFormState((s) => ({ ...s, firstName: e.target.value })) //remember to pass the previous state ...s, or else the setFormState will override the rest of the values with empty values. could also just use a plug in called immer, really good
                  }
                />
              </div>
              <div className='pl-2'>
                <div className='text-lg mb-4 ml-2 text-black/50'>Last Name</div>
                <Input
                  required
                  placeholder='Last Name'
                  value={formState.lastName}
                  className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          <div className='mb-8'>
            <div className='text-lg mb-4 ml-2 text-black/50'>Email</div>
            <Input
              required
              type='email'
              placeholder='Email'
              value={formState.email}
              className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className='mb-8'>
            <div className='text-lg mb-4 ml-2 text-black/50'>Password</div>
            <Input
              required
              value={formState.password}
              type='password'
              placeholder='Password'
              className='border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full'
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className='flex items-center justify-between'>
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className='text-blue-600 font-bold'
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type='submit' intent='secondary'>
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default AuthForm;
