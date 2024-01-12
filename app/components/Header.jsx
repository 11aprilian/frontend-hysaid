'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import API_URL from '../url';

const Header = () => {
  const id = Cookies.get('id');
  const [username, setUsername] = useState('');

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setUsername(response.data.data.username);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <nav className="shadow relative flex w-full flex-nowrap items-center justify-center lg:flex-wrap lg:justify-start lg:py-4" data-te-navbar-ref>
        <div className="sm:py-1 grid grid-cols-2 sm:grid-cols-4 py-4 w-full items-center ms-8 px-3">
          <h1 className="text-2xl font-bold">
            Hy<span className="text-emerald-400">Said</span>
          </h1>
          <p className="text-gray-800 font-bold">
            Hallo, <span className="text-emerald-500">{username}</span>
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Header;
