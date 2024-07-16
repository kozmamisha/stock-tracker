import Link from 'next/link';
import Header from '@/components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <div className="">
      <ToastContainer
        position="bottom-left"
      />
      <Header />
    </div>
  );
}
