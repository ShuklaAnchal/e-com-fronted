"use client";

import React from "react";

const Modal = ({ isOpen, title, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      // IMPORTANT:
      // Do NOT call onClose here.
      // Clicking the backdrop should NOT close the modal.
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* MODAL BOX */}

      <div
        className="
          relative
          w-[80%]
          max-w-4xl
          max-h-[95vh]
          overflow-y-auto
          rounded-2xl
          bg-white
          shadow-2xl
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-50
            flex
            items-center
            justify-between
            border-b
            bg-white
            px-6
            py-4
          "
        >
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

          {/* ONLY THIS BUTTON CLOSES THE MODAL */}

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-2xl
              leading-none
              text-gray-600
              transition
              hover:bg-red-100
              hover:text-red-600
            "
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
