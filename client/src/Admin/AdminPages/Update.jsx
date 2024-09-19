import { useEffect, useRef, useState } from "react";
import { singleproduct, updateproduct } from "../../utils/admin";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { Cname } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState(Cname);


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const rs = await singleproduct(Cname);
      console.log(rs);
      
      const updateProduct = await updateproduct(rs.data.slug, { name: name });
      navigate("/admin/create");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full p-2 text-lg w-full bg-gray-100 ">
      <form className="flex flex-col gap-2 p-4 m-2" onSubmit={handleSubmit}>
        <input
          autoFocus
          className="p-2 text-lg"
          type="text"
          placeholder="Enter a new name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
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
