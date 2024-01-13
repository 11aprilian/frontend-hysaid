"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import axios from "axios";
import API_URL from "../url";

const Header = () => {
  const id = Cookies.get("id");
  const [username, setUsername] = useState("");
  const [pict, setPict] = useState("");

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setUsername(response.data.data.username);
      setPict(response.data.data.profilePicture);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <nav
        className="shadow relative flex w-full flex-nowrap items-center justify-center lg:flex-wrap lg:justify-start lg:py-4"
        data-te-navbar-ref
      >
        <div className="sm:py-1 flex justify-between  py-4 w-full items-center ms-8 px-3">
          <h1 className="text-2xl font-bold text-gray-700">
            Hy<span className="text-emerald-500">Said</span>
          </h1>
          <div className="grid grid-cols-3 items-center">
            <div className="flex justify-end col-span-2 mr-3">
              <p className="text-gray-700 uppercase text-sm font-bold">
                {username}
              </p>
            </div>
            <div className="flex justify-end">
              <Link href={"/profile"}>
              <img
                className="w-12 h-12 rounded-full object-cover mr-2 shadow"
                src={pict}
                alt=""
              /></Link>  
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
