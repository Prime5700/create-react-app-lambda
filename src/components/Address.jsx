import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
// import "../css/btn.css";
// const savedAddress = [
//   {
//     id: "1",
//     name: "kailash jha",
//     number: "8368088693",
//     address: "c-1/75 roshan nagar ",
//     city: "faridabad",
//     state: "haryana",
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
//     pincode: 121223,
//     type: false,
//   },
//   {
//     id: "3",
//     name: "Hemant",
//     number: "96151651651",
//     address: "zxvbnm",
//     city: "new delhi",
//     pincode: 445566,
//     state: "Delhi",
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
//     type: false,
//   },
//   // {
//   //   id: "5",
//   //   name: "Hemant",
//   //   number: "96151651651",
//   //   address: "zxvbnm",
//   //   city: "new delhi",
//   //   pincode: 445566,
//   //   state: "Delhi",
//   //   type: false,
//   // },
//   // {
//   //   id: "6",
//   //   name: "Hemant",
//   //   number: "96151651651",
//   //   address: "zxvbnm",
//   //   city: "new delhi",
//   //   pincode: 445566,
//   //   state: "Delhi",
//   //   type: false,
//   // },
// ];

function Address() {
  const [savedAddress, setSavedAddress] = useState([]);
  const [ads, setads] = useState({
    name: "",
    number: "",
    address: "",
    city: "",
    pincode: null,
    landmark: "",
    state: "",
    type: null,
  });
  useEffect(() => {
    axios
      .get(`http://${window.location.hostname}:8080/api/address/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => setSavedAddress(res.data));
  }, []);

  const [selected, setSelected] = useState("");
  const [addAddress, setaddAddress] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="p-4 flex justify-center max-h items-center pt-16 py-10">
      {!addAddress && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log(selectedOption === null ? "Please Select address" : "Good boi");
          }}
          className="flex-col"
        >
          <h2 className="text-2xl  font-semibold mb-4">Address</h2>
          <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Select or add address</h3>

          <ul className="grid overflow-y-auto lg:h-56 w-full gap-6">
            {savedAddress.map((item) => (
              <li key={item.id}>
                <input
                  type="radio"
                  name={item.name}
                  value={item.id}
                  checked={selectedOption === item.id}
                  onChange={(e) => {
                    setSelectedOption(e.target.value);
                  }}
                  className="hidden"
                />
                <label
                  onClick={() => {
                    setSelectedOption(item.id);
                  }}
                  htmlFor={item.id}
                  className={`inline-flex items-center justify-between w-full p-5 ${
                    selectedOption === item.id ? "border-blue-600 text-blue-600" : "border-gray-200"
                  } text-gray-500 bg-white border rounded-lg cursor-pointer    hover:text-gray-600 hover:bg-gray-100`}
                >
                  <div className="block">
                    <div className="w-full text-lg font-bold">{item.name}</div>
                    <div className="w-full">{`${item.address},${item.city},${item.state}-${item.pincode}`}</div>
                  </div>
                  <svg aria-hidden="true" className="w-6 h-6 ml-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </label>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-5 items-center"></div>
          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
            <hr className="w-full bg-gray-400  " />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="button"
              className="bg-blue-700 text-white hover:bg-blue-900 px-3 py-2 font-bold lg:max-w-sm rounded-lg mb-2"
              onClick={() => setaddAddress(true)}
            >
              Add Address
            </button>
          </div>
        </form>
      )}

      {addAddress && (
        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(ads);
            }}
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Add a new address</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    onChange={(e) => setads({ ...ads, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded shadow-sm"
                    required
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2" htmlFor="phone">
                    Phone No.
                  </label>
                  <input
                    onChange={(e) => setads({ ...ads, number: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded shadow-sm"
                    required
                    type="text"
                    inputMode="Numeric"
                    id="phone"
                    name="phone"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-semibold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  onChange={(e) => setads({ ...ads, address: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded shadow-sm"
                  type="text"
                  id="address"
                  name="address"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block font-semibold mb-2" htmlFor="city">
                    City
                  </label>
                  <input
                    onChange={(e) => setads({ ...ads, city: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded shadow-sm"
                    type="text"
                    id="city"
                    name="city"
                    required
                  />
                </div>
                <div>
                  {/* <label className="block font-semibold mb-2" htmlFor="state">State</label> */}
                  <label className="block font-semibold mb-2" htmlFor="address-select">
                    State
                  </label>
                  <select
                    onChange={(e) => setads({ ...ads, state: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded shadow-sm"
                    id="address-select"
                    name="address-select"
                    required
                  >
                    <option value="">-- Select state --</option>
                    <option value="Andaman & Nicobar Islands" onClick={() => setSelected("Andaman & Nicobar Islands")}>
                      Andaman & Nicobar Islands
                    </option>
                    <option value="Andra Pradesh" onClick={() => setSelected("Andra Pradesh")}>
                      Andra Pradesh
                    </option>
                    <option value="Arunachal Pradesh" onClick={() => setSelected("Arunachal Pradesh")}>
                      Arunachal Pradesh
                    </option>
                    <option value="Assam" onClick={() => setSelected("Assam")}>
                      Assam
                    </option>
                    <option value="Bihar" onClick={() => setSelected("Bihar")}>
                      Bihar
                    </option>
                    <option value="Chandigarh" onClick={() => setSelected("Chandigarh")}>
                      Chandigarh
                    </option>
                    <option value="Chhattisgarh" onClick={() => setSelected("Chhattisgarh")}>
                      Chhattisgarh
                    </option>
                    <option value="Dadra & Nagar Haveli & Daman & Diu" onClick={() => setSelected("Dadra & Nagar Haveli & Daman & Diu")}>
                      Dadra & Nagar Haveli & Daman & Diu
                    </option>
                    <option value="Delhi" onClick={() => setSelected("Delhi")}>
                      Delhi
                    </option>
                    <option value="Goa" onClick={() => setSelected("Goa")}>
                      Goa
                    </option>
                    <option value="Gujarat" onClick={() => setSelected("Gujarat")}>
                      Gujarat
                    </option>
                    <option value="Haryana" onClick={() => setSelected("Haryana")}>
                      Haryana
                    </option>
                    <option value="Himachal Pradesh" onClick={() => setSelected("Himachal Pradesh")}>
                      Himachal Pradesh
                    </option>
                    <option value="Jammu & Kashmir" onClick={() => setSelected("Jammu & Kashmir")}>
                      Jammu & Kashmir
                    </option>
                    <option value="Jharkhand" onClick={() => setSelected("Jharkhand")}>
                      Jharkhand
                    </option>
                    <option value="Karnataka" onClick={() => setSelected("Karnataka")}>
                      Karnataka
                    </option>
                    <option value="Kerala" onClick={() => setSelected("Kerala")}>
                      Kerala
                    </option>
                    <option value="Ladakh" onClick={() => setSelected("Ladakh")}>
                      Ladakh
                    </option>
                    <option value="Lakshadweep" onClick={() => setSelected("Lakshadweep")}>
                      Lakshadweep
                    </option>
                    <option value="Madhya Pradesh" onClick={() => setSelected("Madhya Pradesh")}>
                      Madhya Pradesh
                    </option>
                    <option value="Maharashtra" onClick={() => setSelected("Maharashtra")}>
                      Maharashtra
                    </option>
                    <option value="Manipur" onClick={() => setSelected("Manipur")}>
                      Manipur
                    </option>
                    <option value="Meghalaya" onClick={() => setSelected("Meghalaya")}>
                      Meghalaya
                    </option>
                    <option value="Mizoram" onClick={() => setSelected("Mizoram")}>
                      Mizoram
                    </option>
                    <option value="Nagaland" onClick={() => setSelected("Nagaland")}>
                      Nagaland
                    </option>
                    <option value="Odisha" onClick={() => setSelected("Odisha")}>
                      Odisha
                    </option>
                    <option value="Puducherry" onClick={() => setSelected("Puducherry")}>
                      Puducherry
                    </option>
                    <option value="Punjab" onClick={() => setSelected("Punjab")}>
                      Punjab
                    </option>
                    <option value="Rajasthan" onClick={() => setSelected("Rajasthan")}>
                      Rajasthan
                    </option>
                    <option value="Sikkim" onClick={() => setSelected("Sikkim")}>
                      Sikkim
                    </option>
                    <option value="Tamil Nadu" onClick={() => setSelected("Tamil Nadu")}>
                      Tamil Nadu
                    </option>
                    <option value="Telangana" onClick={() => setSelected("Telangana")}>
                      Telangana
                    </option>
                    <option value="Tripura" onClick={() => setSelected("Tripura")}>
                      Tripura
                    </option>
                    <option value="Uttarakhand" onClick={() => setSelected("Uttarakhand")}>
                      Uttarakhand
                    </option>
                    <option value="Uttar Pradesh" onClick={() => setSelected("Uttar Pradesh")}>
                      Uttar Pradesh
                    </option>
                    <option value="West Bengal" onClick={() => setSelected("West Bengal")}>
                      West Bengal
                    </option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block font-semibold mb-2" htmlFor="pin">
                    Pin Code
                  </label>
                  <input
                    onChange={(e) => setads({ ...ads, pincode: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded shadow-sm"
                    type="text"
                    id="pin"
                    inputMode="numeric"
                    name="pin"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2" htmlFor="landmark">
                    Landmark
                  </label>
                  <input
                    onChange={(e) => setads({ ...ads, landmark: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded shadow-sm"
                    placeholder="Optional"
                    type="text"
                    id="landmark"
                    name="landmark"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center mb-4 ">
              <input
                onClick={(e) => setads({ ...ads, type: true })}
                id="home"
                type="radio"
                value="true"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <label htmlFor="home" className="ml-2 text-sm font-medium text-gray-800 ">
                Home (All day delivery)
              </label>
            </div>
            <div className="flex items-center mb-6">
              <input
                onClick={(e) => setads({ ...ads, type: false })}
                id="work"
                type="radio"
                value="false"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <label htmlFor="work" className="ml-2 text-sm font-medium text-gray-800 ">
                Work (Delivery between 10AM to 5PM)
              </label>
            </div>
            <div className="flex justify-between mx-2 my-8">
              <button className="bg-blue-700 hover:bg-blue-900 text-white font-semibold  px-4 rounded-md">Save Address</button>
              <button
                className="border-red-600 border-2 hover:bg-red-800 
              hover:text-white focus:bg-red-500 text-gray-700 font-semibold rounded-md py-2 px-9"
                onClick={() => setaddAddress(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Address;
