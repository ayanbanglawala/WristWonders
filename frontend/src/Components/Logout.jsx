import React from 'react';
import { LuLogOut } from "react-icons/lu";
import useLogout from '../Hooks/useLogout.js';

const Logout = () => {
  const { loading, logout } = useLogout();

  return (
    <div className='mt-auto'>
      {!loading ? (
        <button className="btn bg-red-500 hover:bg-red-600 text-white w-full" onClick={logout}>Logout</button>
      ) : (
        <span className='loading loading-spinner'></span>
      )}
    </div>
  );
};

export default Logout;
