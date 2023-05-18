import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Category from "../components/Category";
import Offer from "../components/Offer";
import { getCatagory, getFeaturedProducts, getHomeImage } from "../api/apis";

// const products = [
//   {
//     id: 1,
//     name: "Basic Shirt",
//     to: "/products/basic-black-tshirt",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "399",
//     crossprice: "599",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Round Neck",
//     to: "/products/round-black-tshirt",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "399",
//     crossprice: "799",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Drop Shoulder t-shirt",
//     to: "/products/blue-shirt",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "399",
//     crossprice: "549",
//     color: "Black",
//   },
//   {
//     id: 4,
//     name: "Basic Tee",
//     to: "/products/green-shirt",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "399",
//     crossprice: "699",
//     color: "Black",
//   },
//   // {
//   //   id: 5,
//   //   name: "Basic Tee",
//   //   to: "#",
//   //   imageSrc:
//   //     "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//   //   imageAlt: "Front of men's Basic Tee in black.",
//   //   price: "399",
//   //   color: "Black",
//   // },
//   // More products...
// ];
const imageArray = [
  "https://files.get2bed.online/api/view/file/moon-knight-2-0-full-sleeve-t-shirt-475393-1655750233-1.webp",
  "https://files.get2bed.online/api/view/file/men-s-black-valhalla-graphic-printed-t-shirt-480364-1656056064-1.webp",
  "https://files.get2bed.online/api/view/file/vroom-panda-half-sleeve-t-shirt-387283-1655749106-1.webp",
  "https://files.get2bed.online/api/view/file/busy-doin-nothing-boyfriend-t-shirt-dl-pineapple-yellow-277532-1670254731-2.webp",
  "https://files.get2bed.online/api/view/file/women-s-black-dope-shit-typography-boyfriend-t-shirt-486586-1655749653-1.webp",
  "https://files.get2bed.online/api/view/file/women-s-blue-wonder-woman-slim-fit-t-shirt-283902-1655748227-1.webp",
  "https://files.get2bed.online/api/view/file/spaced-nasa-half-sleeve-t-shirt-475126-1679049282-1.webp",
];

const catagory = [
  {
    id: "64416600d9a5dc74786fff0c",
    name: "Drop Shoulder",
    description: "Newly arrived drop Shoulder T-Shirts",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    to: "/drop-shoulder",
  },
  {
    id: "64416560d9a5dc74786fff0b",
    name: "Low Shoulder",
    description: "XXL size t-shirts for Gen-Z",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    to: "/low-shoulder",
  },
  {
    id: "644164b3d9a5dc74786fff09",
    name: "High Neck",
    description: "Men's section",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    to: "/high-neck",
  },
];
function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getFeaturedProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <Fragment>
      <Offer
        btnName={"Shop Collection"}
        heading={"Summer styles are finally here"}
        summary={
          "This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die."
        }
        imageArray={imageArray}
      />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            New picks for you
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group w-full relative">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200  lg:aspect-none lg:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover transition transform duration-500 ease-in-out group-hover:scale-110 object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex w-full justify-between">
                  <div className="w-2/3">
                    <h3 className="font-mono truncate text-gray-700">
                      <Link to={"/products/" + product.name}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="font-medium text-gray-900">
                      ₹{product.price}
                    </p>
                    <p className="font-light text-gray-600">
                      <s>₹{product.crossprice}</s>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Category list={catagory} />
    </Fragment>
  );
}

export default Home;
