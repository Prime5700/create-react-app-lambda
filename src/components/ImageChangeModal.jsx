import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {  UserPlusIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { profileImageChange } from "../api/apis";
import { useSelector } from "react-redux";
import { showToastError, showToastInfo } from "./Toast";

export default function ImageChangeModal({ name, onSave }) {
  const [open, setOpen] = useState(false);
  const [loadinBtn, setLoadinBtn] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);

  const cancelButtonRef = useRef(null);
  const handleSave = async (e) => {
    e.preventDefault();
    setLoadinBtn(true);
    // console.log(e.target[0].files[0]);
    // axios
    //   .delete(`http://${window.location.hostname}:8080/api/file/delete/`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //     },
    //   })
    const formData = new FormData();
    formData.append("file", e.target[0].files[0]);
    profileImageChange(formData, accessToken)
      .then(async (res) => {
        onSave(res.data);
        setLoadinBtn(false);
        const profilepicURLform = { url: res.data };
        await axios.post(`http://${window.location.hostname}:8080/api/user/profilepic`, profilepicURLform, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setOpen(false);
      })
      .catch((error) => {
        if (error.response.status === 431) {
          showToastError(error.response.data);
          setLoadinBtn(false);
        } else {
          showToastError("File uploading error.");
          showToastInfo("Please select file only JPEG or JPG");
          setLoadinBtn(false);
        }
      });
  };
  return (
    <Fragment>
      <button className="text-blue-700 mx-3 underline font-bold" onClick={() => setOpen(true)}>
        {name}
      </button>
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
            <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
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
                  <form onSubmit={handleSave}>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                          <UserPlusIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            Upload Profile Image
                          </Dialog.Title>

                          <div className="mt-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">
                              Upload file
                            </label>
                            <input
                              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                              aria-describedby="file_input_help"
                              id="file_input"
                              type="file"
                              accept="image/jpeg , image/jpg"
                            />
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">
                              JPEG or JPG
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        disabled={loadinBtn}
                        className={`inline-flex w-full justify-center rounded-md border border-transparent ${
                          loadinBtn ? "bg-blue-300 hover:bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                        } px-4 py-2 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
                      >
                        {loadinBtn ? "Uploading..." : "Upload"}
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
