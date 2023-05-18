import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import "../../css/orderSuccess.css";
function OrderSuccessPage() {
  const { id } = useParams();
  // const location =useLocation();
  // const order= location.state.orderDetails
  // console.log(order);

  return (
    <div className="pt-16 ">
      <div className="min-h-screen bg-gray-100 mx-10 lg:m-20">
        <div class="flex justify-center">
          <div class="my-10 ">
            <span className="text-black text-4xl lg:text-5xl font-mono underline" style={{ fontFamily: "Custom" }}>
              Who Cares
            </span>
            <br />
            <span className="flex justify-center" style={{ fontFamily: "Custom" }}>
              What | We | Wear
            </span>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
