import { useEffect, useState, Fragment } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { RadioGroup } from "@headlessui/react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Loading from "../../components/Loading";
import { addWishlistItem, checkIfItemInWishlist, fetchItem, removeWishlistItem } from "../../api/apis";
import Error from "../../components/Error";
import { Link as ScrollLink } from "react-scroll";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { showToastInfo, showToastSuccess } from "../../components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartRedux";
const produc = {
  id: "productId_1234",
  name: "Basic Tee 6-Pack",
  price: "192",
  href: "#",
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  color: "Black",
  sizes: [
    { name: "S", inStock: false },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "XXL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: ["Hand cut and sewn locally", "Dyed with our proprietary colors", "Pre-washed & pre-shrunk", "Ultra-soft 100% cotton"],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const sortBy = [
  {
    name: "Relevance",
  },
  {
    name: "Highest",
  },
  {
    name: "Lowest",
  },
];
const review = [
  {
    username: "asdasd",
    rating: "5",
    comment: "asdadsasddsaaaaaaaaaaaaa",
  },
  {
    username: "hfghf",
    rating: "4",
    comment: "asdaddds",
  },
  {
    username: "tyutyu",
    rating: "5",
    comment: "aa",
  },
  {
    username: "qewqwe",
    rating: "1",
    comment: "asdadsasdds",
  },
  {
    username: "mbnmb",
    rating: "2",
    comment: "asdadsasdds",
  },
];

const reviews = { average: 5, totalCount: 117 };
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(sortBy[0]);
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const [error, setError] = useState();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState({});
  const [itemID, setItemID] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
    fetchItem(id)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
        setItemID(product.id);
      })
      .catch(() => setError(true));
    {
      isAuthenticated &&
        checkIfItemInWishlist(id, accessToken)
          .then((res) => setIsWishlisted(res.data))
          .catch((err) => console.log(err));
    }
    window.scrollTo({ top: 80, left: 0, behavior: "smooth" });
  }, []);
  const sortedReviews = [...review].sort((a, b) => {
    if (selected === sortBy[0]) {
      return b.comment.length - a.comment.length;
    } else if (selected === sortBy[1]) {
      return b.rating - a.rating;
    } else if (selected === sortBy[2]) {
      return a.rating - b.rating;
    } else {
      return 0;
    }
  });
  const handleWishList = () => {
    if (isAuthenticated) {
      if (isWishlisted) {
        removeWishlistItem(product.id, accessToken).then((res) => {
          console.log(res.data);
          setIsWishlisted(false);
        });
      } else {
        addWishlistItem(product.id, accessToken).then((res) => {
          console.log(res.data);
          setIsWishlisted(true);
        });
      }
    } else {
      return showToastInfo("Please log in before adding in wishlist.");
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (selectedSize === "") {
      return showToastInfo("Please select size.");
    }
    const { sizes, description, highlights, details, images, reviews, ...newProduct } = product;
    addToCart({ ...newProduct, image: product.images[0].src, quantity: 0, size: selectedSize.name })(dispatch);
    showToastSuccess("Item added.");
  }
  const breadcrumbs = [{ id: 0, name: "Home", to: "/" }];
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="bg-white">
      <Breadcrumbs breadcrumbs={breadcrumbs} currentPage={product.name} />
      <div className="pt-2">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="hidden aspect-w-3 aspect-h-4 transform transition duration-500 z-0 hover:z-10 hover:scale-110 overflow-hidden rounded-lg lg:block">
            <img src={product.images[0].src} alt={product.images[0].alt} className="h-full w-full object-cover object-center" />
          </div>
          <div className="hidden lg:grid  lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-w-3 transform transition duration-500 z-0 hover:z-10 hover:scale-110 aspect-h-2 overflow-hidden rounded-lg">
              <img src={product.images[1].src} alt={product.images[1].alt} className="h-full w-full object-cover object-center" />
            </div>
            <div className="aspect-w-3 transform transition duration-500 z-0 hover:z-10 hover:scale-110 aspect-h-2 overflow-hidden rounded-lg">
              <img src={product.images[2].src} alt={product.images[2].alt} className="h-full w-full object-cover object-center" />
            </div>
          </div>
          <div className="aspect-w-4 aspect-h-6 sm:overflow-hidden lg:transform transition duration-500 z-0 hover:z-10 lg:hover:scale-110 sm:rounded-lg lg:aspect-w-5 lg:aspect-h-4">
            <img src={product.images[3].src} alt={product.images[3].alt} className="hidden lg:block w-full h-full object-cover  object-center" />
            <div className="block lg:hidden px-2 ">
              <button onClick={handleWishList} title="Add to Wishlist" className="absolute top-3 right-3 z-10">
                {isWishlisted ? (
                  <HeartIconSolid className="h-10 w-10 text-red-500 hover:text-gray-400 focus:text-gray-500" />
                ) : (
                  <HeartIcon className="h-10 w-10 text-gray-400 focus:text-red-500 hover:text-red-500" />
                )}
              </button>
              {/* {selectedColor && (
                <FullScreenPortal isOpen={selectedColor} onClose={() => setSelectedColor(false)} image={product.images[selectedColor - 1]} />
              )} */}
              <Splide
                options={{
                  rewind: true,
                  width: 800,
                  type: "loop",
                  gap: "1rem",
                  arrows: false,
                  autoplay: true,
                  pauseOnFocus: true,
                }}
                className="h-3/4"
                aria-label="My Favorite Images"
              >
                {product.images.map((item,index) => (
                  <SplideSlide key={index}>
                    <img src={item.src} alt={item.alt} />
                  </SplideSlide>
                ))}
              </Splide>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto -my-20 lg:my-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div className="flex justify-between items-center">
              <div className="text-3xl flex items-center tracking-tight space-x-3 text-gray-700">
                <p className="font-mono text-gray-800">₹{product.price}</p>
                <p className="text-red-500  font-extralight italic">
                  <s>₹{product.crossprice}</s>
                </p>
                <div className="text-green-500 flex h-8 items-end font-light  text-sm italic">
                  -{Math.trunc(((product.crossprice - product.price) / product.crossprice) * 100)}%
                </div>
              </div>
              <button onClick={handleWishList} title="Add to Wishlist" className="hidden lg:block">
                {isWishlisted ? (
                  <HeartIconSolid className="h-10 w-10 text-red-500 hover:text-gray-400 focus:text-gray-500" />
                ) : (
                  <HeartIcon className="h-10 w-10 text-gray-400 focus:text-red-500 hover:text-red-500" />
                )}
              </button>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(reviews.average > rating ? "text-gray-900" : "text-gray-200", "h-5 w-5 flex-shrink-0")}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <ScrollLink to="reviews-section" smooth={true} className="ml-3 text-sm font-medium text-cyan-600 hover:text-cyan-500">
                  {reviews.totalCount} reviews
                </ScrollLink>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <p className="px-2 text-gray-500">{product.color}</p>
                {/* <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Choose a color{" "}
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {" "}
                          {color.name}{" "}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            "h-8 w-8 rounded-full border border-black border-opacity-10"
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup> */}
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-500">
                    Size guide
                  </a>
                </div>

                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                  <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                  <div className="flex grid-cols-4 gap-4  justify-between sm:grid-cols-8 lg:grid-cols-4">
                    {product.sizes.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            size.inStock ? "cursor-pointer bg-white text-gray-900 shadow-sm" : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-gray-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                            {size.inStock ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked ? "border-gray-500" : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200">
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full sticky bottom-2  items-center justify-center rounded-md border border-transparent bg-gray-900 py-3 px-8 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="reviews-section" className="mx-auto mt-6 px-2 lg:max-w-7xl  sm:px-6 w-full lg:gap-x-8 lg:px-8">
          <div className="flex justify-between ">
            <h1 className=" text-3xl font-bold ">Reviews</h1>
            <div className="w-44 mt-1">
              <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                  <>
                    <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Sort by</Listbox.Label>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6">
                        <span className="ml-3 block truncate">{selected.name}</span>

                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                      </Listbox.Button>

                      <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {sortBy.map((person, index) => (
                            <Listbox.Option
                              key={index}
                              className={({ active }) =>
                                classNames(active ? "bg-gray-600 text-white" : "text-gray-900", "relative cursor-default select-none py-2 pl-3 pr-9")
                              }
                              value={person}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                                    <span className={classNames(selected ? "font-semibold" : "font-normal", "ml-3 block truncate")}>
                                      {person.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active ? "text-white" : "text-gray-600",
                                        "absolute inset-y-0 right-0 flex items-center pr-4"
                                      )}
                                    >
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </>
                )}
              </Listbox>
            </div>
          </div>
          <div className="px-3 my-3  md:flex-auto">
            {sortedReviews.slice(0, 6).map((item, index) => (
              <div key={index} className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                <div className="w-full flex mb-4 items-center">
                  <div className="flex justify-between w-full  px-3">
                    <h6 className="font-bold text-sm uppercase text-gray-600">{item.username}</h6>
                    <div className="flex">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(item.rating > rating ? "text-gray-900" : "text-gray-200", "h-5 w-5 flex-shrink-0")}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <p className="text-sm leading-tight">
                    <span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>
                    {item.comment}
                    <span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
