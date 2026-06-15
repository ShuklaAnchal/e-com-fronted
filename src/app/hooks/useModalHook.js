// hooks/useModal.js

"use client";

import { useState } from "react";

export default function   useModal() {
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    content: null,
  });

  const openModal = (title, content) => {
    setModal({
      isOpen: true,
      title,
      content,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      title: "",
      content: null,
    });
  };

  return {
    modal,
    openModal,
    closeModal,
  };
}