import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/firebase/firebaseConfig';
import useAuth from '@/hooks/useAuth';

import styles from '../../../styles/login.scss';

const Login = () => {
  // user from custom hook useAuth for checking is user authorized
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/'); // Redirect to homepage if logged in
    }
  }, [user, router]);

  // login user with firebase
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Successfully logged in');
      router.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Failed to log in');
      setError('Email or password are incorrect');
    }
  };

  return (
    <div className="login">
      <div className="login__box">
        <h1>Welcome to Stock Tracker</h1>
        <p>
          Don't have an account yet? <Link href="/auth/register">Sign up</Link>
        </p>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="login__box-button" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
