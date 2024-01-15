"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useAuthentication } from "../utils/auth";
import API_URL from "../url";

const CommentModal = ({
  isOpen,
  closeModal,
  comments,
  fetchComment,
  postId,
}) => {
  const { token, id, username } = useAuthentication();
  const [content, setContent] = useState("");

  const commentData = {
    user: id,
    post: postId,
    date: new Date(),
    content: content,
  };

  const setNewComment = async () => {
    if (content === "") {
      Swal.fire({
        title: "Kosong njir",
        text: "Jangan bengong woy!",
        confirmButtonColor: "#10b981",
      });
    } else {
      try {
        const newComment = await axios
          .post(`${API_URL}/comment`, commentData, {
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
          })
          .then(() => {
            setContent("");
            fetchComment(postId);
          });
      } catch (error) {
        console.log(error);
        Swal.fire({
          text: "Komentar Gagal!",
        });
      }
    }
  };

  const customStyles = {
    content: {
      backgroundColor: "#f1f5f9",
      borderRadius: "10px",
      width: "80%",
      height: "75%",
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setNewComment();
    setContent("");
  };

  return (
    <Modal
      data-aos="fade-up"
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Comment Modal"
      style={customStyles}
    >
      <div className="">
        {/* <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer"
        >
          &times;
        </button> */}
        <form className="mt-2 p-4 flex justify-center">
          <input
            onChange={(e) => setContent(e.target.value)}
            value={content}
            type="text"
            name="comment"
            className="bg-transparent w-full"
            placeholder="Add a comment"
          />
          <button
            onClick={handleFormSubmit}
            type="submit"
            className="rounded text-white p-1 px-2 text-sm bg-emerald-400 hover:bg-emerald-300"
          >
            Bacotin
          </button>
        </form>
      </div>

      <div data-aos="fade-up" className="scroll-container h-full">
        <ul className="space-y-4 p-4">
          {comments.map((comment, index) => (
            <li key={index}>
              <div className="flex items-center">
                <img
                  className="w-8 h-8 rounded-full object-cover mr-4 shadow"
                  src={"../" + comment.user.profilePicture}
                  alt="gr"
                />
                <div>
                  <h1 className="font-bold text-sm text-gray-800">
                    {comment.user.username}
                  </h1>
                  <p className="text-xs text-gray-600">{comment.content}</p>
                </div>
              </div>
              {index !== comments.length - 1 && <hr className="my-2" />}
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default CommentModal;
