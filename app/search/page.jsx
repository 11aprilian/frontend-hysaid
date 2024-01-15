"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import AOS from "../components/AOS";
import MobileNavbar from "../components/MobileNavbar";
import API_URL from "../url";
import { MdOutlinePersonSearch } from "react-icons/md";

const page = () => {
  const [searchQuery, setSearchQuery] = useState(" ");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    const inputQuery = e.target.value;
    setSearchQuery(inputQuery);
    if (inputQuery.length >= 3) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/search/user?s=${searchQuery}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div>
      <AOS>
        <div className="w-full h-screen max-w-screen-xl mx-auto px-6">
          <div className="flex justify-center p-4 px-3 py-10">
            <div className="w-full max-w-md">
              <div className="bg-gray-200 shadow-md rounded-lg px-3 py-2 mb-4">
                <div className="block text-gray-600 text-lg font-semibold py-2 px-2">
                  Cari Temanmu
                </div>
                <div className="flex items-center mb-4 bg-gray-200 rounded-md">
                  <div className="pl-2 mr-2 text-gray-600">
                    <MdOutlinePersonSearch size={28} />
                  </div>
                  <input
                    className="w-full bg-gray-100 rounded-md text-gray-700 leading-tight focus:outline-none py-2 px-2"
                    id="search"
                    type="text"
                    placeholder="Cari Disini?"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>

                {users.map((user) => (
                  <Link
                    href={`/user/${user._id}`}
                    key={user._id}
                    className="py-3 text-sm"
                    data-aos="fade-down"
                  >
                    <div className="flex justify-start items-center cursor-pointer text-gray-700 hover:text-emerald-400 hover:bg-emerald-100 rounded-md px-2 py-2 my-2">
                      <div className="flex items-center">
                        <img
                          className="w-6 h-6 rounded-full object-cover mr-4 shadow"
                          src={user.profilePicture}
                          alt="gr"
                        />
                      </div>
                      <div
                        href={`/user/${user._id}`}
                        className="flex-grow font-medium px-2"
                      >
                        {user.username}
                      </div>
                      <div className="text-sm font-normal text-gray-500 tracking-wide">
                        Pengguna
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <MobileNavbar />
      </AOS>
    </div>
  );
};

export default page;
