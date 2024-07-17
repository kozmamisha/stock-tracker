import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/firebase/firebaseConfig';
import useAuth from '@/hooks/useAuth';

import '../../../styles/register.scss';

const Register = () => {
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

  // registration user with firebase
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
      toast.success('Successfully registered!');
    } catch (error) {
      toast.error('Failed to register :(');
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="register">
      <div className="register__box">
        <h1>Welcome to Stock Tracker</h1>
        <p>
          Already have an account? <Link href="/auth/login">Sign in</Link>
        </p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
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
          <button className="register__box-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
