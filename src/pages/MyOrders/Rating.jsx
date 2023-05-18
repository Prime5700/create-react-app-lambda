import { StarIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const Rating = ({ rated,itemID }) => {
  const [rating, setRating] = useState(0);
  function handelSubmit(e) {
    e.preventDefault();
    console.log(rating + "====" + itemID);
  }
  return (
    <div className="flex justify-center mb-5 ">
      <form onSubmit={handelSubmit}>
        <button onClick={() => setRating(1)}>
          <StarIcon
            className={`${
              rating > 0 ? "text-yellow-500" : "text-gray-300"
            }  h-8 `}
          />{" "}
        </button>
        <button onClick={() => setRating(2)}>
          <StarIcon
            className={`${
              rating > 1 ? "text-yellow-500" : "text-gray-300"
            }  h-8 `}
          />{" "}
        </button>
        <button onClick={() => setRating(3)}>
          <StarIcon
            className={`${
              rating > 2 ? "text-yellow-500" : "text-gray-300"
            }  h-8 `}
          />{" "}
        </button>
        <button onClick={() => setRating(4)}>
          <StarIcon
            className={`${
              rating > 3 ? "text-yellow-500" : "text-gray-300"
            }  h-8 `}
          />{" "}
        </button>
        <button onClick={() => setRating(5)}>
          <StarIcon
            className={`${
              rating > 4 ? "text-yellow-500" : "text-gray-300"
            }  h-8 `}
          />{" "}
        </button>
      </form>
    </div>
  );
};

export default Rating;
