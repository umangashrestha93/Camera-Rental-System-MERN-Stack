import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";

import PopUpToast from "../../common/Toast";
import "./recent.scss";

const RecentCard = ({ show }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const url = "http://localhost:8000/api";

  const cookies = new Cookies();
  const token = cookies.get("token");
  const headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${token}`,
  };

  const fetchAndSetProducts = async () => {
    try {
      const response = await axios.get(`${url}/camera`);
      setProducts(response.data.data);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async (data) => {
    if (token) {
      const response = await axios.post(`${url}/cart/addToCart`, data, {
        headers,
      });
      setOpen(true);
      return response;
    }
    return navigate("/login");
  };

  useEffect(() => {
    fetchAndSetProducts();
  }, []);

  const handleSearchFilterChange = (event) => {
    setSearchFilter(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setSelectedPriceRange(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    if (searchFilter) {
      const nameMatch = product.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
      const locationMatch = product.location
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
      if (!nameMatch && !locationMatch) {
        return false;
      }
    }

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split("-");
      const price = Number(product.price);
      if (price < Number(minPrice) || price > Number(maxPrice)) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <PopUpToast
        open={open}
        setOpen={setOpen}
        title="Added to Cart!!"
        message="Your item has been successfully added to cart."
      />

      <form
        className="flex flex-col flex-wrap items-start justify-start gap-6 px-4 py-3 overflow-hidden sm:justify-between sm:flex-row bg-gray-200/50"
        action="#"
        method="GET"
      >
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="flex items-center px-3 py-2.5 bg-white border rounded-lg active:ring-1 w-full sm:w-5/12">
          <MagnifyingGlassIcon
            className="w-5 h-full text-gray-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block w-full h-full -mt-0.5 pt-1 pb-0 pr-0 text-gray-900 bg-transparent border-0 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search by Name, Location"
            type="search"
            name="search"
            value={searchFilter}
            onChange={handleSearchFilterChange}
          />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-4 sm:flex-nowrap sm:w-5/12">
          <label htmlFor="price-range" className="m-0 text-gray-500">
            Price Range
          </label>
          <select
            id="price-range"
            value={selectedPriceRange}
            onChange={handlePriceRangeChange}
            className="border rounded-md"
          >
            <option value="">All</option>
            <option value="0-2000">Less than Rs.2000</option>
            <option value="2001-5000">Rs.2001 to Rs.5000</option>
            <option value="5001-10000">Rs.5001 to Rs.10000</option>
          </select>
        </div>
      </form>

      <div className="grid grid-cols-1 gap-12 my-16 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product, index) => {
          if (product.cameraType === show) {
            const { _id, cover, category, location, name, price, cameraType } =
              product;

            const data = {
              productId: _id,
              cover,
              category,
              name,
              location,
              price: Number(price),
              type: cameraType,
            };
            
            return (
              <div className="rounded-md shadow product-card" key={_id}>
                <div className="img">
                  <img
                    src={`http://localhost:8000/${cover}`}
                    alt=""
                    className="rounded-t-md"
                  />
                </div>

                <div className="flex items-start justify-between gap-2 px-8 py-6">
                  <div>
                    <h4 className="mb-2 text-xl font-semibold">{name}</h4>
                    <p className="flex items-center gap-2">
                      <i className="fa fa-location-dot"></i> {location}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 category">
                    <span
                      style={{
                        background:
                          category === "For Sale" ? "#25b5791a" : "#ff98001a",
                        color: category === "For Sale" ? "#25b579" : "#ff9800",
                      }}
                    >
                      {category}
                    </span>

                    <span className="text-green-600 bg-green-100">
                      Rs.{price}/day
                    </span>
                  </div>
                </div>

                <div className="flex py-3 button">
                  <button
                    className="text-white"
                    onClick={() => handleAddToCart(data)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default RecentCard;
