'use client'
import React, { useEffect, useState } from "react";
import Postcard from "./components/Postcard";
import MobileNavbar from "./components/MobileNavbar";
import Header from "./components/Header";
import { useAuthentication } from "./utils/auth";
import axios from "axios";
import API_URL from "./url";
import AOS from "./components/AOS";

const Page = () => {
  const { token, id, username } = useAuthentication();
  const [dataPost, setDataPost] = useState([]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/post/`);
      setDataPost(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <AOS>
      <Header></Header>
      <Postcard postData={dataPost}></Postcard>
      <MobileNavbar></MobileNavbar>
      </AOS>
    </div>
  );
};

export default Page;
