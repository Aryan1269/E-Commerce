import {  useRef } from "react";

const Update = () => {
  function handleSubmit(e) {
    e.preventDefault();
  }
  const name = useRef("");

  return (
    <div className="h-full p-2 text-lg w-full bg-gray-100 ">
      <form className="flex flex-col gap-2 p-4 m-2" onSubmit={handleSubmit}>
        <input
          autoFocus
          className="p-2 text-lg"
          type="text"
          placeholder="Enter a name"
          required
          ref={name}
        />
        <input
          className="p-2 rounded bg-blue-200 text-lg w-fit"
          type="submit"
          value="submit"
        />
      </form>
    </div>
  );
};

export default Update;
