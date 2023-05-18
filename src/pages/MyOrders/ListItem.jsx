import { Link } from "react-router-dom";
import Track from "../../assets/track.svg";
import { Fragment } from "react";
export default function ListItem({ order }) {
  const orderParser = (order_id) => {
    const parsedOrderId = order_id.substring(6);
    return parsedOrderId;
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const orderStatus = () => {
    if (order.status === "Placed") {
      return <dd className="px-1.5 ring-1 text-cyan-500 ring-cyan-500 rounded">{order.status}</dd>;
    } else if (order.status === "Shipped") {
      return <dd className="px-1.5 ring-1 text-blue-500 ring-blue-500 rounded">{order.status}</dd>;
    } else if (order.status === "Delivered") {
      return <dd className="px-1.5 ring-1 text-green-500 ring-green-400 rounded">{order.status}</dd>;
    } else if (order.status === "Cancelled") {
      return <dd className="px-1.5 ring-1 text-red-500 ring-red-500 rounded">{order.status}</dd>;
    } else return;
  };
  console.log(order);
  return (
    <article className="flex items-start space-x-6 p-6">
      <img src={order.firstItemImage} alt="" width="60" height="88" className="flex-none rounded-md bg-slate-100" />
      <div className="min-w-0  relative flex-auto">
        <h2 className="font-semibold text-slate-900 truncate pr-20">{order.firstItemName}</h2>
        <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
          {order.tracking && (
            <Link to={`https://bluedart.in/?${order.tracking}`} target="_blank" rel="noopener noreferrer">
              <div className="absolute top-0 right-0 flex items-center space-x-1">
                <dt>
                  <img src={Track} alt="Track Icon" />
                </dt>
                <dd className="text-sky-500">Track Status</dd>
              </div>
            </Link>
          )}

          <div>
            <dt className="sr-only">Status</dt>
            {orderStatus()}
          </div>
          <div className="w-full flex justify-between">
            <dt className="sr-only">Price</dt>
            <dd className="flex items-center">
              <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                <circle cx="1" cy="1" r="1" />
              </svg>
              Total: ₹{order.totalPrice}
            </dd>
            <dt className="sr-only">Order</dt>
            <dd className="flex items-center  text-sky-600 underline">
              <Link to={order.orderId}>View details</Link>
            </dd>
          </div>
          <div className=""></div>
          <div className="w-1/2">
            <dt className="sr-only">Order Id</dt>
            <dd className="flex text-slate-400 overflow-auto items-center">
              <svg width="2" height="2" fill="currentColor" className="mx-2 text-slate-300" aria-hidden="true">
                <circle cx="1" cy="1" r="1" />
              </svg>
              Order Id: {orderParser(order.orderId)}
            </dd>
          </div>
          <div className="flex-none w-full mt-2 font-normal">
            <dt className="sr-only">Total Items</dt>
            <dd className="text-slate-400">{order.totalItems === 1 ? "No more items" : order.totalItems - 1 + " More Items"}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
