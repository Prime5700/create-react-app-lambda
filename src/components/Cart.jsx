import React, { Fragment, useEffect, useRef, useState } from "react";
import { ShoppingBagIcon as ShoppingBagIconSolid } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { addAllItems, decrementQty, incrementQty, removeAllItems, removeItem } from "../redux/cartRedux";

import { getCart, updateCart } from "../api/apis";
const Cart = ({ onClose, openCart }) => {
  const [products, setProducts] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const { isAuthenticated, accessToken } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    getCart(accessToken).then((res) => {
      setProducts(res.data);
      addAllItems(res.data)(dispatch);
    });
  }, []);

  useEffect(() => {
    setProducts(cart);
    if (isAuthenticated) {
      updateCart(cart, accessToken);
    }
  }, [cart]);

  if (products.length === 0) {
    return (
      <Transition.Root show={openCart} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                        <div className="flex items-start mt-16 mb-14 justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={onClose}>
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <Fragment>
                          <div className="flex items-center justify-center h-[50vh] ">
                            <div className="grid">
                              <span className="flex items-center justify-center">
                                <ShoppingBagIconSolid className="h-16 text-gray-700 w-16 " />
                              </span>
                              <p className="font-semibold">Oops!! Your cart is empty.</p>
                              <button onClick={onClose} className="font-medium text-indigo-600 hover:text-indigo-500">
                                Shop Now
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </div>
                          </div>
                        </Fragment>
                      </div>
                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>₹0</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6 flex justify-center">
                          <button
                            type="button"
                            disabled
                            onClick={onClose}
                            className="flex items-center justify-center rounded-md border border-transparent bg-gray-500 px-16 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-600"
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{" "}
                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={onClose}>
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start mt-16 mb-14 justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={onClose}>
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-8 w-8" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <Fragment>
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products.map((product, index) => (
                              <li key={index} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img src={product.image} alt={product.imageAlt} className="h-full w-full object-cover object-center" />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={product.href}>{product.name}</a>
                                      </h3>
                                      <s>
                                        <p className="ml-20">₹{product.crossprice}</p>
                                      </s>
                                      <p className="ml-1">₹{product.price}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                      <p className="mt-1 text-sm text-gray-500">size:{product.size}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-700">
                                      <button
                                        disabled={product.quantity <= 1}
                                        onClick={() => decrementQty(product)(dispatch)}
                                        className="gap-5 px-3 text-xl"
                                      >
                                        -
                                      </button>
                                      Qty :{product.quantity}
                                      <button onClick={() => incrementQty(product)(dispatch)} className="gap-5 px-3 text-xl">
                                        +
                                      </button>
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        onClick={() => removeItem(product)(dispatch)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Fragment>
                    </div>
                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{products.reduce((a, b) => a + b.price * b.quantity, 0)}</p>
                      </div>

                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6 flex justify-center">
                        <Link to="checkout">
                          <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center justify-center rounded-md border border-transparent bg-gray-900 px-16 py-3 text-base font-medium text-white shadow-sm hover:bg-black"
                          >
                            Checkout
                          </button>
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={onClose}>
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
