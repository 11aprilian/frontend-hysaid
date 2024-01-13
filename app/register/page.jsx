'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from '../url';
import AOS from '../components/AOS';

const Page = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      setError('Kosong Njirr!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password belum sesuai!');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/user/register`, {
        username,
        password,
        bio: 'Ini Biomu, Editen dewe!',
      });
      Swal.fire({
        text: 'Selamat Anda Berhasil Registrasi, Silahkan login!',
      }).then(() => {
        router.push('/login');
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <div>
      <AOS>
      <section className="p-6">
        <div className="flex h-screen justify-center container mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
          <div className="px-6 py-16 rounded-md">
            <span data-aos="fade-down" className="block mb-2">Say what you want to say</span>
            <h1 data-aos="fade-down" className="text-5xl font-extrabold">
              Join with Hy<span className="text-emerald-400">Said</span>
            </h1>
            <p data-aos="fade-down" className="my-8">
              <span className="font-medium">Selamat Datang di HySaid! </span>
              Bergabung dengan HySaid dan luapkan pikiranmu
            </p>

            <form className=" space-y-3">
              <div>
                <input
                  id="name"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 rounded-md focus:ring focus:ri"
                />
              </div>
              <div>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-md focus:ring focus:ri"
                />
              </div>
              <div>
                <input
                  id="re-password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 rounded-md focus:ring focus:ri"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="button"
                onClick={handleRegister}
                className="w-full py-2 font-semibold rounded bg-emerald-400 hover:bg-emerald-300"
              >
                Register
              </button>
            </form>

            <p className="my-8">
              Punya akun?
              Login{' '}
              <span className="text-emerald-400">
                <Link href={'/login'}>disini</Link>
              </span>
            </p>
          </div>
        </div>
      </section>
      </AOS>
    </div>
  );
};

export default Page;
