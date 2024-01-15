"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import API_URL from "../url";
import AOS from "../components/AOS";

const page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/user/login`, {
        username,
        password,
      });

      Cookies.set("token", response.data.token, { path: "/" });
      Cookies.set("id", response.data.id, { path: "/" });

      router.push("/home");
    } catch (error) {
      Swal.fire({
        title: 'Cek Lagi',
        text: "Ada yang keliru!",
        confirmButtonColor: '#10b981'
      });
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <AOS>
        <section className="p-6">
          <div className="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5">
            <div className="w-full h-screen px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2">
              <span data-aos="fade-down" className="block mb-2">
                Say what you want to say
              </span>
              <h1 data-aos="fade-down" className="text-5xl font-extrabold">
                Welcome to Hy<span className="text-emerald-400">Said</span>
              </h1>
              <p data-aos="fade-down" className="my-8">
                <span className="font-medium">Selamat Datang di HySaid! </span>
                Temukan Inspirasi dari Pengalaman Pengguna HySaid
              </p>

              <form className="self-stretch space-y-3">
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
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full py-2 font-semibold rounded bg-emerald-400 hover:bg-emerald-300"
                >
                  Login
                </button>
              </form>

              <p className="my-8">
                Belum punya akun? Daftar{" "}
                <span className="text-emerald-400">
                  <Link href={"/register"}>disini</Link>
                </span>
              </p>
            </div>
            <img
              src="images/banner/banner.png"
              alt="banner"
              className="object-cover w-full my-8 rounded-md xl:col-span-3 hidden md:block"
            />
          </div>
        </section>
      </AOS>
    </div>
  );
};

export default page;
