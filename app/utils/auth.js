// auth.js
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import { useRouter } from 'next/navigation'; 

export const useAuthentication = () => {
  const router = useRouter();
  const token = Cookies.get('token');
  const id = Cookies.get('id');
  const API = "http://localhost:3011"
  const [username, setUsername] = useState("")


  const fetchUser = async () => {
    try {
      const response = await axios.get(API + "/user/" + id);
      setUsername(response.data.data.username)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
    fetchUser()
  }, [token, router]);

  return { token, id, username };
};
