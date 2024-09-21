import React from "react";
import { Link, Outlet } from "react-router-dom";

const navLinks = [
  {
    name: "Dashboard",
    path: "/admin/create",
  },
  {
    name: "product",
    path: "/admin/product",
  },
  {
    name: "products",
    path: "/admin/products",
  },
  {
    name: "subCategory",
    path: "/admin/subcategory",
  },
];

const Admin = () => {
  return (
    <>
      <div className="grid grid-cols-[25%_1fr] bg-gray-200 min-h-screen w-full">
        <aside className="bg-gray-300 w-full min-h-screen cols-span-1 flex flex-col items-start p-1 gap-4 justify-start p-4">
          {navLinks.map((n) => (
            <Link
              key={n.name}
              className="bg-gray-400 w-full p-3 font-bold text-lg mx-auto text-center capitalize text-gray-800"
              to={n.path}
            >
              {n.name}
            </Link>
          ))}
        </aside>
        <main className="p-4 min-h-screen w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Admin;
