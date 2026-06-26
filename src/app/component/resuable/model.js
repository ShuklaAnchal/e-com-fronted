// components/common/Modal.jsx

"use client";

import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-3xl",
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 "
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-xl shadow-xl w-[70%] ${maxWidth} max-h-[80vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-[#5C4033]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-red-500 cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="py-2">{children}</div>
      </div>
    </div>
  );
}