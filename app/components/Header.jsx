"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AOS from "./AOS";
import axios from "axios";
import API_URL from "../url";
import { IoLogOutOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const Header = () => {
  const id = Cookies.get("id");
  const [username, setUsername] = useState("");
  const [pict, setPict] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const defaultAva = "images/avatar/default.png";
  const router = useRouter();

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

  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Mau Logout?",
      showCancelButton: true,
      confirmButtonText: "Yups, dah males!",
      cancelButtonText: "Ga Jadi",
      confirmButtonColor: "#10b981",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        Cookies.remove("id");
        router.push("/login");
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <AOS>
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
                <button onClick={handleDropdownToggle}>
                  <img
                    className="w-12 h-12 rounded-full object-cover mr-2 shadow cursor-pointer"
                    src={pict ? pict : defaultAva}
                    alt=""
                  />
                </button>
                {dropdownVisible && (
                  <div
                    data-aos="fade-down"
                    className="absolute top-16 mt-2 right-4 bg-gray-200 rounded px-2 py-1 hover:bg-gray-100 shadow-md"
                  >
                    <ul>
                      <li>
                        <button onClick={handleLogout}>
                          <small className="text-gray-700 flex items-center hover:text-emerald-500">
                            <span className="mr-2">
                              <IoLogOutOutline />
                            </span>{" "}
                            Logout
                          </small>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </AOS>
    </div>
  );
};

export default Header;
