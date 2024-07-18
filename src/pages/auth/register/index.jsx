import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/firebase/firebaseConfig';
import useAuth from '@/hooks/useAuth';
import { registerUser } from '@/services/apiService';

import '../../../styles/auth-form.scss';

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
      await registerUser(email, password);
      router.push('/'); // Redirect on successful registration
      toast.success('Successfully registered!');
    } catch (error) {
      toast.error('Failed to register :(');
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="auth register">
      <div className="auth__box">
        <h1>Welcome to Stock Tracker</h1>
        <p>
          Already have an account? <Link href="/auth/login">Sign in</Link>
        </p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="auth__box-button" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
