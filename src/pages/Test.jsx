import axios from "axios";
import React, { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    to: "",
    images: [],
    color: "",
    sizes: [
      {
        name: "S",
        inStock: false,
      },
      {
        name: "M",
        inStock: true,
      },
      {
        name: "L",
        inStock: false,
      },
      {
        name: "XL",
        inStock: true,
      },
      {
        name: "XXL",
        inStock: true,
      },
    ],
    description: "",
    highlights: ["Hand cut and sewn locally", "Dyed with our proprietary colors", "Pre-washed & pre-shrunk", "Ultra-soft 100% cotton"],
    details: "",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target[3].files[0]);
    const newItem = { imageSrc: "", imageAlt: e.target[4].value };
    await axios.post(`http://${window.location.hostname}:8080/item/uploadFile`, formData).then((e) => {
      newItem.imageSrc = e.data;
      setData((prevData) => ({
        ...prevData,
        images: [...prevData.images, newItem],
      }));
    });
    const formData2 = new FormData();
    formData2.append("file", e.target[5].files[0]);
    const newItem2 = { imageSrc: "", imageAlt: e.target[6].value };
    await axios.post(`http://${window.location.hostname}:8080/item/uploadFile`, formData2).then((e) => {
      newItem2.imageSrc = e.data;
      setData((prevData) => ({
        ...prevData,
        images: [...prevData.images, newItem2],
      }));
    });
    const formData3 = new FormData();
    formData3.append("file", e.target[7].files[0]);
    const newItem3 = { imageSrc: "", imageAlt: e.target[8].value };
    await axios.post(`http://${window.location.hostname}:8080/item/uploadFile`, formData3).then((e) => {
      newItem3.imageSrc = e.data;
      setData((prevData) => ({
        ...prevData,
        images: [...prevData.images, newItem3],
      }));
    });
    const formData4 = new FormData();
    formData4.append("file", e.target[9].files[0]);
    const newItem4 = { imageSrc: "", imageAlt: e.target[10].value };
    await axios.post(`http://${window.location.hostname}:8080/item/uploadFile`, formData4).then((e) => {
      newItem4.imageSrc = e.data;
      setData((prevData) => ({
        ...prevData,
        images: [...prevData.images, newItem4],
      }));
    });
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="pt-20 ">
      <div className="m-10">
        <form onSubmit={handelSubmit}>
          <div>
            <label>
              Name
              <input type="text" onChange={(e) => setData({ ...data, name: e.target.value })} />
            </label>
          </div>
          <div>
            <label>
              {" "}
              price
              <input type="text" onChange={(e) => setData({ ...data, price: e.target.value })} />
            </label>
          </div>
          <div>
            <label>
              to
              <input type="text" onChange={(e) => setData({ ...data, to: e.target.value })} />
            </label>
          </div>
          <div>
            <label>
              Image1
              <input type="file" />
              alt
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              Image2
              <input type="file" />
              alt
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              Image3
              <input type="file" />
              alt
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              Image4
              <input type="file" />
              alt
              <input type="text" />
            </label>
          </div>
          <div>
            <label>
              color
              <input type="text" onChange={(e) => setData({ ...data, color: e.target.value })} />
            </label>
          </div>
          {/* <div>
            <label>
              Sizes
              <input type="text" />
            </label>
          </div> */}
          <div>
            <label>
              description
              <input type="text" onChange={(e) => setData({ ...data, description: e.target.value })} />
            </label>
          </div>
          {/* <div>
            <label>
              highlights
              <input
                type="text"
              />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </label>
          </div> */}
          <div>
            <label>
              details
              <input type="text" onChange={(e) => setData({ ...data, details: e.target.value })} />
            </label>
          </div>
          <button className="bg-gray-500 mt-16" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Test;
