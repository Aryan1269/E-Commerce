import React from "react";
import { Link, Outlet } from "react-router-dom";

 const navLinks = [
  {
    name: "Dashboard",
    path: "/admin/create",
  },
  {
    name: "products",
    path: "/admin/product",
  },
];

const Admin = () => {
  return (
    <>
      <div className="grid grid-cols-[25%_1fr] bg-gray-200 h-screen w-full">
        <aside className="bg-gray-300 cols-span-1 flex flex-col items-start p-1 gap-4 justify-start p-4">
          {navLinks.map((n) => (
            <Link
              className="bg-gray-400 w-full mx-auto text-center capitalize text-gray-800"
              to={n.path}
            >
              {n.name}
            </Link>
          ))}
        </aside>
        <main className="p-4 h-screen w-full">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Admin;
