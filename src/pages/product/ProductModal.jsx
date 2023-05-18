import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const FullScreenPortal = ({ isOpen, onClose, image }) => {
  const portalRoot = document.getElementById("portal-root");

  useEffect(() => {
    if (isOpen) {
      portalRoot.classList.add("overflow-hidden");
    } else {
      portalRoot.classList.remove("portal-open");
    }
  }, [isOpen, portalRoot]);

  return (
    isOpen &&
    ReactDOM.createPortal(
      <div className="w-full h-full bg-white fixed top-0 left-0 py-20 z-20">
        <div className="h-full">
          <img src={image.src} alt={image.alt} />
        </div>
        <div className="flex justify-center items-center">
          <button onClick={onClose}>
            <XMarkIcon className="h-16 ring-gray-800 ring-1 rounded-full p-2 text-gray-700" />
          </button>
        </div>
      </div>,
      portalRoot
    )
  );
};

export default FullScreenPortal;
