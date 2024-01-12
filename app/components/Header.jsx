'use client';
import React, { useEffect, useState } from 'react';

const Header = () => {

  useEffect(() => {
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
