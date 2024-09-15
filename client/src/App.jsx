import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./common/components/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Found404 from "./common/pages/404Found";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./common/pages/Firebase_config.jsx";
import Loader from "./common/pages/Loader.jsx";
import Homepage from "./common/components/Homepage.jsx";

const App = () => {

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.table(user);
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = await user.getIdToken();
        console.log(uid + "uid");
        console.log(uid);
      } else {
        // User is signed out
        // ...
      }
    });
  },[]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="homepage" element={<Homepage />} />
        </Route>
        <Route path="*" element={<Found404 />} />
      </Routes>
    </>
  );
};

export default App;
