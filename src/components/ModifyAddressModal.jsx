import { Fragment, useRef, useState } from "react";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import {  AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { showToastError } from "./Toast";
import { deleteAddress } from "../api/apis";

export default function ModifyAddressModal({ buttonName, id, value, onConfirmEdit, onConfirmRemove }) {
  const [open, setOpen] = useState(false);
  const name = value.name;
  const cancelButtonRef = useRef(null);
  const { accessToken } = useSelector((state) => state.auth);
  const [ads, setads] = useState(value);
  const handleRemove = () => {
    deleteAddress(id, accessToken)
      .then(() => {
        onConfirmRemove(id);
      })
      .catch((err) => showToastError(err.response.data));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(ads);
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    };
    const data = ads;
    axios.put(`http://${window.location.hostname}:8080/api/address/edit/${id}`, data, config).then((res) => {
      onConfirmEdit(res.data);
      setOpen(false);
    });
  };

  return (
    <Fragment>
      <div className="flex">
        <button className="text-blue-700 mx-3 underline font-bold" onClick={() => setOpen(true)}>
          {buttonName}
        </button>
        <button className="text-red-700 mx-3  underline font-bold" onClick={handleRemove}>
          Remove
        </button>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full  justify-center p-4 text-center items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={handleEdit}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div
                          className="mx-auto flex h-12 w-12 flex-shrink-0 
                        items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                        >
                          {/* <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> */}
                          <AdjustmentsHorizontalIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Edit Address
                          </Dialog.Title>

                          <div className="mt-2 w-full">
                            <p className="text-base font-semibold text-gray-600">Name</p>
                            <input
                              className="rounded-lg w-full border-gray-200"
                              type="text"
                              name="name"
                              onChange={(e) => setads({ ...ads, name: e.target.value })}
                              placeholder={value.name}
                            />
                            <p className="text-base mt-4 font-semibold text-gray-600">Address</p>
                            <input
                              className="rounded-lg w-full border-gray-200"
                              type="text"
                              name="address"
                              onChange={(e) => setads({ ...ads, area: e.target.value })}
                              placeholder={value.area}
                            />
                            <p className="text-base mt-4 font-semibold text-gray-600">City</p>
                            <input
                              className="rounded-lg w-full border-gray-200"
                              type="text"
                              name="city"
                              onChange={(e) => setads({ ...ads, city: e.target.value })}
                              placeholder={value.city}
                            />

                            <p className="text-base mt-4 font-semibold text-gray-600">State</p>
                            <select
                              onChange={(e) => setads({ ...ads, state: e.target.value })}
                              className="p-2 w-full border-gray-200 rounded-lg shadow-sm"
                              id="address-select"
                              name="address-select"
                            >
                              <option
                                // selected={true} disabled="disabled"
                                hidden
                              >
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
                              onChange={(e) => setads({ ...ads, landmark: e.target.value })}
                              placeholder={value.landmark}
                            />
                            <p className="text-base mt-4 font-semibold text-gray-600">Pincode</p>
                            <input
                              className="rounded-lg w-full border-gray-200"
                              type="number"
                              inputMode="numeric"
                              onChange={(e) => setads({ ...ads, pincode: e.target.value })}
                              pattern="{6}"
                              name="pincode"
                              placeholder={value.pincode}
                            />
                            <p className="text-base mt-4 font-semibold text-gray-600">Phone Number</p>
                            <div className="flex items-center justify-center lg:justify-start">
                              <p className="lg:block hidden -mx-10  mr-2 text-gray-500">+91</p>
                              <p className="lg:hidden block  mr-2 text-gray-500">+91</p>
                              <input
                                className="rounded-lg w-full border-gray-200"
                                type="text"
                                onChange={(e) => setads({ ...ads, number: e.target.value })}
                                pattern="[6-9]{1}[0-9]{9}"
                                name="number"
                                title="Please enter 10-digit valid phone number"
                                placeholder={value.number}
                              />
                            </div>
                            {/* <p className="text-sm text-gray-700">
                            Choose a image to upload
                          </p>
                          <p className="text-xs text-gray-400">
                            Allowed file extentions : jpeg jpg png
                          </p> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
}
