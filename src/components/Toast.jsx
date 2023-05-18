import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/toast.css";

export const showToastSuccess = (toastmessage) => {
  toast.success(toastmessage, {
    position: "top-left",
    autoClose: 2000,
  });
};

export const showToastError = (toastmessage) => {
  toast.error(toastmessage, {
    position: "top-left",
    autoClose: 2000,
  });
};

export const showToastInfo = (toastmessage) => {
  toast.info(toastmessage, {
    position: "top-left",
    autoClose: 2000,
  });
};
export const showToastLoading = (toastmessage) => {
  toast.loading(toastmessage, {
    position: "top-left",
    autoClose: 2000,
  });
};
export const showToastWarning = (toastmessage) => {
  toast.warning(toastmessage, {
    position: "top-left",
    autoClose: 2000,
  });
};

export const showToastSuccessAutoCloseOff = (toastmessage) => {
  toast.success(toastmessage, {
    position: "top-left",
    autoClose:false,
  });
};

export const showToastErrorAutoCloseOff = (toastmessage) => {
  toast.error(toastmessage, {
    position: "top-left",
    autoClose:false,
  });
};

export const showToastInfoAutoCloseOff = (toastmessage) => {
  toast.info(toastmessage, {
    position: "top-left",
    autoClose:false,
  });
};
export const showToastLoadingAutoCloseOff = (toastmessage) => {
  toast.loading(toastmessage, {
    position: "top-left",
    autoClose:false,
  });
};
export const showToastWarningAutoCloseOff = (toastmessage) => {
  toast.warning(toastmessage, {
    position: "top-left",
    autoClose:false,
  });
};

