import React, { useEffect, Fragment, useState, useRef } from "react";
import { showToastError, showToastInfo, showToastSuccess } from "../components/Toast";
import logo from "../assets/logo-dark.svg";
import glogo from "../assets/G-logo.svg";
import flogo from "../assets/f-logo.svg";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { refercodeCheck, signup } from "../api/apis";
export default function SignupPage() {
  const [eye, seteye] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [applybtndisabled, setapplyBtndisabled] = useState(false);
  const [applied, setApplied] = useState("");
  const inputRef = useRef(null);
  const [userData, setuserData] = useState({
    email: "",
    username: "",
    password: "",
    refercode: "",
  });
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handlePasswordBlur = () => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (userData.password !== "") {
      if (regex.test(userData.password)) {
        setPasswordError("");
      } else {
        setPasswordError(
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number."
        );
      }
    } else {
      setPasswordError("");
    }
  };

  const handleApply = () => {
    refercodeCheck(userData.refercode)
      .then((res) => {
        if (res.data) {
          setApplied("Refercode applied succesfully.");
          setapplyBtndisabled(true);
        } else {
          setapplyBtndisabled(false);
          setApplied("Sorry refercode is not valid.");
        }
      })
      .catch((err) => {
        setApplied(err.response.data);
      });
  };
  async function HandeSubmit(event) {
    event.preventDefault();
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (userData.password !== "") {
      if (regex.test(userData.password)) {
        signup(userData)
          .then((res) => {
            showToastSuccess(res.data.message);
            showToastInfo("Please log in to continue.");
            navigate("/auth/login");
          })
          .catch((err) => showToastError(err.response.data.message));
      } else {
        showToastError(
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one number. "
        );
      }
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      className="h-full bg-gray-100 w-full py-20 bg-fixed  px-4"
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex flex-col items-center  justify-center">
        <img src={logo} alt="" className="h-32 w-32" />
        <div className="bg-white shadow rounded lg:w-1/3 mt-5 md:w-2/3 w-full z-10 p-10 ">
          {/* heading */}
          <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800">
            Login to your account
          </p>
          {/* Login */}
          <p className="text-sm mt-4 font-medium leading-none text-gray-500">
            Already have account?{" "}
            <button
              onClick={() => navigate("/auth/login")}
              tabIndex={0}
              aria-label="Sign up here"
              className="text-sm font-medium leading-none underline text-cyan-600 cursor-pointer"
            >
              {" "}
              Login here
            </button>
          </p>
          {/* google button  */}
          <button
            aria-label="Continue with google"
            role="button"
            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10"
          >
            <img src={glogo} alt="Google icon" />
            <p className="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
          </button>
          {/*Facebook button */}
          <button
            aria-label="Continue with facebook"
            role="button"
            className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4"
          >
            <img src={flogo} alt="Facebook logo" />
            <p className="text-base font-medium ml-4 text-gray-700">Continue with Facebook</p>
          </button>
          {/* divider */}
          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
            <hr className="w-full bg-gray-400  " />
          </div>
          <form onSubmit={HandeSubmit}>
            {/* email  */}
            <Fragment>
              <label className="text-sm font-medium leading-none text-gray-800">Email</label>
              <input
                onChange={(e) => setuserData({ ...userData, email: e.target.value.toLowerCase() })}
                aria-label="enter email address"
                placeholder="Email"
                role="input"
                type="email"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                required
              />
            </Fragment>
            {/* username  */}
            <Fragment>
              <label className="text-sm font-medium leading-none text-gray-800">Username</label>
              <input
                onChange={(e) => setuserData({ ...userData, username: e.target.value.toLowerCase() })}
                aria-label="enter username"
                placeholder="Username"
                role="input"
                type="text"
                className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                required
              />
            </Fragment>
            <hr className="mt-3" />
            {/* password  */}
            <Fragment>
              <label className="text-sm font-medium leading-none text-gray-800">Password</label>
              <div className="relative flex items-center justify-center">
                <input
                  onChange={(e) => setuserData({ ...userData, password: e.target.value })}
                  aria-autocomplete="off"
                  autoComplete="off"
                  onBlur={handlePasswordBlur}
                  aria-label="enter Password"
                  id="password"
                  role="input"
                  type={eye ? "text" : "password"}
                  placeholder="Password"
                  className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                  required
                />
                <div onClick={() => seteye(!eye)} className="absolute right-0 mt-2 mr-3 cursor-pointer">
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                      fill="#71717A"
                    />
                  </svg>
                </div>
              </div>
              <p className="tracking-tighter mb-2 text-xs text-red-400 ">{passwordError}</p>
            </Fragment>
            <hr className="my-5 " />
            {/* refer input  */}
            <Fragment>
              <div className="">
                <label className="text-sm font-medium leading-none text-gray-800">Refferal</label>
                <input
                  onChange={(e) => setuserData({ ...userData, refercode: e.target.value })}
                  aria-label="refer"
                  ref={inputRef}
                  disabled={applybtndisabled}
                  placeholder="Refer code (Optional)"
                  role="input"
                  type="text"
                  className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                />
                <p className="tracking-tighter mb-2 text-xs text-blue-400 ">{applied}</p>
                {applybtndisabled ? (
                  <button
                    type="button"
                    className="w-full border border-black my-3 py-2 rounded font-semibold"
                    onClick={() => {
                      setuserData({ ...userData, refercode: "" });
                      inputRef.current.value = "";
                      setapplyBtndisabled(false);
                    }}
                  >
                    Clear
                  </button>
                ) : (
                  <button type="button" className="w-full my-3 py-2 rounded font-semibold text-white bg-green-500" onClick={handleApply}>
                    Apply
                  </button>
                )}
              </div>
            </Fragment>
            {/* continue button  */}
            <div className="mt-8">
              <button
                role="button"
                type="submit"
                aria-label="create my account"
                className={`focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 text-sm font-semibold leading-none text-white focus:outline-none ${
                  passwordError !== "" ? "bg-gray-400 hover:bg-gray-500" : "bg-gray-900 hover:bg-black"
                } border rounded  py-4 w-full`}
              >
                Continue
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
