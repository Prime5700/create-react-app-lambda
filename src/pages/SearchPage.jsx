import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const backArrow = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5 19.5 8 12l7.5-7.5"
      stroke="#303030"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const products = [
  {
    id: "p1",
    name: "Basic shirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p2",
    name: "Black shirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p3",
    name: "green tshirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p4",
    name: "blue half tshirt",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p5",
    name: "sandwich burger",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p6",
    name: "momo",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p7",
    name: "snake",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p8",
    name: "samosa",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p9",
    name: "printed",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p10",
    name: "collar",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p11",
    name: "popat",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p12",
    name: "hen",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p13",
    name: "coke",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p14",
    name: "peacock",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p15",
    name: "monster",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p16",
    name: "charge",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p17",
    name: "hell",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p18",
    name: "red bull",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p19",
    name: "sting",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
  {
    id: "p20",
    name: "kallu",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    imageAlt: "Two each of gray, white, and black shirts arranged on table.",
  },
];
const product = {
  id: "p1",
  name: "Basic Tee 6-Pack ",
  href: "#",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
  imageAlt: "Two each of gray, white, and black shirts arranged on table.",
};
const trendingSearches = [
  {
    id: "0",
    name: "Printed shirts",
    to: "/abc",
  },
  {
    id: "1",
    name: "xyz",
    to: "/abc",
  },
  {
    id: "2",
    name: "Shirts",
    to: "/abc",
  },
  {
    id: "3",
    name: "T-Shirts",
    to: "/abc",
  },
];
const SearchPage = () => {
  const navigate =useNavigate()
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, 5);
  const inputRef = useRef(null);
  return (
    <div className="pt-16 h-full">
      {/* search panel */}
      <div className="flex justify-between items-center">
        <button onClick={()=>navigate(-1)}>
          <div className="m-2">{backArrow}</div>
        </button>
        <div className="flex w-full bg-gray-100 my-2 items-center rounded-md">
          <MagnifyingGlassIcon className="h-6 ml-2 " />
          {/* search with form  */}
          <form
            className="w-full"
            onSubmit={(e) => {
              e.preventDefault();
              console.log(searchQuery);
            }}
          >
            <input
              type="text"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              autoFocus
              ref={inputRef}
              autoComplete="false"
              className="appearance-none focus:border-transparent focus:ring-0 bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none "
              placeholder="Search by product or catagory"
            />
          </form>
        </div>
        <button onClick={() => (inputRef.current.value = "")}>
          <XMarkIcon className="h-8 w-8 mx-2" />
        </button>
      </div>
      <hr />
      <div className="m-5">
        <h1 className="text-xl font-bold">Products</h1>
        {/* products images with name  */}
        <Fragment>
          <div className="m-2 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            {filteredProducts.map((item) => (
              <div key={item.id} className="m-3">
                <img src={item.imageSrc} alt={item.imageAlt} />
                <p className="tracking-tighter text-sm text-gray-600">
                  {" "}
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </Fragment>
        {/* trending searches  */}
        {filteredProducts.length === 0 && (
          <Fragment>
            <p className="font-semibold">Trending Searches</p>
            <div className="m-3 flex text-sm">
              {trendingSearches.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className=" bg-gray-100 p-2 m-1 flex items-center"
                >
                  <MagnifyingGlassIcon className="h-3 m-1" />
                  <p className="font-thin">{item.name}</p>
                </Link>
              ))}
            </div>
          </Fragment>
        )}

        <hr />
      </div>
      <div className="m-5">
        <h1 className="text-2xl font-bold">Popular picks</h1>
        <div className="m-2">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            <div className="m-3">
              <img src={product.imageSrc} alt="" />
              <p className="tracking-tighter text-sm text-gray-600">
                {" "}
                {product.name}
              </p>
            </div>
            <div className="m-3">
              <img src={product.imageSrc} alt="" />
              <p className="tracking-tighter text-sm text-gray-600">
                {" "}
                {product.name}
              </p>
            </div>
            <div className="m-3">
              <img src={product.imageSrc} alt="" />
              <p className="tracking-tighter text-sm text-gray-600">
                {" "}
                {product.name}
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="m-5">
        <h1 className="text-2xl font-bold">Collections</h1>
        <div className="m-2">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
            <div className="m-3 bg-gray-100 p-2">
              <p className="tracking-tighter text-sm text-gray-600">Low neck</p>
            </div>
            <div className="m-3 bg-gray-100 p-2">
              {/* <img src={product.imageSrc} alt="" /> */}
              <p className="tracking-tighter text-sm text-gray-600">
                Over sized
              </p>
            </div>
            <div className="m-3 bg-gray-100 p-2">
              {/* <img src={product.imageSrc} alt="" /> */}
              <p className="tracking-tighter text-sm text-gray-600">
                Beach Prints
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default SearchPage;
