import React from "react";
import { CheckBadgeIcon, FingerPrintIcon, MagnifyingGlassIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo-dark.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { findEmail, setPassword, verifyEmail } from "../api/apis";
import { showToastError, showToastInfo, showToastSuccess } from "../components/Toast";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(0);
  const [find, setFind] = useState(true);
  const [verify, setVerify] = useState(false);
  const [passwordBtn, setPasswordBtn] = useState(false);
  const navigate = useNavigate();
  const handleFindEmail = () => {
    setFind(false);
    setLoading(true);
    findEmail(email.toLowerCase())
      .then(() => setVerify(true))
      .then(() => setLoading(false))
      .catch((err) => {
        setFind(true);
        setVerify(false);
        setLoading(false);
        showToastError(err.response.data);
      });
  };

  const verifyOtp = () => {
    setVerify(false);
    setLoading(true);
    verifyEmail(email.toLowerCase(), otp)
      .then((res) => showToastSuccess(res.data))
      .then(() => setPasswordBtn(true))
      .then(() => setLoading(false))
      .catch((err) => {
        setVerify(true);
        setLoading(false);
        setPasswordBtn(false);
        showToastError(err.response.data);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const password =e.target[1].value
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (password !== "") {
      if (regex.test(password)) {
        setPasswordBtn(false);
        setLoading(true);
        setPassword({ email: email.toLowerCase(), password: password })
          .then((res) => {
            showToastSuccess(res.data);
            setLoading(false);
            showToastInfo("Login with new credentials");
            navigate("/auth/login");
          })
          .catch((err) => {
            setPasswordBtn(true);
            setLoading(false);
            showToastError(err.response.data);
          });
      }
      else{
        showToastError("Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number.")
      }
    }
  };
  return (
    <div className="h-full bg-gray-100 w-full py-20 bg-fixed  px-4">
      <div className="flex flex-col items-center  justify-center">
        <img src={logo} alt="" className="h-32 w-32" />
        <div className="bg-white shadow rounded lg:w-1/3 mt-5 md:w-2/3 w-full z-10 p-10 ">
          <form onSubmit={handleSubmit}>
            <label htmlFor="input-group-1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
              Enter Your Email
            </label>
            {/* email input  */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
              </div>
              <input
                disabled={!find}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
              />
            </div>
            {/* otp  */}
            {verify && (
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <ShieldCheckIcon className="h-5 text-gray-600" />
                </div>
                <input
                  type="number"
                  onChange={(e) => setOtp(e.target.value)}
                  pattern="{6}"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Otp"
                />
              </div>
            )}
            {passwordBtn && (
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FingerPrintIcon className="h-5 text-gray-600" />
                </div>
                <input
                  type="password"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                />
              </div>
            )}
            {loading && <span id="loader-small"></span>}
            {/* find button   */}
            {find && (
              <button
                onClick={handleFindEmail}
                type="button"
                disabled={!find}
                data-te-ripple-init
                data-te-ripple-color="light"
                className="flex items-center justify-center bg-black w-full rounded-md bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              >
                <MagnifyingGlassIcon className="h-4 w-4 text-white" /> Find
              </button>
            )}
            {verify && (
              <button
                type="button"
                onClick={verifyOtp}
                data-te-ripple-init
                data-te-ripple-color="light"
                className="flex items-center justify-center bg-black w-full rounded-md bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              >
                <CheckBadgeIcon className="h-4 w-4 text-white" /> Verify Otp
              </button>
            )}

            {passwordBtn && (
              <button
                type="submit"
                disabled={!passwordBtn}
                data-te-ripple-init
                data-te-ripple-color="light"
                className="flex items-center justify-center bg-black w-full rounded-md bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              >
                <FingerPrintIcon className="h-4 w-4 text-white" /> Update password
              </button>
            )}
            {/* cancel button  */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex justify-center items-center w-full rounded-md mt-3 p-1 border border-black"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
