"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MobileNavbar from "../../components/MobileNavbar";
import { useAuthentication } from "../../utils/auth";
import PostcardUser from "@/app/components/PostcardUser";
import { CiEdit } from "react-icons/ci";
import API_URL from "../../url";
import AOS from "../../components/AOS";
import AvatarSelect from "../../components/AvatarSelect";


const page = ({ params }) => {
  const { id } = useAuthentication();
  const [dataPost, setDataPost] = useState([]);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pict, setPict] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const handleSelectAvatar = (avatarSrc) => {
    setSelectedAvatar(avatarSrc);
  };

  const openModal = (postId) => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${params.userID}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setUsername(response.data.data.username);
      setBio(response.data.data.bio);
      setPict(response.data.data.profilePicture);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/post/user/${params.userID}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setDataPost(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPost();
  }, []);
  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words mb-28 w-full mt-8">
      <AOS>
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div data-aos="fade-down" className="relative">
                <img
                  className="w-32 h h-32 rounded-full object-cover shadow"
                  src={"../"+pict}
                  alt="gr"
                />
              </div>
            </div>
            <div className="w-full text-center mt-8"></div>
          </div>
          <div data-aos="fade-down" className="ms-4 mt-4">
            <h1 className="bg-transparent text-gray-700 text-2xl font-bold leading-normal mb-1">
              {username}
            </h1>
          </div>
          <div
            data-aos="fade-down"
            className="py-2 border-t border-slate-200"
          >
            <div className="">
              <div className="w-full px-4">
                <p className="font-light w-full h-full text-slate-600 mb-4 bg-transparent">
                  {bio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <MobileNavbar />
        <div data-aos="fade-down">
          <h1 className="text-slate-600 text-sm mt-16 ms-10 font-bold">
            POSTINGAN
          </h1>
        </div>
        <div>
          <PostcardUser postData={dataPost}></PostcardUser>
        </div>
      </AOS>

      <AvatarSelect
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSelectAvatar={handleSelectAvatar}
      />
    </div>
  );
};

export default page;
