import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Homepage from "./Homepage";
import axios from "axios";

export default function Home() {
  return (
    <>
      <nav className="flex gap-4 justify-start items-center p-4 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-400 underline" : "text-black"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "text-green-400 underline" : "text-black"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? "text-green-400 underline" : "text-black"
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-green-400 underline ml-auto" : "text-black ml-auto"
          }
        >
          login
        </NavLink>
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "text-green-400 underline" : "text-black"
          }
        >
          Register
        </NavLink>
      </nav>

      <Outlet />
    </>
  );
}
