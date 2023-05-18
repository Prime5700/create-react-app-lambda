import { Fragment, useState, useEffect} from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { Bars3Icon, HeartIcon, XMarkIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { ReceiptPercentIcon } from "@heroicons/react/20/solid";

import { WalletIcon, GiftIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/logo.svg";
import { NavLink, Link, useLocation } from "react-router-dom";
import FlyoutModal from "../components/FlyoutModal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Cart from "./Cart";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Home", to: "/", current: true },
  { name: "Not Found", to: "notfound", current: false },
];
const modalItemsForLargeScreen = [
  {
    name: "Offers",
    description: "Top offers",
    to: "offers",
    icon: ReceiptPercentIcon,
  },
  {
    name: "Wallet",
    description: "Use 100% of your wallet amount in next order",
    to: "wallet",
    icon: WalletIcon,
  },
  {
    name: "Share",
    description: "Share with your friends and get extra rewards",
    to: "share",
    icon: GiftIcon,
  },
  {
    name: "My Orders",
    description: "Track your Orders",
    to: "my-orders",
    icon: ArchiveBoxIcon,
  },
];
const modalItemsForSmallScreen = [
  {
    name: "Offers",
    description: "Top offers",
    to: "offers",
    icon: ReceiptPercentIcon,
  },
  {
    name: "Wallet",
    description: "Use 100% of your wallet amount in next order",
    to: "wallet",
    icon: WalletIcon,
  },
  {
    name: "Share",
    description: "Share with your friends and get extra rewards",
    to: "share",
    icon: GiftIcon,
  },
  {
    name: "My Orders",
    description: "Track your Orders",
    to: "my-orders",
    icon: ArchiveBoxIcon,
  },
];

const helperSearches = ["Cotton T-shirts", "High collor", "Sweat Shirts", "Abc abc", "XYZ xyz"];
const loremIpsum = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "curabitur",
  "vel",
  "hendrerit",
  "libero",
  "eleifend",
  "blandit",
  "nunc",
  "ornare",
  "odio",
  "ut",
  "orci",
  "gravida",
  "imperdiet",
  "nullam",
  "purus",
  "lacinia",
  "a",
  "pretium",
  "quis",
  "congue",
  "praesent",
  "sagittis",
  "laoreet",
  "auctor",
  "mauris",
  "non",
  "velit",
  "eros",
  "dictum",
  "proin",
  "accumsan",
  "sapien",
  "nec",
  "massa",
  "volutpat",
  "venenatis",
  "sed",
  "eu",
  "molestie",
  "lacus",
  "quisque",
  "porttitor",
  "ligula",
  "dui",
  "mollis",
  "tempus",
  "at",
  "magna",
  "vestibulum",
  "turpis",
  "ac",
  "diam",
  "tincidunt",
  "id",
  "condimentum",
  "enim",
  "sodales",
  "in",
  "hac",
  "habitasse",
  "platea",
  "dictumst",
  "aenean",
  "neque",
  "fusce",
  "augue",
  "leo",
  "eget",
  "semper",
  "mattis",
  "tortor",
  "scelerisque",
  "nulla",
  "interdum",
  "tellus",
  "malesuada",
  "rhoncus",
  "porta",
  "sem",
  "aliquet",
  "et",
  "nam",
  "suspendisse",
  "potenti",
  "vivamus",
  "luctus",
  "fringilla",
  "erat",
  "donec",
  "justo",
  "vehicula",
  "ultricies",
  "varius",
  "ante",
  "primis",
  "faucibus",
  "ultrices",
  "posuere",
  "cubilia",
  "curae",
  "etiam",
  "cursus",
  "aliquam",
  "quam",
  "dapibus",
  "nisl",
  "feugiat",
  "egestas",
  "class",
  "aptent",
  "taciti",
  "sociosqu",
  "ad",
  "litora",
  "torquent",
  "per",
  "conubia",
  "nostra",
  "inceptos",
  "himenaeos",
  "phasellus",
  "nibh",
  "pulvinar",
  "vitae",
  "urna",
  "iaculis",
  "lobortis",
  "nisi",
  "viverra",
  "arcu",
  "morbi",
  "pellentesque",
  "metus",
  "commodo",
  "ut",
  "facilisis",
  "felis",
  "tristique",
  "ullamcorper",
  "placerat",
  "aenean",
  "convallis",
  "sollicitudin",
  "integer",
  "rutrum",
  "duis",
  "est",
  "etiam",
  "bibendum",
  "donec",
  "pharetra",
  "vulputate",
  "maecenas",
  "mi",
  "fermentum",
  "consequat",
  "suscipit",
  "aliquam",
  "habitant",
  "senectus",
  "netus",
  "fames",
  "quisque",
  "euismod",
  "curabitur",
  "lectus",
  "elementum",
  "tempor",
  "risus",
  "cras",
];

export default function NavBar() {
  const [active, setActive] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [openCart, setOpenCart] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const [totalItem, setTotalItem] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart } = useSelector((state) => state.cart);
  const filteredSearch = loremIpsum.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  const pp = [
    {
      id: 1,
      name: "Throwback Hip Bag",
      href: "#",
      color: "Salmon",
      price: 90,
      crossprice: 150,
      quantity: 2,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      imageAlt: "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
    },
    {
      id: 2,
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: 32,
      crossprice: 50,
      quantity: 2,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      id: 3,
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: 35,
      crossprice: 50,
      quantity: 3,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      id: 4,
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: 30,
      crossprice: 50,
      quantity: 4,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    {
      id: 5,
      name: "Medium Stuff Satchel",
      href: "#",
      color: "Blue",
      price: 31,
      crossprice: 50,
      quantity: 5,
      imageSrc: "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      imageAlt: "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
  ];
  useEffect(() => {
    setTotalItem(cart.length);
  }, [cart]);
  const handleBlur = () => {
    const timeout = setTimeout(() => {
      setActive(false);
    }, 300);
    return () => clearTimeout(timeout);
  };

  return (
    <Disclosure as="nav" className="fixed w-full z-30 bg-gray-800">
      {({ open, close }) => (
        <Fragment>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden w-1/5 justify-between">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
                {/* Search button */}
                <Link to="/search" className="flex items-center text-gray-400  justify-center">
                  <MagnifyingGlassIcon className="h-7  w-7" />
                </Link>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img className="block h-12 w-auto lg:hidden" src={Logo} alt="Your Company" />
                  </Link>
                  <Link to="/">
                    <img className="hidden h-12 w-auto lg:block" src={Logo} alt="Your Company" />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <NavLink
                      to="/"
                      className={
                        splitLocation[1] === ""
                          ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                          : "px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/aboutus"
                      className={
                        splitLocation[1] === "aboutus"
                          ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                          : "px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      to="/notfound"
                      className={
                        splitLocation[1] === "notfound"
                          ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                          : "px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    >
                      Not Found
                    </NavLink>
                    <FlyoutModal items={modalItemsForLargeScreen} />
                  </div>
                </div>
              </div>
              <div className="absolute gap-5 inset-y-0 right-0 flex items-center sm:static sm:inset-auto  sm:ml-6 sm:pr-0">
                <div className="lg:flex hidden mr-7 md:block">
                  <div className=" justify-end ">
                    <div className="flex bg-gray-500 text-gray-200 focus-within:text-gray-700  focus-within:bg-gray-400 my-2 items-center rounded-md">
                      <MagnifyingGlassIcon className="h-8 ml-2 " />
                      <input
                        onFocus={() => setActive(true)}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                        }}
                        type="text"
                        autoComplete="false"
                        className="appearance-none focus:ring-0 bg-transparent border-none w-full text-gray-800 placeholder:text-gray-300 focus-within:placeholder:text-gray-500 mr-3 py-1 px-2 leading-tight   "
                        placeholder="Search by product or catagory"
                      />
                    </div>
                    <div className={`${!active && "hidden"} bg-white absolute h-[35vh] lg:w-1/3 md:w-2/3 rounded-md`}>
                      <div className="m-6">
                        <ul>
                          {searchQuery.length === 0
                            ? helperSearches.map((item, index) => (
                                <li key={index} className="flex items-center font-thin w-1/2 m-2 gap-2 ">
                                  <MagnifyingGlassIcon className="h-3" />
                                  {item}
                                </li>
                              ))
                            : filteredSearch.map((item, index) => (
                                <Link key={index} to="/asdsfs" className="flex items-center font-thin w-1/2 m-2 gap-2 ">
                                  <MagnifyingGlassIcon className="h-3" />
                                  {item}
                                </Link>
                              ))}
                        </ul>
                        <hr />
                        <div className="m-3 ">
                          <h1 className="text-lg font-semibold">Trending Searches</h1>
                          <div className="grid grid-cols-2 ">
                            <div className="p-1 m-1 bg-gray-100 rounded">asasdadasd</div>
                            <div className="p-1 m-1 bg-gray-100 rounded">asdas</div>
                            <div className="p-1 m-1 bg-gray-100 rounded">asdas</div>
                            <div className="p-1 m-1 bg-gray-100 rounded">asdas</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link to="wishlist" title="My Wishlist" className="rounded-full p-1  text-gray-400 hover:text-red-500 focus:outline-none ">
                  <HeartIcon className=" h-7 w-7" aria-hidden="true" />
                </Link>
                <button
                  onClick={() => setOpenCart(true)}
                  title="My Cart"
                  className="rounded-full cursor-pointer text-gray-400 hover:text-blue-500 focus:outline-none"
                >
                  <ShoppingBagIcon className="h-7 w-7" aria-hidden="true" />
                  {totalItem != 0 && (
                    <p className="absolute top-1 text-sm right-0 bg-purple-500 font-bold text-white rounded-full border border-black h-5 w-5">
                      {totalItem}
                    </p>
                  )}
                </button>
                {/*      Cart             */}
                <Cart onClose={() => setOpenCart(false)} openCart={openCart} />
              </div>
            </div>
          </div>

          {/* <Disclosure.Panel  className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <Disclosure.Button>
                <NavLink
                  to="/"
                  className={
                    splitLocation[1] === ""
                      ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }>
                  Home
                </NavLink>

                <NavLink
                  to="/aboutus"
                  className={
                    splitLocation[1] === "aboutus"
                      ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }>
                  About Us
                </NavLink>

                <NavLink
                  to="/notfound"
                  className={
                    splitLocation[1] === "notfound"
                      ? "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      : "px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }>
                  Not Found
                </NavLink>
                <FlyoutModal />
              </Disclosure.Button>
            </div>
          </Disclosure.Panel> */}

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-100 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    as="a"
                    to={item.to}
                    onClick={() => {
                      navigation.map((item) => (item.current = false));
                      item.current = true;
                      close();
                    }}
                    className={classNames(
                      item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
                <FlyoutModal onClose={close} items={modalItemsForSmallScreen} />
              </div>
            </Disclosure.Panel>
          </Transition>
        </Fragment>
      )}
    </Disclosure>
  );
}
