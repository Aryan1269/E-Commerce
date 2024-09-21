import { useEffect, useState } from "react";
import { readitems, removeitem } from "../../utils/product";

const Products = () => {
  const [product, setProducts] = useState([]);
  const [loading,setloading] = useState(false);

  async function getproducts() {
    const rs = await readitems();
    setProducts(rs.data);
  }

  useEffect(() => {
    getproducts();
  }, [loading]);

  async function handleDelete(id) {
    try {
        await removeitem(id);
        setloading(!loading);
        console.log("succesfful detele");
        
    } catch (error) {
        console.log(error);
        
    }    
  }

  console.log(product);

  return (
    <div className="flex flex-wrap gap-5">
      {/* */}
      {product.length > 0 &&
        product.map((p) => (
          <div
            key={p._id}
            class="group my-5 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md"
          >
            <div class="relative flex h-40 overflow-hidden">
              <img
                class="absolute top-0 right-0 h-full w-full object-cover"
                src={p.images[0].url}
                alt="product image"
              />
            </div>
            <div class="mt-4 px-5 pb-5">
              <h5 class="text-xl tracking-tight text-slate-900">{p.title}</h5>

              <div class="mt-2 mb-5 flex items-center justify-between">
                <small>{p.description}</small>
              </div>
              <div className="flex justify-between items-center">
                <button class="flex items-center justify-center text-center bg-gray-900 px-4 py-2 gap-2 text-sm text-white transition hover:bg-gray-700">
                  <i class="ri-edit-box-fill text-center text-md"></i> update
                </button>
                <button onClick={()=>handleDelete(p._id)}
                 class="flex items-center justify-center text-center bg-gray-900 px-4 py-2 gap-2 text-sm text-white transition hover:bg-gray-700">
                  Delete <i class="ri-close-circle-fill text-center text-md mt-1"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
