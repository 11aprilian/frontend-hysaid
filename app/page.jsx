'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'; 
import Cookies from 'js-cookie';

const Page = () => {
  const router = useRouter();
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/login');
    } else {
      router.push('/home');
    }
  }, []);

  return (
    <div className="h-screen"></div>
  );
};

export default Page;
