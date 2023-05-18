import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decrementQty, incrementQty} from "../redux/cartRedux";
import { login } from "../redux/authRedux";
import { add, removeItem } from "../redux/cartRedux";

function Temp() {
  const {cart} = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(isAuthenticated);
    console.log(cart);
  }, [isAuthenticated,cart]);

  return (
    <div className="pt-16">
      <div className="h-screen w-screen flex space-x-4 justify-center items-center">
        <div></div>

        <button onClick={() => addToCart({ id: 1, name: "hello", price: 50, quantity: 2 })(dispatch)}>add item</button>
        <button onClick={() => incrementQty(1)(dispatch)}>increment item</button>
        <button onClick={() => decrementQty(1)(dispatch)}>decrement item</button>
        <button onClick={() => removeItem(1)(dispatch)}>remove item</button>
        <button onClick={() => login({ email: "asdfgh@gmail.com", password: "asdfghjklm" })(dispatch)}>login </button>
      </div>
    </div>
  );
}

export default Temp;
