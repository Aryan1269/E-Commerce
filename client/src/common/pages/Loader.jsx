import React from "react";
import "./loader.css";

export default function Loader() {

  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="spinner ">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
}
