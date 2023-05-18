import axios from "axios";
const ipAddress = window.location.hostname;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getWishlist = (token) => {
  return axios.get(`${BASE_URL}/wishlist/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteWishlistItem = (itemId, token) => {
  const param = { itemId: itemId };
  return axios.delete(`${BASE_URL}/wishlist/remove`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: param,
  });
};

export const fetchItem = async (itemName) => {
  return await axios.get(`${BASE_URL}/view/item/${itemName}`);
};

export const checkIfItemInWishlist = async (itemName, token) => {
  const param = { itemName: itemName };
  return await axios.get(`${BASE_URL}/wishlist/item`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: param,
  });
};

export const removeWishlistItem = async (itemId, token) => {
  const param = { itemId: itemId };
  return await axios.delete(`${BASE_URL}/wishlist/remove`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: param,
  });
};

export const addWishlistItem = async (itemId, token) => {
  const param = { itemId: itemId };
  return await axios.post(
    `${BASE_URL}/wishlist/add`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: param,
    }
  );
};

export const signin = async (userData) => {
  return axios.post(`${BASE_URL}/auth/signin`, userData);
};

export const signup = async (userData) => {
  return axios.post(`${BASE_URL}/auth/signup`, userData);
};

export const updateCart = (cart, token) => {
  return axios.post(`${BASE_URL}/cart/update`, cart, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchMyProfile = async (token) => {
  return axios.get(`${BASE_URL}/user/details`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchOrders = async (token) => {
  return axios.get(`${BASE_URL}/orders/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchOrder = async (orderId, token) => {
  return await axios.get(`${BASE_URL}/orders/get/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelOrder = async (orderId, token) => {
  return await axios.put(
    `${BASE_URL}/orders/cancel/${orderId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const profileImageChange = async (formData, token) => {
  return await axios.post(`http://${ipAddress}:8081/api/file/upload/image`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      quality: "0.2f",
      rand: true,
    },
  });
};
export const addressFetch = (token) => {
  return axios.get(`${BASE_URL}/user/details/address`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const saveAddress = (addressPayload, token) => {
  return axios.post(`${BASE_URL}/address/add`, addressPayload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteAddress = (id, token) => {
  return axios.delete(`${BASE_URL}/address/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findEmail = (email) => {
  const mail = { email: email };
  return axios.get(`${BASE_URL}/auth/sendotp`, {
    params: mail,
  });
};

export const verifyEmail = (email, otp) => {
  const param = { email: email, otp: otp };
  return axios.post(
    `${BASE_URL}/auth/verify`,
    {},
    {
      params: param,
    }
  );
};

export const setPassword = (userData) => {
  return axios.post(`${BASE_URL}/auth/setpassword`, userData);
};

export const test = (token) => {
  return axios.get(`${BASE_URL}/cart/test`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCart = async (token) => {
  return await axios.get(`${BASE_URL}/cart/getcart`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const refercodeCheck = (refercode) => {
  const code = { refercode: refercode };
  return axios.get(`${BASE_URL}/auth/refercheck`, {
    params: code,
  });
};

export const paymentApi = (items, token) => {
  return axios.post(`${BASE_URL}/orders/create`, items, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const paymentSuccess = (data, token) => {
  return axios.post(`${BASE_URL}/orders/success`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export const getHomeImage = () => {
  return axios.get(`${BASE_URL}/view/home/images`);
};
export const getFeaturedProducts = () => {
  return axios.get(`${BASE_URL}/view/featured/all`);
};
export const getCatagory = () => {
  return axios.get(`${BASE_URL}/view/catagory/all`);
};
