import React, { useState, useEffect, Fragment, useRef } from "react";
import ModifyAddressModal from "../../components/ModifyAddressModal";
import Loading from "../../components/Loading";
import "../../css/addAddress.css";
import { showToastError, showToastSuccess, toastPopup } from "../../components/Toast";
import { addressFetch, saveAddress } from "../../api/apis";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const [savedAddress, setSavedAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);
  const cancelButtonRef = useRef(null);
  const [addaddress, setAddaddress] = useState();
  const [ads, setads] = useState({
    name: "",
    number: "",
    area: "",
    city: "",
    pincode: "",
    landmark: "",
    state: "",
    type: false,
  });
  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      addressFetch(accessToken).then((res) => {
        setSavedAddress(res.data);
        setLoading(false);
      });
    } else {
      navigate("/auth/login");
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    saveAddress(ads, accessToken)
      .then((res) => setSavedAddress(res.data))
      .then(() => setAddaddress(false))
      .catch((error) => showToastError(error.response.data));
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="pt-16 mx-10 lg:mx-20 min-h-screen">
      <h1 className="text-3xl font-semibold my-10">Saved Address</h1>
      {/* {toastPopup} */}
      {!addaddress ? (
        <Fragment>
          <button onClick={() => setAddaddress(true)} className="text-blue-600 underline">
            +Add Address
          </button>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
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
                      onConfirmRemove={(e) => {
                        setSavedAddress(savedAddress.filter((item) => item.id !== e));
                        showToastSuccess("Address removed succesfully");
                      }}
                    />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <dt className="text-xl font-medium text-gray-500">Add Address</dt>
          <dd className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className="space-y-2 lg:w-1/3 mt-5 md:w-2/3 w-full">
              <p className="text-base font-semibold text-gray-600">Name*</p>
              <input
                className="rounded-lg w-full border-gray-200"
                type="text"
                name="name"
                id="input-box"
                required
                onChange={(e) => setads({ ...ads, name: e.target.value })}
                placeholder="Enter name"
              />
              <p className="text-base mt-4 font-semibold text-gray-600">Address*</p>
              <input
                className="rounded-lg w-full border-gray-200"
                type="text"
                name="address"
                id="input-box"
                required
                onChange={(e) => setads({ ...ads, area: e.target.value })}
                placeholder="Enter address"
              />
              <p className="text-base mt-4 font-semibold text-gray-600">City*</p>
              <input
                className="rounded-lg w-full  border-gray-200"
                type="text"
                name="city"
                id="input-box"
                required
                onChange={(e) => setads({ ...ads, city: e.target.value })}
                placeholder="Enter city"
              />

              <p className="text-base mt-4 font-semibold text-gray-600">State*</p>
              <select
                id="input-box"
                onChange={(e) => setads({ ...ads, state: e.target.value })}
                className="p-2 w-full border-gray-200 rounded-lg shadow-sm"
                name="address-select"
                required
              >
                <option value="" hidden disabled selected>
                  -- Select state --
                </option>
                <option value="Andaman & Nicobar Islands">Andaman & Nicobar Islands</option>
                <option value="Andra Pradesh">Andra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra & Nagar Haveli & Daman & Diu">Dadra & Nagar Haveli & Daman & Diu</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Puducherry">Puducherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <p className="text-base mt-4 font-semibold text-gray-600">Landmark</p>
              <input
                className="rounded-lg w-full border-gray-200"
                type="text"
                name="landmark"
                id="input-box"
                onChange={(e) => setads({ ...ads, landmark: e.target.value })}
                placeholder="Enter landmark"
              />
              <p className="text-base mt-4 font-semibold text-gray-600">Pincode*</p>
              <input
                className="rounded-lg w-full border-gray-200"
                id="input-box"
                onChange={(e) => setads({ ...ads, pincode: e.target.value })}
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                name="pincode"
                title="Please enter 6-digit valid pincode"
                placeholder="Enter pincode"
                required
              />
              <p className="text-base mt-4 font-semibold text-gray-600">Phone Number*</p>
              <input
                className="rounded-lg w-full border-gray-200"
                type="text"
                id="input-box"
                onChange={(e) => setads({ ...ads, number: e.target.value })}
                required
                pattern="[6-9]{1}[0-9]{9}"
                name="number"
                title="Please enter 10-digit valid phone number.Remove +91 if already."
                placeholder="+91 Enter number"
              />

              <div className="px-4 py-3 sm:flex-row-reverse sm:px-6 space-y-4">
                <button id="save-btn" type="submit" className="w-full">
                  Save
                </button>
                <hr />
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0  sm:text-sm"
                  onClick={() => {
                    setAddaddress(false);
                    window.scrollTo(0, 0);
                  }}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </form>
          </dd>
        </Fragment>
      )}
    </div>
  );
};

export default AddressPage;
