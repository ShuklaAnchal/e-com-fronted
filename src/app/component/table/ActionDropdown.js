// components/ActionDropdown.jsx

import { HiOutlineDotsVertical } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";

export default function ActionDropdown({
  onEdit,
  onView,
  onDelete,
  onAddVariant,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md hover:bg-gray-100"
      >
        <HiOutlineDotsVertical />
      </button>

      {open && (
        <div className="absolute right-0 top-6 z-50 bg-white border rounded-lg shadow-lg w-20   ">
          <button
            onClick={onEdit}
            className="block w-full px-4 py-2 text-left border-b-[1px]  "
          >
            Edit
          </button>

          <button
            onClick={onView}
            className="block w-full px-4 py-2 text-left border-b-[1px]  "
          >
            View
          </button>

          {onAddVariant && (
            <button
              className="block w-full px-4 py-2 text-left border-b-[1px]  "
              onClick={onAddVariant}
            >
              Add Variant
            </button>
          )}

          <button
            onClick={onDelete}
            className="block w-full px-4 py-2 text-left text-red-500"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
