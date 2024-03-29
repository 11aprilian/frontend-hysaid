"use client";
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaRegCommentAlt } from "react-icons/fa";
import CommentModal from "./CommentModal";
import axios from "axios";
import API_URL from "../url";
import Link from "next/link";

const Postcard = (postData) => {
  const post = postData.postData;
  const [postId, setPostId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState([]);

  const openModal = (postId) => {
    setPostId(postId);
    setIsModalOpen(true);
    fetchComment(postId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchComment = async (postId) => {
    try {
      const response = await axios.get(`${API_URL}/comment/post/${postId}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="mb-24 h-screen">
      {post.length === 0 ? (
        <div data-aos="fade-down" className="flex justify-center items-center mx-4 md:mx-auto h-screen my-5 max-w-md md:max-w-2xl">
          <p className="text-lg font-semibold text-gray-700">
            Oops, belum ada postingan cuyyy!!
          </p>
        </div>
      ) : (
        post.map((post) => (
          <div
            data-aos="fade-up"
            key={post._id}
            className="flex mx-4 md:mx-auto my-5 max-w-md md:max-w-2xl"
          >
            <div className="flex items-start px-4 py-6">
              <Link href={"/user/" + post.user._id}>
              <img
                className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                src={post.user.profilePicture}
                alt=""
              />
              </Link>
              <div className="">
                <div className="flex items-center justify-between">
                  <Link href={"/user/" + post.user._id} className="text-lg font-semibold text-gray-800 hover:text-gray-500  -mt-1">
                    {post.user.username}
                  </Link>
                </div>
                <small className="text-gray-700">
                  {post.date.slice(0, 10)} {post.date.slice(11, 16)}
                </small>
                <p className="mt-3 text-gray-700 text-sm">{post.content}</p>
                <div className="mt-4 flex items-center">
                  <button
                    className="flex text-gray-700 text-sm mr-8"
                    onClick={() => openModal(post._id)}
                  >
                    <FaRegCommentAlt />
                    {/* <span className="ms-2">{comments.length}</span> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      <CommentModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        comments={comments}
        postId={postId}
        fetchComment={fetchComment}
      />
    </div>
  );
};

export default Postcard;
