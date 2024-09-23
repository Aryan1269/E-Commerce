import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { pageditems } from "../../utils/product";
import { useSelector, useDispatch } from "react-redux";
import { storeCart } from "../../Redux/cartSlice";
import _ from "lodash";

export default function Homepage() {
  const [products, setProducts] = useState([]); // Renamed for clarity
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cartState = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  async function getProducts() {
    try {
      const response = await pageditems(currentPage); // Fetch products based on current page
      console.log(response.data);

      setProducts(response.data.products || []); // Ensure products is an array
      setTotalPages(response.data.totalcount || 1); // Set total pages from response
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  }

  useEffect(() => {
    getProducts(); // Fetch products when component mounts or currentPage changes
  }, [currentPage]);

  async function logout() {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
        withCredentials: true,
      });
      toast.success("Logout successful");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  }

  const addToCart = (product) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // Check if the product already exists in the cart
      const productExists = cart.some((item) => item.id === product.id);

      cart.push({
        ...product,
        count: 1,
      });

      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem("cart", JSON.stringify(unique));
      dispatch(storeCart(unique));
    }
  };

  return (
    <>
      <button className="p-2 bg-blue-300 text-white ml-2" onClick={logout}>
        Log Out
      </button>

      <div className="flex flex-wrap gap-5">
        {products.length > 0 &&
          products.map((p) => (
            <div
              key={p._id}
              className="group my-5 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md"
            >
              <div className="relative flex h-40 overflow-hidden">
                <img
                  className="absolute top-0 right-0 h-full w-full object-cover"
                  src={p.images[0].url}
                  alt="product"
                />
              </div>
              <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl tracking-tight text-slate-900">
                  {p.name}
                </h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <small>{p.description}</small>
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/update/${p._id}`} // Assuming you have a route for updating products
                    className="flex items-center justify-center text-center bg-gray-900 px-4 py-2 gap-2 text-sm text-white transition hover:bg-gray-700"
                  >
                    <i className="ri-edit-box-fill text-center text-md"></i>{" "}
                    Update
                  </Link>
                  <button
                    onClick={() => addToCart(p)} // Implement delete functionality
                    className="flex items-center justify-center text-center bg-gray-900 px-4 py-2 gap-2 text-sm text-white transition hover:bg-gray-700"
                  >
                    Add to cart
                    <i className="ri-add-circle-fill text-center text-md mt-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Section */}
      <section
        id="pagination"
        className="flex items-center justify-center gap-2"
      >
        {currentPage > 1 && (
          <Link
            className="p-1 outline bg-green-400"
            to={`/homepage?page=${currentPage - 1}`} // Navigate to previous page
            onClick={() => setCurrentPage(currentPage - 1)} // Update state for current page
          >
            Prev
          </Link>
        )}
        {currentPage <= totalPages + 1 &&
          Array.from({ length: totalPages }, (p, i) => (
            <Link
              className="p-1 outline active:bg-red-400"
              to={`/homepage?page=${currentPage + 1}`} // Navigate to next page
              onClick={() => setCurrentPage(currentPage + 1)} // Update state for current page
            >
              {i + currentPage + 1}
            </Link>
          ))}
        {currentPage <= totalPages + 1 && (
          <Link
            className="p-1 outline bg-green-400"
            to={`/homepage?page=${currentPage + 1}`} // Navigate to next page
            onClick={() => setCurrentPage(currentPage + 1)} // Update state for current page
          >
            Next
          </Link>
        )}
      </section>
    </>
  );
}
