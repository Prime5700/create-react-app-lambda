import { useState, Fragment, useEffect } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import '../../css/btn.css'
const customAnimation = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};
export default function FilterModal({ onClose, onData, products }) {
  const [message, setMessage] = useState();
  const [filters, setFilters] = useState({
    sizes: [],
    color: "",
    fit: "",
    material: "",
    price: "",
  });
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const sortedProducts = [...products].sort((a, b) => {
    if (message === "Popular") {
      return a.name.localeCompare(b.name);
    } else if (message === "Low to High") {
      return a.price - b.price;
    } else if (message === "High to Low") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === "sizes") {
      const isChecked = event.target.checked;
      if (isChecked) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          sizes: [...prevFilters.sizes, value],
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          sizes: prevFilters.sizes.filter((size) => size !== value),
        }));
      }
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }
  };
  const filteredData = sortedProducts.filter((item) => {
    const isSizeMatched =
      filters.sizes.length === 0 ||
      item.sizes.some((size) => filters.sizes.includes(size));
    const isColorMatched = filters.color === "" || item.color === filters.color;
    const isFitMatched = filters.fit === "" || item.fit === filters.fit;
    const isMaterialMatched =
      filters.material === "" || item.material === filters.material;
    const isPriceMatched =
      filters.price === "" || item.price <= parseInt(filters.price);
    return (
      isSizeMatched &&
      isColorMatched &&
      isFitMatched &&
      isMaterialMatched &&
      isPriceMatched
    );
  });

  const handleData = () => {
    onClose();
    onData(filteredData);
  };
  return (
    <Fragment>
      {/* mobile filter  */}
      <Fragment>
        <div className="fixed flex justify-center lg:hidden items-center top-0 left-0 w-full h-full bg-white">
          <div>
            <h1 className="text-4xl text-gray-900 font-mono font-semibold mb-5">
              Filter
            </h1>
            <div className="">
              {/* Sort  */}
              <Accordion open={open === 1} animate={customAnimation}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
                  Sort By
                </AccordionHeader>
                <AccordionBody>
            <div className="m-2 text-lg ">
              <button
                className={`${
                  message === "Popular" && "text-green-600 font-semibold"
                } `}
                onClick={() => setMessage("Popular")}>
                Popular
              </button>
            </div>
            <div className="m-2 text-lg">
              <button
                className={`${
                  message === "Low to High" && "text-green-600 font-semibold"
                } `}
                onClick={() => setMessage("Low to High")}>
                Price:(Low to High)
              </button>
            </div>
            <div className="m-2 text-lg">
              <button
                className={`${
                  message === "High to Low" && "text-green-600 font-semibold"
                } `}
                onClick={() => setMessage("High to Low")}>
                Price:(High to Low)
              </button>
            </div>
            <div className="m-2 text-lg">
              <button
                className={`${
                  message === "New" && "text-green-600 font-semibold"
                } `}
                onClick={() => setMessage("New")}>
                Newly Added
              </button>
            </div>
          </AccordionBody>
              </Accordion>
              {/* color  */}
              <Accordion open={open === 2} animate={customAnimation}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
                  Color
                </AccordionHeader>
                <AccordionBody>
                  <div className="flex gap-2 items-center ">
                    <input
                      type="radio"
                      value="Black"
                      onChange={handleFilterChange}
                      name="color"
                      checked={filters.color.includes("Black")}
                      id="Black"
                    />
                    Black
                    <input
                      type="radio"
                      value="Blue"
                      onChange={handleFilterChange}
                      name="color"
                      checked={filters.color.includes("Blue")}
                      id="Blue"
                    />
                    Blue
                    <input
                      type="radio"
                      value="Green"
                      onChange={handleFilterChange}
                      name="color"
                      checked={filters.color.includes("Green")}
                      id="Green"
                    />
                    Green
                    <input
                      type="radio"
                      value="White"
                      onChange={handleFilterChange}
                      name="color"
                      checked={filters.color.includes("White")}
                      id="White"
                    />
                    White
                    <input
                      type="radio"
                      value=""
                      onChange={handleFilterChange}
                      name="color"
                      id=""
                    />
                    Others/All
                  </div>
                </AccordionBody>
              </Accordion>
              {/* size  */}
              <Accordion open={open === 3} animate={customAnimation}>
                <AccordionHeader
                  onClick={() => handleOpen(3)}
                  style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
                  Size
                </AccordionHeader>
                <AccordionBody>
                  <div className=" m-1 flex justify-between">
                    <input
                      type="checkbox"
                      name="sizes"
                      value="S"
                      id="S"
                      checked={filters.sizes.includes("S")}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="S">S</label>
                    <input
                      type="checkbox"
                      name="sizes"
                      value="M"
                      id="M"
                      checked={filters.sizes.includes("M")}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="M">M</label>
                    <input
                      type="checkbox"
                      name="sizes"
                      value="L"
                      id="L"
                      checked={filters.sizes.includes("L")}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="L">L</label>
                    <input
                      type="checkbox"
                      name="sizes"
                      value="XL"
                      id="XL"
                      checked={filters.sizes.includes("XL")}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="XL">XL</label>
                    <input
                      type="checkbox"
                      name="sizes"
                      value="XXL"
                      checked={filters.sizes.includes("XXL")}
                      onChange={handleFilterChange}
                    />
                    <label htmlFor="XXL">XXL</label>
                  </div>
                </AccordionBody>
              </Accordion>
              {/* fit  */}
              <Accordion open={open === 4} animate={customAnimation}>
                <AccordionHeader
                  onClick={() => handleOpen(4)}
                  style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
                  Fit
                </AccordionHeader>
                <AccordionBody>
                  <div className="m-2 flex items-center">
                    <input
                      onChange={handleFilterChange}
                      value="oversized"
                      type="radio"
                      name="fit"
                      id="oversized"
                      checked={filters.fit.includes("oversized")}
                    />
                    <label className="mx-2" htmlFor="oversized">
                      OverSized
                    </label>
                  </div>
                  <div className="m-2 flex items-center">
                    <input
                      onChange={handleFilterChange}
                      value="dryfit"
                      type="radio"
                      name="fit"
                      checked={filters.fit.includes("dryfit")}
                      id="dryfit"
                    />
                    <label className="mx-2" htmlFor="dryfit">
                      Dry Fit
                    </label>
                  </div>
                  <div className="m-2 flex items-center">
                    <input
                      onChange={handleFilterChange}
                      value=""
                      type="radio"
                      name="fit"
                      id=""
                    />
                    <label className="mx-2" htmlFor="all">
                      All
                    </label>
                  </div>
                </AccordionBody>
              </Accordion>
              {/* price range */}
              <Accordion open={open === 5} animate={customAnimation}>
                <AccordionHeader
                  onClick={() => handleOpen(5)}
                  style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
                  Price
                </AccordionHeader>
                <AccordionBody>
                  <div className="m-2 flex items-center">
                    <select
                      name="price"
                      className="w-1/2"
                      value={filters.price}
                      onChange={handleFilterChange}>
                      <option value="">All</option>
                      <option value="299">Less than ₹299 </option>
                      <option value="399">Less than ₹399 </option>
                      <option value="499">Less than ₹499 </option>
                      <option value="699">Less than ₹699 </option>
                    </select>
                  </div>
                </AccordionBody>
              </Accordion>
            </div>
            {/* Clear all filter button  */}
            <button
              onClick={() =>
                setFilters({
                  sizes: [],
                  color: "",
                  fit: "",
                  material: "",
                  price: "",
                })
              }
              className="mt-5 underline text-[#158181]">
              Clear All
            </button>
            {/* apply and close button  */}
            <div className="fixed w-full p-4 flex left-0 bottom-0 ">
              <button
                onClick={onClose}
                id="closebtn"
                className="mt-5 underline w-1/2  flex justify-center items-center">
                Close
              </button>
              <button
                onClick={handleData}
                id="applybtn"
                className="mt-5 underline w-1/2 flex justify-center items-center">
                Apply
              </button>
            </div>
          </div>
        </div>
      </Fragment>
      {/* desktop filter  */}
      <div className="hidden lg:block">
        <h1 className="text-3xl text-gray-700 font-semibold mb-5">Filter</h1>
        {/* Sort  */}
        <Accordion open={open === 1} animate={customAnimation}>
          <AccordionHeader
            onClick={() => handleOpen(1)}
            style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
            Sort By
          </AccordionHeader>
          <AccordionBody>
            <div className="m-2 text-lg ">
              <button
                className={`${
                  message === "Popular" && "text-green-500 font-semibold"
                } `}
                onClick={() => setMessage("Popular")}>
                Popular
              </button>
            </div>
            <div className="m-2 text-lg">
              <button
                className={`${
                  message === "Low to High" && "text-green-500 font-semibold"
                } `}
                onClick={() => setMessage("Low to High")}>
                Price:(Low to High)
              </button>
            </div>
            <div className="m-2 text-lg">
              <button
                className={`${
                  message === "High to Low" && "text-green-500 font-semibold"
                } `}
                onClick={() => setMessage("High to Low")}>
                Price:(High to Low)
              </button>
            </div>
            <div className="m-2 text-lg">
              <button
                className={`${
                  message === "New" && "text-green-500 font-semibold"
                } `}
                onClick={() => setMessage("New")}>
                Newly Added
              </button>
            </div>
          </AccordionBody>
        </Accordion>
        {/* color  */}
        <Accordion open={open === 2} animate={customAnimation}>
          <AccordionHeader
            onClick={() => handleOpen(2)}
            style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
            Color
          </AccordionHeader>
          <AccordionBody>
            <div className="flex gap-2 items-center ">
              <input
                type="radio"
                value="Black"
                onChange={handleFilterChange}
                name="color"
                checked={filters.color.includes("Black")}
                id="Black"
              />
              Black
              <input
                type="radio"
                value="Blue"
                onChange={handleFilterChange}
                name="color"
                checked={filters.color.includes("Blue")}
                id="Blue"
              />
              Blue
              <input
                type="radio"
                value="Green"
                onChange={handleFilterChange}
                name="color"
                checked={filters.color.includes("Green")}
                id="Green"
              />
              Green
              <input
                type="radio"
                value="White"
                onChange={handleFilterChange}
                name="color"
                checked={filters.color.includes("White")}
                id="White"
              />
              White
              <input
                type="radio"
                value=""
                onChange={handleFilterChange}
                name="color"
                id=""
              />
              Others/All
            </div>
          </AccordionBody>
        </Accordion>
        {/* size  */}
        <Accordion open={open === 3} animate={customAnimation}>
          <AccordionHeader
            onClick={() => handleOpen(3)}
            style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
            Size
          </AccordionHeader>
          <AccordionBody>
            <div className=" m-1 flex justify-between">
              <input
                type="checkbox"
                name="sizes"
                value="S"
                id="S"
                checked={filters.sizes.includes("S")}
                onChange={handleFilterChange}
              />
              <label htmlFor="S">S</label>
              <input
                type="checkbox"
                name="sizes"
                value="M"
                id="M"
                checked={filters.sizes.includes("M")}
                onChange={handleFilterChange}
              />
              <label htmlFor="M">M</label>
              <input
                type="checkbox"
                name="sizes"
                value="L"
                id="L"
                checked={filters.sizes.includes("L")}
                onChange={handleFilterChange}
              />
              <label htmlFor="L">L</label>
              <input
                type="checkbox"
                name="sizes"
                value="XL"
                id="XL"
                checked={filters.sizes.includes("XL")}
                onChange={handleFilterChange}
              />
              <label htmlFor="XL">XL</label>
              <input
                type="checkbox"
                name="sizes"
                value="XXL"
                checked={filters.sizes.includes("XXL")}
                onChange={handleFilterChange}
              />
              <label htmlFor="XXL">XXL</label>
            </div>
          </AccordionBody>
        </Accordion>
        {/* fit  */}
        <Accordion open={open === 4} animate={customAnimation}>
          <AccordionHeader
            onClick={() => handleOpen(4)}
            style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
            Fit
          </AccordionHeader>
          <AccordionBody>
            <div className="m-2 flex items-center">
              <input
                onChange={handleFilterChange}
                value="oversized"
                type="radio"
                name="fit"
                id="oversized"
                checked={filters.fit.includes("oversized")}
              />
              <label className="mx-2" htmlFor="oversized">
                OverSized
              </label>
            </div>
            <div className="m-2 flex items-center">
              <input
                onChange={handleFilterChange}
                value="dryfit"
                type="radio"
                name="fit"
                checked={filters.fit.includes("dryfit")}
                id="dryfit"
              />
              <label className="mx-2" htmlFor="dryfit">
                Dry Fit
              </label>
            </div>
            <div className="m-2 flex items-center">
              <input
                onChange={handleFilterChange}
                value=""
                type="radio"
                name="fit"
                id=""
              />
              <label className="mx-2" htmlFor="all">
                All
              </label>
            </div>
          </AccordionBody>
        </Accordion>
        {/* price range */}
        <Accordion open={open === 5} animate={customAnimation}>
          <AccordionHeader
            onClick={() => handleOpen(5)}
            style={{ fontSize: "1.5rem", lineHeight: "2.25rem" }}>
            Price
          </AccordionHeader>
          <AccordionBody>
            <div className="m-2 flex items-center">
              <select
                name="price"
                className="w-1/2"
                value={filters.price}
                onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="299">Less than ₹299 </option>
                <option value="399">Less than ₹399 </option>
                <option value="499">Less than ₹499 </option>
                <option value="699">Less than ₹699 </option>
              </select>
            </div>
          </AccordionBody>
        </Accordion>
        {/* Clear all button  */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              setFilters({
                sizes: [],
                color: "",
                fit: "",
                material: "",
                price: "",
              });
              onData(products);
            }}
            className="mt-5 underline text-[#158181]">
            Clear All
          </button>
          <button
            onClick={() => onData(filteredData)}
            id="applybtn"
            className="mt-5">
            Apply
          </button>
        </div>
      </div>
    </Fragment>
  );
}
