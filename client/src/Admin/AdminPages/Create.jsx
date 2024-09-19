import { useEffect, useRef, useState } from "react";
import { createproduct, deleteproduct, readproduct } from "../../utils/admin";
import { Link } from "react-router-dom";
const Create = () => {
  const [products, setProducts] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const name = useRef("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const rs = await createproduct({ name: name.current.value });
      e.target.reset();
      setIsSubmitted(!isSubmitted);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function handleDelete(slug) {
    try {
      const rs = await deleteproduct(slug);
      setIsSubmitted(!isSubmitted);
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const rs = await readproduct();
        setProducts(rs.data);
        console.log(res);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchProducts();
  }, [isSubmitted]);

  console.log(products);

  return (
    <>
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
        <hr />
        <br />
        <h1>Items</h1>
        <div className="m-2 p-2 overflow-auto h-[70%]">
          {products.length > 0 &&
            products.map((p) => (
              <div className="text-xl m-2 flex justify-start gap-4 bg-gray-200 p-4 ">
                <h1>{p.name}</h1>
                <Link
                  className="ml-auto"
                  to={`/admin/update/${p.name}`}
                >
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
};

export default Create;
