import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SortModal({ onClose , products}) {
  const [message, setMessage] = useState("");
  const [data, setData] = useState(products);
  
  const handleConfirm1 = () => {
    onClose();
  };
  const handleConfirm2 = () => {
    onClose();
  };
  const handleConfirm3 = () => {
    onClose();
  };
  const handleConfirm4 = () => {
    onClose();
  };

  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-transparent rounded-md backdrop-blur-sm">
      <div className="h-2/5 w-full m-6 rounded-md bg-white">
      <div className="flex  bg-gray-100 rounded-md justify-center p-5 items-center">
        <p className="text-xl font-mono font-semibold">Sort By</p>
        <button className="absolute right-8" onClick={onClose}>
          <XMarkIcon className="h-8" />
        </button>
      </div>

      <div className="grid mt-5 h-2/3 font-mono font-semibold divide-y w-full">
        <button onClick={handleConfirm1} className="underline text-gray-500">
          Popular
        </button>
        <button onClick={handleConfirm2} className="underline text-gray-500">
          Price (Low to High)
        </button>
        <button onClick={handleConfirm3} className="underline text-gray-500">
          Price (High to Low)
        </button>
        <button onClick={handleConfirm4} className="underline text-gray-500">
          Newly Added
        </button>
      </div>
      </div>
    </div>
  );
}
