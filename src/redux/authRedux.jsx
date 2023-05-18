import { signin } from "../api/apis";
import { loginStart, loginFailure, loginSuccess, logout } from "./authSlice";
import { showToastError, showToastInfo, showToastSuccess } from "../components/Toast";

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await signin(userData);
    if (response.status === 200) {
      const { accessToken,email } = await response.data;
      dispatch(loginSuccess({ accessToken,email }));
    } else {
      const error = await response.data;
      dispatch(loginFailure(error));
      showToastError(error);
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
    if (!error.response) {
      showToastError("Please check your internet connection.");
    } else {
      if (error.response.status === 401) {
        showToastInfo("Bad credentials.");
      } else if (error.response.status === 404) {
        showToastInfo(error.response.data);
      }
      else{
        showToastError("Unknown error.")
      }
    }
  }
};

export const logoutButton = () => async (dispatch) => {
  try {
    dispatch(logout());
    showToastSuccess("Log out successfully.");
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
