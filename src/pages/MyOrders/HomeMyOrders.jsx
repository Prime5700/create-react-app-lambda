import { Link, useNavigate } from "react-router-dom";
import List from "./List.jsx";
import ListItem from "./ListItem.jsx";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "../../components/Breadcrumbs.jsx";
import Loading from "../../components/Loading.jsx";
import { Fragment, useEffect, useState } from "react";
import Error from "../../components/Error.jsx";
import { fetchOrders } from "../../api/apis.jsx";
import { useSelector } from "react-redux";

export default function HomeMyOrders() {
  const order = [
    {
      id: 1,
      firstName: "Van Hussan",
      totalPrice: "490",
      orderId: "order_54654",
      tracking: "81090003492",
      paid: false,
      status: "Payment Failed",
      totalItems: "2",
      firstItemImage: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    },
    {
      id: 2,
      firstName: "Van Hussan",
      totalPrice: "490",
      orderId: "order_98798",
      tracking: "81090003492",
      paid: true,
      status: "Delivered",
      totalItems: "5",
      firstItemImage: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    },
  ];
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders(accessToken)
        .then((res) => {
          setOrderList(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          setLoading(false);
        });
    }
    else{
      navigate("/auth/login");
    }
  }, []);
  const orderParser=(order_id)=>{
    const parsedOrderId=order_id.substring(6);
    return parsedOrderId;
  }
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const breadcrumbs = [
    { id: 0, name: "Home", to: "/" },
    { id: 1, name: "My Profile", to: "/my-profile" },
  ];
  if (orderList.length === 0) {
    return (
      <Fragment>
        <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="My Orders" />
        <div className="flex justify-center items-center h-[80vh]">
          <div className="grid">
            <span className="flex justify-center items-center">
              <FaceFrownIcon className="h-20 text-gray-400 w-20 " />
            </span>
            <div className="grid text-cyan-700 text-2xl ">Oops!!. You haven't placed any order.</div>
            <div className="text-blue-600 flex items-center text-2xl justify-center">
              <Link to="/">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
  return (
    <div className="divide-y lg:px-32 min-h-screen divide-slate-100">
      <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="My Orders" />
      <List>
        {orderList.reverse().map((orders) => (
          <ListItem key={orders.orderId} order={orders} />
        ))}
      </List>
      <div className="flex justify-center items-center py-9">
        <p className="px-1.5 ring-1 ring-slate-300 lg:text-xl rounded font-light">No more Orders</p>
      </div>
    </div>
  );
}
