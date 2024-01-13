"use client";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import MobileNavbar from "../components/MobileNavbar";
import { useAuthentication } from "../utils/auth";
import PostcardProfile from "../components/PostcardProfile";
import { CiEdit } from "react-icons/ci";
import API_URL from "../url";
import AOS from "../components/AOS";

const page = () => {
  const { id } = useAuthentication();
  const [dataPost, setDataPost] = useState([]);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [pict, setPict] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`, 
      {
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
      const response = await axios.get(`${API_URL}/post/user/${id}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setDataPost(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("bio", bio);

      // Hanya menambahkan profilePicture ke FormData jika selectedImage tidak null
      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }

      Swal.fire({
        text: "Update Profile?",
        showCancelButton: true,
        confirmButtonText: "Yoi",
        cancelButtonText: "Ga Jadi",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.put(`${API_URL}/user/${id}`, formData, {
            headers: {
              Accept: "*/*",
              "ngrok-skip-browser-warning": "69420"
              // No need to set Content-Type; it will be set automatically by FormData
            },
          });
        }
        fetchProfile();
        fetchPost();
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: "Gagal Update!",
      });
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPost();
  }, []);
  return (
    <div className="relative max-w-md mx-auto md:max-w-2xl min-w-0 break-words mb-36 w-full mt-16">
      <AOS>
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div data-aos="fade-down" className="relative">
                <div className="flex justify-end">
                  <button onClick={()  => fileInputRef.current.click()}>
                    <CiEdit />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={(e) => setSelectedImage(e.target.files[0])}
                  />
                </div>
                <img
                  className="w-40 h-40 rounded-full object-cover shadow"
                  src={
                    selectedImage ? URL.createObjectURL(selectedImage) : pict
                  }
                  alt="gr"
                />
              </div>
            </div>
            <div className="w-full text-center mt-14"></div>
          </div>
          <div data-aos="fade-down" className="ms-4 mt-4">
            <input
              type="text"
              className="bg-transparent text-gray-700 text-2xl font-bold leading-normal mb-1"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div data-aos="fade-down" className="py-2 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <textarea
                  className="font-light w-full h-full text-slate-600 mb-4 bg-transparent"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button
                onClick={updateProfile}
                className="btn rounded border border-gray-300 p-1 px-4 cursor-pointer text-gray-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <MobileNavbar />
        <div data-aos="fade-down">
          <h1 className="text-slate-600 ms-8 font-bold">Postinganmu</h1>
        </div>
        <div>
          <PostcardProfile postData={dataPost}></PostcardProfile>
        </div>
      </AOS>
    </div>
  );
};

export default page;