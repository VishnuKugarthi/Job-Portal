import NavBar from '@/components/NavBar';
import Link from 'next/link';
import React from 'react';

const LoginFirstUIComponent = () => {
  return (
    <div>
      <NavBar />
      <div className="w-full  py-20 flex items-center  justify-center flex-col">
        <div className="my-10">
          Please{' '}
          <Link
            className="capitalize text-indigo-600 text-lg"
            href={'/auth/login'}
          >
            login
          </Link>{' '}
          first
        </div>
      </div>
    </div>
  );
};

export default LoginFirstUIComponent;
