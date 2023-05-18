import { add, remove, incQty, decQty, removeAll, addAll } from "./cartSlice";

export const addAllItems=(items)=> async (dispatch) =>{
  try {
    dispatch(addAll(items))
  } catch (error) {
    console.log(error);
  }
}

export const addToCart = (item) => async (dispatch) => {
  try {
    dispatch(add(item));
  } catch (error) {
    console.log(error);
  }
};

export const removeItem= (itemId) => async (dispatch) => {
    try {
      dispatch(remove(itemId));
    } catch (error) {
      console.log(error);
    }
  };
  export const incrementQty = (item) => async (dispatch) => {
    try {
      dispatch(incQty(item));
    } catch (error) {
      console.log(error);
    }
  };
  export const decrementQty = (item) => async (dispatch) => {
    try {
      dispatch(decQty(item));
    } catch (error) {
      console.log(error);
    }
  };
  export const removeAllItems=()=> async (dispatch) =>{
    try {
      dispatch(removeAll())
    } catch (error) {
      console.log(error);
    }
  }