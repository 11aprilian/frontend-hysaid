"use client";
import React, { useState } from "react";
import { FaRegCommentAlt, FaRegTrashAlt } from "react-icons/fa";
import CommentModal from "./CommentModal";
import axios from "axios";
import API_URL from "../url";
import Swal from "sweetalert2";

const PostcardProfile = ( postData ) => {
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
      const response = await axios.get(`${API_URL}/comment/post/${postId}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
        Swal.fire({
            icon: "warning",
            text: "Yakin lu hapus nih postingan?",
            showCancelButton: true,
            confirmButtonText: "Yoi",
            cancelButtonText: "Ga Jadi",
          }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await axios.delete(`${API_URL}/post/${postId}`);
                window.location.reload();
              }
          })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  }

  return (
    <div>
      {post.map((post) => (
        <div
          data-aos="fade-up"
          key={post._id}
          className="flex mx-4 md:mx-auto my-5  "
        >
          <div className="flex items-start px-4 py-2">
          <img
              className="w-12 h-12 rounded-full object-cover mr-4 shadow"
              src={API_URL + post.user.profilePicture}
              alt="gr"
            />
            {/* <IoPersonOutline className="w-12 h-12 rounded-full object-cover mr-4 shadow" /> */}
            <div className="">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                    {post.user.username}
                  </h2>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => handleDeletePost(post._id)} className="flex text-gray-700 text-sm mr-8">
                    <FaRegTrashAlt />
                  </button>
                </div>
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
      ))}

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

export default PostcardProfile;
