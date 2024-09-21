import { useEffect, useState } from "react";
import { readproduct } from "../../utils/admin";
import {
  createsubproduct,
  deletesubproduct,
  readsubproduct,
} from "../../utils/subcategory";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Subcategory() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    readproduct()
      .then((res) => setProducts(res))
      .catch((e) => console.log(e));

    readsubproduct()
      .then((res) => setSubCategory(res?.data))
      .catch((e) => console.log(e));
  }, [isSubmitted]);

  console.log(subcategory);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData(e.currentTarget);
      const data = Object.fromEntries(formdata);
      if (data.length < 2) {
        toast.warn("fill all the required fields");
      }
      const rs = await createsubproduct(data);
      toast.success("created sub product");
      setIsSubmitted(!isSubmitted);
    } catch (error) {}
  };

  const handleDelete = async (slug) => {

    try {
      await deletesubproduct(slug);
      setIsSubmitted(!isSubmitted);
    } catch (error) {
      console.log(error);
    }
  };

  //filter
  const serached = (query) => (c) =>
    c.name.toLowerCase().includes(query?.toLowerCase());

  return (
    <>
      <div className="h-full p-2 text-lg w-full bg-gray-100 ">
        <h1>Create a subcategory</h1>
        <form className="flex flex-col gap-2 p-4 m-2" onSubmit={handleSubmit}>
          <select
            className="p-2 outline-none"
            name="parent"
            id="parent"
            required
          >
            <option value="" disabled selected>
              ---select--parent--
            </option>
            {products?.data?.length > 0 &&
              products.data.map((p) => (
                <option key={p.name} value={p._id}>
                  {p.name}
                </option>
              ))}
          </select>

          <br />
          <input
            autoFocus
            className="p-2 text-lg"
            type="text"
            placeholder="Enter a name"
            required
            name="name"
          />
          <input
            className="p-2 rounded bg-blue-200 text-lg w-fit"
            type="submit"
            value="submit"
          />
        </form>
        <hr />
        <input
          type="search"
          placeholder="filter"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <br />
        <h1>Items</h1>
        <div className="m-2 p-2 overflow-auto ">
          {subcategory.length > 0 &&
            subcategory?.filter(serached(query)).map((p) => (
              <div className="text-xl m-2 flex justify-start gap-4 bg-gray-200 p-4 ">
                <h1>{p.name}</h1>
                <Link className="ml-auto" to={`/admin/update/${p.name}`}>
                  <i className=" ri-pencil-fill"></i>
                </Link>
                <span onClick={() => handleDelete(p.slug)}>
                  <i class="ri-delete-bin-2-line"></i>
                </span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
