import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import heartGif from "../assets/heart-gif.gif";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { deleteWishlistItem, getWishlist } from "../api/apis";
import { showToastError, showToastSuccess } from "../components/Toast";
import { useSelector } from "react-redux";
export default function WishList() {
  // const items = [
  //   {
  //     id: "productId_123456",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: true },
  //       { name: "L", inStock: true },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_1234567",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: false },
  //       { name: "L", inStock: false },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_12345678",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: true },
  //       { name: "L", inStock: true },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_123456789",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: false },
  //       { name: "L", inStock: false },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_112233",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: true },
  //       { name: "L", inStock: true },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_11223344",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: false },
  //       { name: "L", inStock: false },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_112233445566",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: true },
  //       { name: "L", inStock: true },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_11223344556677",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: false },
  //       { name: "L", inStock: false },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_1122334455667788",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: true },
  //       { name: "L", inStock: true },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  //   {
  //     id: "productId_112233445566778899",
  //     name: "Basic Tee 6-Pack",
  //     price: "192",
  //     to: "haksdhkajh",
  //     images: [
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //         alt: "Two each of gray, white, and black shirts laying flat.",
  //       },
  //       {
  //         src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //         alt: "Model wearing plain black basic tee.",
  //       },
  //     ],
  //     color: "Black",
  //     sizes: [
  //       { name: "XS", inStock: true },
  //       { name: "S", inStock: false },
  //       { name: "M", inStock: false },
  //       { name: "L", inStock: false },
  //     ],
  //     description:
  //       'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   },
  // ];
  const breadcrumbs = [
    { id: 0, name: "Home", to: "/" },
    { id: 1, name: "My Profile", to: "/my-profile" },
  ];
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [error, setError] = useState();
  const { isAuthenticated, loading, accessToken } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      getWishlist(accessToken)
        .then((res) => {
          setItems(res.data);
        })
        .catch(() => {
          setError(true);
        });
    } else {
      navigate("/auth/login");
    }
  }, []);
  const handleDelete = async (productId) => {
    await deleteWishlistItem(productId, accessToken)
      .then(() => showToastSuccess("Item removed from wishlist"))
      .catch(() => showToastError("Item already removed from wishlist"));
    const updatedProducts = items.filter((product) => product.id !== productId);
    setItems(updatedProducts);
  };
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const totalItems = items.length;
  if (totalItems === 0) {
    return (
      <div>
        <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="Wishlist" />
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 flex justify-start items-center">
          <div className="grid grid-rows-2 mx-6 lg:mx-32 md:mx-24 jusitfy-start items-start">
            <div className="mt-3">
              <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Favourites</h1>
            </div>
            <div className="mt-4">
              <p className="text-2xl tracking-tight leading-6 text-gray-600">0 items</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center h-[65vh] mb-16">
          <div className="flex-row">
            <p>
              <img src={heartGif}></img>
            </p>
            <p className="flex text-2xl justify-center w-full">Your Wishlist is Empty!!!</p>
            <p className="flex justify-center w-full text-base text-gray-500">Start adding your Favourites</p>
            <Link to="/" className="flex text-2xl mt-5 justify-center w-full">
              <p className="border border-blue-600 rounded-md px-3 py-2 text-indigo-500 hover:bg-indigo-50">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Fragment>
      <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="Wishlist" />
      <div className="mx-auto container md:px-6  2xl:px-0 flex mb-[10vh] justify-center items-center">
        <div className="flex flex-col my-6 jusitfy-start items-start">
          <div className="">
            <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Favourites</h1>
          </div>
          <div className="mt-4">
            <p className="text-2xl tracking-tight leading-6 text-gray-600">{totalItems} items</p>
          </div>

          <div className="mt-10 lg:mt-12 grid gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-16">
            {items.map((product) => (
              <div key={product.id} title={product.description} className="relative">
                {/* delete button  */}
                <button onClick={() => handleDelete(product.id)} className="absolute top-2 right-2 z-10 hover:text-red-600 text-red-400  ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>

                <div className="group relative">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                    <img
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      className="h-full w-full object-cover group-hover:scale-110 
                    group-focus:scale-110 duration-500 transform transition ease-in-out object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/products/${product.name}`}>
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                        </Link>
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      <div className="flex font-mono grid-cols-2 tracking-tight items-center justify-between text-gray-400">
                        <p className="text-xs ">Available Sizes:</p>
                        {product.sizes.map(
                          (size) =>
                            size.inStock && (
                              <span className="rounded-full border px-2 border-green-600" key={size.name}>
                                {size.name}
                              </span>
                            )
                        )}
                      </div>
                    </div>
                    <p className="text-lg font-medium text-gray-800">₹{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
