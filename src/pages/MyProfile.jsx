import {  TagIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import "../css/loader.css";
import Loading from "../components/Loading";
import defaultProfileImg from "../assets/defaultProfileImg.jpg";
import ImageChangeModal from "../components/ImageChangeModal";
import ModifyAddressModal from "../components/ModifyAddressModal";
import Breadcrumbs from "../components/Breadcrumbs";
import { useEffect, useState } from "react";
import { fetchMyProfile } from "../api/apis";
import Error from "../components/Error";
import { useSelector } from "react-redux";

// const savedAddress = [
//   {
//     id: "1",
//     name: "kailash jha",
//     number: "8368088693",
//     address: "c-1/75 roshan nagar ",
//     city: "faridabad",
//     state: "haryana",
//     landmark: "near shiv mandir",
//     pincode: 121013,
//     type: false,
//   },
//   {
//     id: "2",
//     name: "Aman",
//     number: "96151651651",
//     address: "asdfg",
//     city: "new delhi",
//     state: "Delhi",
//     landmark: "near shiv mandir",
//     pincode: 121223,
//     type: false,
//   },
//   {
//     id: "3",
//     name: "Durgesh",
//     number: "96151651651",
//     address: "h.no 440/c g.no 7 surya colony chetan market sehatpur",
//     city: "faridabad",
//     pincode: 121003,
//     state: "haryana",
//     landmark: "near shiv mandir",
//     type: false,
//   },
//   {
//     id: "4",
//     name: "Hemant",
//     number: "96151651651",
//     address: "zxvbnm",
//     city: "new delhi",
//     pincode: 445566,
//     state: "Delhi",
//     landmark: "near shiv mandir",
//     type: false,
//   },

// ];
const ipAddress = window.location.hostname;
export default function MyProfile() {
  const [savedAddress, setSavedAddress] = useState([]);
  const [email, setEmail] = useState("");
  const [activeBalance, setActiveBalance] = useState("");
  const [nonActiveBalance, setNonActiveBalance] = useState("");
  const [username, setUsername] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [profilepic, setProfilepic] = useState("");
  const navigate = useNavigate();
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isAuthenticated) {
      fetchMyProfile(accessToken)
        .then((res) => {
          setSavedAddress(res.data.addresses);
          setUsername(res.data.username);
          setEmail(res.data.email);
          setWishlist(res.data.wishlist);
          // const data = res.data.profilepicURL;
          // setProfilepic(`${data.slice(0, 7)}${ipAddress}${data.slice(16)}`);
          setActiveBalance(0);
          setNonActiveBalance(0);
          setProfilepic(res.data.profilepicURL);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setError(true);
        });
    } else {
      navigate("/auth/login");
    }
  }, []);
  const balance = 500;
  const breadcrumbs = [{ id: 0, name: "Home", to: "/" }];
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <Breadcrumbs breadcrumbs={breadcrumbs} currentPage="My Profile" />
      <div className="lg:mx-16 border border-gray-300">
        <div className="px-4 mb-10 sm:px-6 ">
          <h3 className="text-4xl m-2 mt-9 font-semibold leading-6 text-gray-900">My Profile</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-5 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Profile Pic</dt>
              <dd className="mt-1 text-sm flex justify-between text-gray-900 sm:col-span-2 sm:mt-0">
                <img className="h-24 mt-2 rounded" src={profilepic === "" ? defaultProfileImg : profilepic} />
                <ImageChangeModal
                  name="Edit"
                  onSave={(e) => {
                    setProfilepic(e);
                  }}
                />
                {/* <button  >Edit</button> */}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{email}</dd>
            </div>

            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{username}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {savedAddress.length === 0 ? (
                  <div>You haven't saved any address yet.</div>
                ) : (
                  <ul>
                    {savedAddress.map((item) => (
                      <li key={item.id} className="border border-gray-200 rounded flex justify-between">
                        <div className="grid m-1">
                          <p className="mx-2 font-semibold my-1">{item.name}</p>
                          <span className=" mx-3">
                            {item.area} {", "} {item.city} {", "}
                            {item.state}
                            <p className="text-gray-600 font-base">Landmark : {item.landmark}</p>
                          </span>

                          <p className="m-2 mx-3">Pincode : {item.pincode}</p>
                          <p className="mx-3">{item.number}</p>
                        </div>
                        <ModifyAddressModal
                          buttonName="Edit"
                          value={item}
                          id={item.id}
                          onConfirmEdit={(e) => setSavedAddress(e)}
                          onConfirmRemove={(e) => setSavedAddress(savedAddress.filter((item) => item.id !== e))}
                        />
                      </li>
                    ))}
                  </ul>
                )}
                {/* <AddressAccordion address={savedAddress}/> */}
              </dd>
            </div>

            {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Wallet balance</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                <div className="flex justify-between">
                  <p>Active balance : ₹{activeBalance}</p>
                  <p>Unuseable balance : ₹{nonActiveBalance}</p>
                </div>
              </dd>
            </div> */}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                <Link to="/wishlist">Wishlist</Link>
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {wishlist.length === 0
                  ? "Your Wishlist is empty!!!"
                  : wishlist.map((item) => (
                      <ul key={item.name} role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <TagIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                            <span className="ml-2 w-0 flex-1 truncate">{item.name}</span>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <Link to={"/products/" + item.name} className="font-bold text-indigo-600 hover:text-indigo-500">
                              View
                            </Link>
                          </div>
                        </li>
                      </ul>
                    ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
