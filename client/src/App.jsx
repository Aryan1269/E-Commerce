import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./common/components/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Found404 from "./common/pages/404Found";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Homepage from "./common/components/Homepage.jsx";
import Admin from "./Admin/Admin.jsx";
import Create from "./Admin/AdminPages/Create.jsx";
import Update from "./Admin/AdminPages/Update.jsx";
import Subcategory from "./Admin/AdminPages/Subcategory.jsx";
import Createproducts from "./Admin/AdminPages/Createproducts.jsx";
import Products from "./Admin/component/Products.jsx";
import Updateproduct from "./Admin/AdminPages/Updateproduct.jsx";
import { userContext } from "./utils/Context.jsx";
import CheckAuth from "./common/components/CheckAuth.jsx";
import Cart from "./common/components/Cart.jsx";

const App = () => {
  const { user, setUser } = useContext(userContext);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/check`,
        {
          withCredentials: true,
        }
      );

      const { success, user } = response.data;

      setUser({ isAuth: success, user });
    } catch (error) {
      console.error("Authentication check failed:", error);
      toast.error("Failed to authenticate.");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="homepage" element={<Homepage />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        {/* admin routes */}
        <Route path="/admin" element={<Admin />}>
          <Route path="create" element={<Create />} />
          <Route path="update/:Cname" element={<Update />} />
          <Route path="subcategory" element={<Subcategory />} />
          <Route path="product" element={<Createproducts />} />
          <Route path="product/:id" element={<Updateproduct />} />
          <Route path="products" element={<Products />} />
        </Route>

        <Route path="*" element={<Found404 />} />
      </Routes>
    </>
  );
};

export default App;
