import React, { Fragment, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";

import { ShoppingBagIcon } from "@heroicons/react/20/solid";

import { FaceFrownIcon, TruckIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
const ProgressBar = ({ isShipped, isDelivered, isCancelled }) => {
  const [status, setStatus] = useState([
    {
      icon: "",
      label: "",
      color: "",
      active: false,
    },
    {
      icon: "",
      label: "",
      color: "",
      active: false,
    },
    {
      icon: "",
      label: "",
      color: "",
      active: false,
    },
  ]);
  useEffect(() => {
    if (isCancelled) {
      setStatus([
        {
          icon: <TruckIcon className="h-4" />,
          label: "Shipped",
          color: "blue-500",
          active: true,
        },
        {
          icon: <HeartIcon className="h-4" />,
          label: "Delivered",
          color: "green-600",
          active: true,
        },
        {
          icon: <FaceFrownIcon className="h-4" />,
          label: "Cancelled",
          color: "red-600",
          active: true,
        },
      ]);
      return;
    }
    setStatus([
      {
        icon: <TruckIcon className="h-4" />,
        label: "Shipped",
        color: "blue-500",
        active: isShipped,
      },
      {
        icon: <HeartIcon className="h-4" />,
        label: "Delivered",
        color: "green-600",
        active: isDelivered,
      },
      {
        icon: <FaceFrownIcon className="h-4" />,
        label: "Cancelled",
        color: "red-600",
        active: isCancelled,
      },
    ]);
    return;
  }, []);

  return (
    <Fragment>
      <div className="flex justify-between m-1">
        <Fragment>
          <p className="flex items-center text-cyan-600 font-semibold opacity-100">
            <ShoppingBagIcon className="h-4" />
            Order Placed
          </p>
          {status.map((item, index) => (
            <p key={index} className={`flex items-center text-${item.color} font-semibold ${item.active ? "opacity-100" : "opacity-50"}`}>
              {item.icon}
              {item.label}
            </p>
          ))}
        </Fragment>
      </div>
      <hr />
      <div className="flex items-center w-full justify-between">
        <span className="rounded-full w-3 h-3 p-2 bg-cyan-500 opacity-100" />
        {status[0].active && <span className="w-full bg-gradient-to-r h-1 from-cyan-500  to-blue-500" />}
        <span className={`rounded-full w-3 h-3 p-2 bg-blue-500 ${status[0].active ? "opacity-100" : "opacity-50"}`} />
        {status[1].active && <span className="w-full bg-gradient-to-r h-1 from-blue-500  to-green-600" />}
        <span className={`rounded-full w-3 h-3 p-2 bg-green-500 ${status[1].active ? "opacity-100" : "opacity-50"}`} />
        {status[2].active && <span className="w-full bg-gradient-to-r h-1 from-green-600  to-red-500" />}
        <span className={`rounded-full w-3 h-3 p-2 bg-red-500 ${status[2].active ? "opacity-100" : "opacity-50"}`} />
      </div>
    </Fragment>
  );
};

export default ProgressBar;
