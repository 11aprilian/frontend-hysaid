"use client";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const CommentModal = ({
  isOpen,
  closeModal, 
  onSelectAvatar 
}) => {
  const customStyles = {
    content: {
      backgroundColor: "#f1f5f9",
      borderRadius: "10px",
      width: "400px",
      height: "75%",
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleAvatarClick = (src) => {
    onSelectAvatar(src);
    closeModal();
  };

  const avatar = [
    {
      id: "1",
      src: "images/avatar/1.png",
    },
    {
      id: "2",
      src: "images/avatar/2.png",
    },
    {
      id: "3",
      src: "images/avatar/3.png",
    },
    {
      id: "4",
      src: "images/avatar/4.png",
    },
    {
      id: "5",
      src: "images/avatar/5.png",
    },
    {
      id: "6",
      src: "images/avatar/6.png",
    },
    {
      id: "7",
      src: "images/avatar/7.png",
    },
    {
      id: "8",
      src: "images/avatar/8.png",
    },
    {
      id: "9",
      src: "images/avatar/9.png",
    },
  ];

  return (
    <Modal
      data-aos="fade-up"
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div data-aos="fade-down" className="h-full ml-10 grid grid-cols-3">
        {avatar.map((ava) => (
          <div key={ava.id} className="flex justify-between items-center">
            <button
              value={ava.src}
              onClick={() => handleAvatarClick(ava.src)}
            >
              <img
                src={ava.src}
                className="w-16 h-16 rounded-full object-cover shadow"
                alt={ava.id}
              />
            </button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default CommentModal;
