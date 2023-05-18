import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  ArrowsUpDownIcon,
  AdjustmentsVerticalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Link } from "react-router-dom";
import AddWishlistPopover from "../../components/AddWishlistPopover";
import FilterModal from "./FilterModal";
const products = [
  {
    id: "1",
    name: "Black T-shirt",
    description: "Cotton fibre",
    price: "299",
    crossprice: "599",
    sizes: ["M", "L"],
    color: "Gray",
    fit: "oversized",
    imagesmc: "https://picsum.photos/300/200",
    to: "/products/asdas",
  },
  {
    id: "2",
    name: "Blue T-shirt",
    description: "Round Neck",
    price: "899",
    crossprice: "999",
    sizes: ["M", "XXL"],
    color: "Gray",
    fit: "dryfit",
    imagesmc: "https://picsum.photos/400/700",
    to: "/product/abc",
  },
  {
    id: "3",
    name: "GreenT-shirt",
    description: "Half Sleeve",
    price: "799",
    crossprice: "899",
    sizes: ["M", "XL"],
    color: "Green",
    fit: "oversized",
    imagesmc: "https://picsum.photos/250/150",
    to: "/product/abcd",
  },
  {
    id: "4",
    name: "Grey T-shirt",
    description: "Regular Fit",
    price: "599",
    crossprice: "699",
    sizes: ["M", "XXXL"],
    color: "White",
    fit: "oversized",
    imagesmc: "https://picsum.photos/600/500",
    to: "/product/sea",
  },
  {
    id: "5",
    name: "Red T-shirt",
    description: "100 % Cotton fibre",
    price: "999",
    crossprice: "1099",
    sizes: ["L", "XL"],
    color: "Black",
    fit: "dryfit",
    imagesmc: "https://picsum.photos/600/555",
    to: "/product/pack",
  },
  {
    id: "6",
    name: "Purple T-shirt",
    description: "Slik fibre",
    price: "1999",
    crossprice: "1599",
    sizes: ["M", "XL"],
    color: "White",
    fit: "dryfit",
    imagesmc: "https://picsum.photos/505/600",
    to: "/product/wear",
  },
  {
    id: "7",
    name: "Orange T-shirt",
    description: "Tighty knit fibre",
    price: "299",
    crossprice: "359",
    sizes: ["XL", "M", "L"],
    color: "Blue",
    fit: "oversized",
    imagesmc: "https://picsum.photos/180/100",
    to: "/product/clean",
  },
  {
    id: "8",
    name: "Baby Pink T-shirt",
    description: "Casual Regular Half Sleeve Tighty Knit fibre",
    price: "99",
    crossprice: "199",
    sizes: ["S", "M", "XL"],
    color: "Gray",
    fit: "dryfit",
    imagesmc:
      "https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg",
    to: "/product/iron",
  },
];
const modal = document.createElement("div");
document.body.appendChild(modal);
modal.setAttribute("id", "sortModal");
const breadcrumbs = [{ id: 0, name: "Home", to: "/" }];
const Sorting = () => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filteredData, setFilteredData] = useState(products);

  return (
    <div className="min-h-screen">
      {/* filter for mobile  */}
      <div className="block pt-16 lg:hidden">
        {/* sort and filter division  */}
        <div className="grid grid-cols-1 fixed w-full h-12 shadow font-extralight backdrop-blur">
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex items-center justify-around">
            <div className="flex">
              <ArrowsUpDownIcon className="h-6" />
              <p className="text-xl">Sort</p>
            </div>
            <div className="flex">
              <AdjustmentsVerticalIcon className="h-6" />
              <p className="text-xl">Filter</p>
            </div>
          </button>
          {showFilterModal &&
            createPortal(
                <FilterModal
                  onData={(d) => {
                    setFilteredData(d);
                  }}
                  onClose={() => {
                    setShowFilterModal(false);
                  }}
                  products={products}
                />
              ,
              modal
            )}
        </div>
        <div className="pt-12">
          <div className="grid grid-cols-2 lg:grid-cols-6 ">
            {filteredData.map((item) => (
              <div key={item.id} className="min-h-[50vh] p-1 lg:p-3">
                  <div className="h-4/5">
                <Link to={item.to}>
                  <img
                    className="h-full object-cover"
                    src={item.imagesmc}
                    alt="asdads"
                    />
                </Link>
                    </div>
                <div className="m-2">
                  <div className="truncate">{item.name}</div>
                  <div className="tracking-tight text-sm font-extralight truncate">
                    {item.description}{" "}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <p className="font-semibold">₹{item.price}</p>
                      <s className="text-gray-600 ml-2">₹{item.crossprice}</s>
                      <p className="ml-1 text-emerald-700 font-mono text-sm">
                        {(100 - (item.price / item.crossprice) * 100).toFixed(
                          1
                        )}
                        %
                      </p>
                    </div>
                    <button>
                      <HeartIcon className="h-7 focus:text-red-500 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* filter for pc  */}
      <div className="hidden lg:block">
        <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="Products" />
        <div className="h-full flex pt-8 pl-40">
          <div className="w-1/3">
            <FilterModal
              onClose={() => setShowFilterModal(false)}
              onData={(d) => setFilteredData(d)}
              products={products}
            />
          </div>
          <div className="grid grid-cols-3 m-3 w-full">
            {filteredData.map((item, index) => (
              <div key={index} className="min-h-[50vh] p-1 lg:p-3">
                <Link to={item.to}>
                  <div className="h-[400px] w-full">
                    <img
                      className=" h-full w-full object-cover"
                      src={item.imagesmc}
                      alt="asdads"
                    />
                  </div>
                </Link>
                <div className="m-2">
                  <div className="truncate">{item.name}</div>
                  <div className="tracking-tight text-sm font-extralight truncate">
                    {item.description}{" "}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <p className="font-semibold">₹{item.price}</p>
                      <s className="text-gray-600 ml-2">₹{item.crossprice}</s>
                      <p className="ml-1 text-emerald-700 font-mono text-sm">
                        {(100 - (item.price / item.crossprice) * 100).toFixed(
                          1
                        )}
                        %
                      </p>
                    </div>
                    <div onClick={() => console.log("sad")}>
                      <AddWishlistPopover
                        buttonName={<HeartIcon className="h-7 text-gray-600" />}
                        sucessMessage="Product added to Wishlist"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sorting;
