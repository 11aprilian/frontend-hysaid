"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'; 
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthentication } from "../utils/auth";
import API_URL from "../url";
import AOS from "../components/AOS";
import MobileNavbar from "../components/MobileNavbar";

const page = () => {
  const router = useRouter();
  const { token, id, username } = useAuthentication();
  const [ content, setContent ] = useState("");

  const setNewPost = async () => {
    if ( content === "" ) {
      Swal.fire({
        title:'Kosong Njir',
        text: "Jangan bengong woy!",
        confirmButtonColor: '#10b981'
      });
    }else{
      let postData = {
        user: id,
        date: new Date(),
        content: content,
      };
  
      try {
        const newPost = await axios.post(`${API_URL}/post`, postData, {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            // authorization: localStorage.getItem("authToken"),
          },
        });
        Swal.fire({
          title: 'Posting Berhasil',
          text: "You've said!",
          confirmButtonColor: '#10b981'
        }).then(() => {
          router.push('/home');
        })
      } catch (error) {
        console.log(error);
        Swal.fire({
          text: "Posting Gagal!",
        });
      }
    }
    
  };

  return (
    <div className="h-screen">
      <AOS>
      <div data-aos="fade-down" className="heading text-center font-bold text-2xl m-5 text-gray-700">
        Say It, {username}
      </div>

      <div data-aos="fade-up" className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-lg">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className="description rounded-lg bg-transparent sec p-3 h-60 border border-gray-300 outline-none"
          value={content}
          placeholder="Apa yang terlintas di benakmu?"
        ></textarea>

        <div className="icons flex text-gray-500 m-2">
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            
          </div>
        </div>

        <div className="buttons flex">
          <Link
            href={"/"}
            className="btn rounded border border-gray-300 p-1 px-4 cursor-pointer text-gray-500 ml-auto"
          >
            Ga Jadi
          </Link>
          <button
          onClick={(e) => setNewPost(e.preventDefault())}
          className="btn rounded p-1 px-4 cursor-pointer text-gray-200 ml-2 bg-emerald-500">
            Post
          </button>
        </div>
      </div>
      </AOS>
      <MobileNavbar></MobileNavbar>
    </div>
  );
};

export default page;
