'use client'
import React, { useEffect } from 'react'
import axios from 'axios'
import API_URL from '../url';

const page = () => {
    const fetchPost = async () => {
        try {
          const response = await axios.get(`${API_URL}/post`,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420",
            },
          }
          );
          console.log(response);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        fetchPost()
      },[])
      
  return (
    <div>page</div>
  )
}

export default page