import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { FaceFrownIcon, TruckIcon } from "@heroicons/react/24/outline";
import BasicModal from "../../components/BasicModal";
import Rating from "./Rating";
import ProgressBar from "../../components/ProgressBar";
import { cancelOrder, fetchOrder } from "../../api/apis";
import { showToastError, showToastInfo } from "../../components/Toast";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    items: [],
  });
  const [loading, setLoading] = useState(false);
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const breadcrumbs = [
    { id: 0, name: "Home", to: "/" },
    { id: 1, name: "My Profile", to: "/my-profile" },
    { id: 2, name: "My Orders", to: "/my-orders" },
  ];
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formatter = new Intl.DateTimeFormat("en-IN", options);
    return formatter.format(date);
  };

  const orderParser=(order_id)=>{
    const parsedOrderId=order_id.substring(6);
    return parsedOrderId;
  }
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      fetchOrder(id, accessToken)
        .then((res) => setOrder(res.data))
        .then(() => setLoading(false))
        .catch((err) => {
          showToastError("Something is not right.");
        });
    } else {
      navigate("/auth/login");
    }
  }, []);

  // const order = {
  //   id: "asdad_8787",
  //   isPaid: true,
  //   isDelivered: true,
  //   isCancelled: false,
  //   // tracking: "81090003492",
  //   orderDate: "2023-05-10T17:33:28.986377600",
  //   totalPrice: "490",
  //   address: {
  //     name: "Ankit",
  //     number: "+919560544659",
  //     area: "house no. 12,shivam colony",
  //     city: "Faridabad",
  //     state: "Haryana",
  //     pincode: "121003",
  //     Landmark: "near this and that",
  //   },
  //   items: [
  //     {
  //       item: {
  //         id: 1,
  //         name: "Van Hussan",
  //         discription: "Black t-shirt with printed design",
  //         crossprice: "350",
  //         color: "Black",
  //         price: "250",
  //         images: [{ src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" }],
  //       },
  //       qty: "2",
  //       size: "M",
  //     },
  //     {
  //       item: {
  //         id: 1,
  //         name: "Van Hussan",
  //         discription: "Black t-shirt with printed design",
  //         crossprice: "350",
  //         color: "Black",
  //         price: "250",
  //         images: [{ src: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" }],
  //       },
  //       qty: "3",
  //       size: "L",
  //     },
  //   ],
  // };

  const handleCancel = () => {
    if (!isAuthenticated) {
      showToastError("Please log  in to continue.");
      return;
    }
    cancelOrder(id, accessToken)
      .then((res) => setOrder(res.data))
      .catch((err) => {
        showToastError(err.response.data);
        showToastInfo("Please refresh the page to see details.");
      });
  };
  const handleTracking = () => {
    if (!order.tracking) {
      return false;
    }
    return true;
  };

  if (loading) {
    return <Loading />;
  }
  if (order.items.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center px-4">
      <div className="lg:max-w-screen-lg">
        <Breadcrumbs breadcrumbs={breadcrumbs} currentPage={orderParser(order.id)} />
        <hr />
        <div className="flex justify-start item-start space-y-2 flex-col m-4 ">
          <h1 className="text-2xl lg:text-4xl font-semibold leading-7 lg:leading-9 capitalize text-gray-800">{order.id}</h1>
          <p className="text-base font-medium leading-6 text-gray-600">{formatDate(order.orderDate)}</p>
        </div>
        {order.items.map((item, index) => (
          <div key={index} className=" bg-gray-50 rounded-md shadow-md ">
            <Link to={`/products/${item.item.name}`} className="flex justify-center ">
              <img src={item.item.images[0].src} className="h-1/2 w-1/2 shadow m-2" />
            </Link>
            <div className="p-5 ">
              <div className="flex justify-center">
                <h2 className="text-2xl font-mono">{item.item.name}</h2>
              </div>
              <div className="flex justify-center text-gray-400">
                <h2 className="text-xl font-mono">{item.item.color}</h2>
              </div>
              <div className="flex justify-center text-gray-400">
                <p>Size : {item.size}</p>
              </div>
              <div className="flex justify-center text-gray-400">
                <p>Qty : {item.qty}</p>
              </div>
              <div className="flex justify-center text-gray-400">
                <p>Item price : ₹{item.item.price}</p>
              </div>
            </div>
            <Rating itemID={item.id} />
            {/* <a href="javascript: history.back()"> asdada  </a> */}
            <hr className="" />
          </div>
        ))}
        <div className=" bg-gray-100 rounded-md">
          <div className="m-1">
            <ProgressBar isShipped={handleTracking() && order.tracking} isDelivered={order.isDelivered} isCancelled={order.isCancelled} />
          </div>
        </div>
        {/* price summary  */}
        <div className="bg-gray-100 rounded-md shadow-md mb-5">
          <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Summary</h3>
            <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
              <div className="flex justify-between  w-full">
                <p className="text-base leading-4 text-gray-800">Item price total</p>
                <p className="text-base leading-4 text-gray-600">₹{order.items.reduce((a, b) => a + b.item.crossprice * b.qty, 0)}</p>
              </div>
              <div className="flex justify-between  w-full">
                <p className="text-base leading-4 text-gray-800">Discount</p>
                <p className="text-base leading-4 text-red-600">
                  <s>₹{order.items.reduce((a, b) => a + b.item.crossprice * b.qty, 0) - order.totalPrice}</s>
                </p>
              </div>
              <div className="flex justify-between  w-full">
                <p className="text-base leading-4 text-gray-800">Subtotal</p>
                <p className="text-base leading-4 text-gray-600">₹{order.totalPrice}</p>
              </div>

              <div className="flex justify-between items-center w-full">
                <p className="text-base leading-4 text-gray-800">Shipping</p>
                <p className="text-base leading-4 text-gray-500">₹0.00</p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base font-semibold leading-4 text-gray-800">Total</p>
              <p className="text-base font-semibold leading-4 text-gray-600">₹{order.totalPrice}</p>
            </div>
          </div>
          {/* shipping details  */}
          <div className="flex flex-col justify-center p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Shipping</h3>
            <div className="flex justify-between items-start w-full">
              <div className="flex justify-center items-center space-x-4">
                <div className="w-8 h-8">
                  <TruckIcon className="h-10 text-red-500" />
                </div>
                <div className="flex flex-col justify-start items-center">
                  <p className="text-lg leading-6 font-semibold text-gray-800">
                    Delivery address
                    <br />
                    <span className="font-semibold text-base text-gray-600">{order.address.name} ,</span>
                    <span className="font-normal text-sm">{order.address.area} ,</span>
                    <span className="font-normal text-sm">{order.address.city} ,</span>
                    <span className="font-normal text-sm">{order.address.state} -</span>
                    <span className="font-normal text-sm">{order.address.pincode} </span>
                    <span className="font-normal text-sm">{order.address.number}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center items-center">
              {handleTracking() && (
                <Link to={`https://bluedart.in/?${order.tracking}`} target="_blank" rel="noopener noreferrer" className="w-full">
                  <button className="hover:bg-black focus:outline-none focus:ring-2 rounded-md focus:ring-offset-2 focus:ring-gray-800 py-5 w-full bg-gray-800 text-base font-medium leading-4 text-white">
                    View Tracking Details
                  </button>
                </Link>
              )}
            </div>
            {!order.isCancelled && (
              <BasicModal
                title="Cancel order"
                btnClassName="hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md focus:ring-red-700 py-5 w-full bg-red-600 text-base font-bold leading-4 text-white"
                message="Are you sure you want to canel your order? All of your item will be canelled. This action cannot be undone."
                btnname="Cancel"
                closebtn="Close"
                onConfirm={handleCancel}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
