import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Providers from '../components/Providers';
import Login from '../components/Login';
import { AUTH_TOKEN } from '../utils/constants';
import { LOGIN_STATE } from '../types/login';

export default function LoginPage() {
  const router = useRouter();
  const [loginState, setLoginState] = useState<keyof typeof LOGIN_STATE>('LOADING');

  useEffect(() => {
    setLoginState(!!localStorage.getItem(AUTH_TOKEN) ? 'LOGGED_IN' : 'NOT_LOGGED_IN');
  }, []);

  if (loginState === 'LOADING') {
    return 'Loading';
  }

  if (loginState === 'LOGGED_IN') {
    router.push('/');
    return null;
  }

  return (
    <Providers checkAuth={false}>
      <Login />
    </Providers>
  );
}
