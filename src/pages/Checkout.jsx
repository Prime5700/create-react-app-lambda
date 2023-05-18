import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import emptyCart from "../assets/empty-cart.gif";
import { useDispatch, useSelector } from "react-redux";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { addressFetch, paymentApi, paymentSuccess } from "../api/apis";
import {
  showToastError,
  showToastErrorAutoCloseOff,
  showToastInfo,
  showToastSuccess,
  showToastWarningAutoCloseOff,
} from "../components/Toast";
import { removeAllItems } from "../redux/cartRedux";
const __DEV__ = document.location.hostname === "localhost";
export default function Checkout() {
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [orderId, setOrderId] = useState("");
  
  const [contact, setContact] = useState({
    number: "",
  });
  const { isAuthenticated, accessToken, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (isAuthenticated) {
      if (cart) {
        setItems(cart);
      } else {
        setItems([]);
      }
    } else {
      navigate("/auth/login");
    }
  }, [cart]);
  useEffect(() => {
    if (isAuthenticated) {
      addressFetch(accessToken)
        .then((res) => setAddress(res.data))
        .catch((err) => showToastError(err.response.data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address.filter((item) => item.id === selectedAddress)));
    setContact(JSON.parse(localStorage.getItem("address"))[0]);
    return () => {
      localStorage.removeItem("address");
    };
  }, [selectedAddress]);

  const breadcrumbs = [{ id: 0, name: "Home", to: "/" }];
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    if (selectedAddress === "") {
      showToastInfo("Please select address.");
      return;
    }
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      showToastError("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const result = await paymentApi(cart, accessToken);
    if (!result) {
      alert("Server error.Please check internet connection.");
      return;
    }

    const { amount, orderId, receipt, username } = result.data;
    const key = process.env.REACT_APP_RAZRORPAY_KEY;
    const options = {
      key: __DEV__ ? key : "",
      amount: amount,
      currency: "INR",
      receipt: receipt,
      image: `http://${window.location.hostname}:8080/api/view/file/logo-dark.svg`,
      name: "Who Cares | What | We | Wear ",
      description: "Transaction",
      order_id: orderId,
      handler: async function (response) {
        const data = {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          paymentSignature: response.razorpay_signature,
          cartItemRequests: cart,
          addressId: selectedAddress,
          totalPrice: amount,
        };
        showToastSuccess("Payment Successfull.");
        await paymentSuccess(data, accessToken).catch((error) => console.log(error.response.data));
        removeAllItems()(dispatch);
        // navigate("/order-success",{state:{orderDetails:data}})
        setOrderId(response.razorpay_order_id);
      },
      prefill: {
        name: username,
        email: email,
        contact: contact.number,
      },
      notify: {
        sms: true,
        email: true,
      },
      notes: {
        username: username,
        email: email,
        addressId: selectedAddress,
      },
      theme: {
        color: "#041C32",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.log(response);
      showToastWarningAutoCloseOff("Payment failed.");
      showToastErrorAutoCloseOff(response.error.description);
    });
  }
  useEffect(() => {
    if (isAuthenticated) {
      if (orderId) {
        navigate(`/my-orders/${orderId}`);
      }
    }
  }, [orderId, navigate]);

  if (items.length === 0) {
    return (
      <div>
        <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="Checkout" />
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <img className="h-36 w-40" src={emptyCart} alt="Empty Cart" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-500 mb-8 ">Looks like you haven't added anything into your cart yet.</p>
          <Link to="/" className="border border-blue-600 hover:bg-blue-100 text-blue-600 font-semibold py-3 px-5 rounded">
            Start shopping
          </Link>
        </div>
      </div>
    );
  }
  // return (
  //   <div className="flex p-6 py-10 lg:px-8 flex-col md:flex-row">
  //     {/*Left Section */}
  //     <div className="md:w-3/4 p-8">
  //       <div className="mt-3">
  //         <h1 className="text-3xl lg:text-4xl tracking-tight font-semibold leading-8 lg:leading-9 text-gray-800">Items</h1>
  //       </div>
  //       <div className="mt-4">
  //         <p className="text-2xl tracking-tight leading-6 text-gray-600">{items.length} items</p>
  //       </div>
  //       {items.map((product) => (
  //         <div key={product.id} className="flex justify-between items-center border-b pb-4 mb-4">
  //           <div className="justify-start">
  //             <img src={product.image} alt={product.name} className="h-24 w-24" />
  //             {product.name}
  //             <p className="mt-1 text-xs text-gray-500">{product.imageAlt}</p>
  //           </div>
  //           <div className="grid grid-cols-2 items-center">
  //             <div className="col-span-2 text-xl">₹{product.price}</div>
  //             <br />
  //             <div className="col-span-2 text-s text-gray-00">Qty:{product.quantity}</div>
  //           </div>
  //         </div>
  //       ))}
  //       <div className="flex justify-between items-center pt-4"></div>
  //     </div>
  //     {/*Right section */}
  //     <div className="md:w-1/2  p-8">
  //       <AddressPage />
  //       <h2 className="text-2xl font-bold mb-4">Price Details</h2>
  //       <div className="flex justify-between pt-4 font-medium">
  //         <div className="font-semibold text-xl">Item price total</div>
  //         <div className="font-semibold">₹{items.reduce((a, b) => a + b.crossprice * b.quantity, 0)}</div>
  //       </div>
  //       <div className="flex justify-between pt-4 font-medium">
  //         <div className="font-semibold text-xl">Discount</div>
  //         <div className="font-semibold">
  //           <s className="text-red-500">
  //             ₹{items.reduce((a, b) => a + b.crossprice * b.quantity, 0) - items.reduce((a, b) => a + b.price * b.quantity, 0)}
  //           </s>
  //         </div>
  //       </div>
  //       <div className="flex justify-between pt-4 font-medium">
  //         <div className="font-semibold text-xl">Shipping</div>
  //         <div className="font-semibold">
  //           <s className="text-red-500">₹40</s>
  //         </div>
  //       </div>
  //       <div className="border-b pb-4 mb-4"></div>
  //       <div className="flex justify-between pt-4 font-medium">
  //         <div className="font-bold text-xl">Total Amount</div>
  //         <div className="font-semibold">₹{items.reduce((a, b) => a + b.price * b.quantity, 0)}</div>
  //       </div>
  //       <div className="border-b pb-4 mb-4"></div>
  //       <div className="flex justify-between pt-4 font-medium">
  //         <div className="font-semibold text-xl">You Saved</div>
  //         <div className="font-medium text-green-600">
  //           ₹{items.reduce((a, b) => a + b.crossprice * b.quantity, 0) - items.reduce((a, b) => a + b.price * b.quantity, 0) + 40}
  //         </div>
  //       </div>
  //       <div className="border-b pb-4 mb-4"></div>
  //       <button
  //         onClick={displayRazorpay}
  //         className="flex items-center justify-center rounded-md mt-10 border border-transparent px-24 mx-auto max-w-lg bg-indigo-600  py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-800"
  //       >
  //         Place Order
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-gray-100">
      <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="Checkout" />
      <div className="max-w-3xl mx-auto p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <h2 className="text-xl font-semibold mb-4">Total items : {items.length}</h2>
        </div>
        <div className="bg-white rounded border border-gray-200 shadow mb-1">
          <Splide
            options={{
              direction: "ttb",
              height: "10rem",
              gap: "1rem",
              arrows: false,
              autoplay: true,
              pauseOnFocus: true,
            }}
            aria-label="My Favorite Images"
          >
            {items.map((item, index) => (
              <SplideSlide key={index}>
                <span className="h-40 flex">
                  <div className="flex items-center w-40 p-3 rounded ">
                    <img src={item.image} alt="" className="h-32 rounded" />
                  </div>
                  <div className="flex w-full justify-between">
                    <div className="py-4 px-2">
                      <h1 className="text-gray-900 font-semibold">{item.name}</h1>
                      <h2 className="text-gray-500 font-medium tracking-tight">{item.color}</h2>
                      <h3 className="text-gray-500 text-sm">{item.size}</h3>
                      <h4 className="text-gray-500 text-sm">Qty:{item.quantity}</h4>
                    </div>
                    <div className="py-4 pr-7 text-gray-800">
                      <p className="text-xl font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                </span>
              </SplideSlide>
            ))}
          </Splide>
        </div>

        <div className="bg-white p-3 rounded border border-gray-200 shadow mb-4">
          <h1 className=" font-medium">Delivery Address</h1>
          <div>
            <Splide
              options={{
                perPage: 3,
                perMove: 1,
                height: "15rem",
                arrows: false,
                focus: "center",
                trimSpace: false,
                breakpoints: {
                  600: {
                    perPage: 2,
                    height: "10rem",
                  },
                },
              }}
              className="h-3/4"
              aria-label="My Favorite Images"
            >
              {address.map((item, index) => (
                <SplideSlide key={index} className="flex items-center justify-center py-3 px-4 focus:outline-none sm:flex-1 sm:py-6">
                  <button
                    onClick={() => setSelectedAddress(item.id)}
                    className={`${selectedAddress === item.id && "ring-2 ring-cyan-700 border-cyan-700"} border rounded-md w-72`}
                  >
                    <div className="grid m-1">
                      <p className=" font-semibold my-1 truncate">{item.name}</p>
                      <span className="mx-2 text-xs tracking-tighter truncate">
                        {item.area} {", "} {item.city} {", "}
                        {item.state}
                      </span>
                      <p className="text-gray-600 text-xs tracking-tighter truncate">Landmark : {item.landmark}</p>

                      <p className="mx-3 text-sm">Pincode : {item.pincode}</p>
                      <p className="mx-3">{item.number}</p>
                    </div>
                  </button>
                </SplideSlide>
              ))}
              <SplideSlide>
                <Link to="/my-address" className="flex items-center text-lg font-semibold underline text-cyan-700 justify-center h-full">
                  +Add address
                </Link>
              </SplideSlide>
            </Splide>
          </div>
          <hr />

          <h2 className="text-xl font-bold my-4">Price Details</h2>
          <div className="flex justify-between pt-4 font-medium">
            <div className="font-semibold text-lg">Item price total</div>
            <div className="font-semibold">₹{items.reduce((a, b) => a + b.crossprice * b.quantity, 0)}</div>
          </div>
          <div className="flex justify-between pt-4 font-medium">
            <div className="font-semibold text-lg">Discount</div>
            <div className="font-semibold">
              <s className="text-red-500">
                ₹{items.reduce((a, b) => a + b.crossprice * b.quantity, 0) - items.reduce((a, b) => a + b.price * b.quantity, 0)}
              </s>
            </div>
          </div>
          <div className="flex justify-between pt-4 font-medium">
            <div className="font-semibold text-lg">Shipping</div>
            <div className="font-semibold">
              <s className="text-red-500">₹40</s>
            </div>
          </div>
          <div className="border-b pb-4 mb-4"></div>
          <div className="flex justify-between pt-4 font-medium">
            <div className="font-bold text-lg">Total Amount</div>
            <div className="font-semibold">₹{items.reduce((a, b) => a + b.price * b.quantity, 0)}</div>
          </div>
          <div className="border-b pb-4 mb-4"></div>
          <div className="flex justify-between pt-4 font-medium">
            <div className="font-semibold text-lg">You Saved</div>
            <div className="font-medium text-green-600">
              ₹{items.reduce((a, b) => a + b.crossprice * b.quantity, 0) - items.reduce((a, b) => a + b.price * b.quantity, 0) + 40}
            </div>
          </div>
          <div className="border-b pb-4 mb-4"></div>
          <button
            onClick={displayRazorpay}
            className="flex items-center justify-center rounded-md mt-10 border border-transparent px-24 mx-auto max-w-lg bg-gray-800  py-3 text-base font-medium text-white shadow-sm hover:bg-black"
          >
            {" "}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
