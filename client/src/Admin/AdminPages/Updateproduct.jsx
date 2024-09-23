import { useEffect, useState } from "react";
import { getsubproduct, readproduct } from "../../utils/admin";
import FileUpload from "../component/FileUpload";
import axios from "axios";
import { createitem, singleitem } from "../../utils/product";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const initial = {
  categories: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  subcategory: [],
};

const Updateproduct = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({});
  const [extrafield, setextrafield] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    loadsingleproduct();
    loadcategories();
  }, []);

  async function loadcategories() {
    const rs = await readproduct();

    setextrafield({ ...extrafield, categories: rs.data });
  }

  async function loadsingleproduct() {
    const rs = await singleitem(id);

    setFormValues(rs.data);
  }

  console.log(formValues);
  //handleCategories
  const handleCategory = async (e) => {
    e.preventDefault();
    try {
      setFormValues({ ...formValues, subs: [], category: e.target.value });

      const rs = await getsubproduct(e.target.value);
      setextrafield({ ...extrafield, subcategory: rs.data });
    } catch (error) {
      console.log(error);
    }
  };

  //////----------------------------
  const handleSelectChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setFormValues({ ...formValues, subs: selectedValues });
  };

  ///---handle remove image
  async function removeImage(public_id) {
    console.log(public_id);
    try {
      const rs = await axios.post(
        `${import.meta.env.VITE_API_URL}/remove/save/image`,
        {
          public_id,
        }
      );
      const resultImage = formValues.images.filter(
        (imag) => imag.public_id != public_id
      );
      setFormValues({ ...formValues, images: resultImage });
    } catch (error) {
      console.log(error);
    }
  }

  ///----------------------------------
  //handleCategories
  // const handleCategory = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setFormValues({ ...formValues, subs: [], category: e.target.value });

  //     const rs = await getsubproduct(e.target.value);
  //     setSubcat(rs.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // console.log(formValues.images[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rs = await createitem(formValues);
      toast.success("product create sucessfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }

    console.log(formValues);
  };
  return (
    formValues && (
      <div className="flex justify-center items-center min-h-screen">
        <form
          className="w-full max-w-lg bg-white rounded-lg shadow-md overflow-auto"
          onSubmit={handleSubmit}
        >
          {/* image preview */}
          <div className="flex gap-2 mt-2 p-2 overflow-x-auto overflow-y-hidden flex-wrap max-w-[98%] h-[11%]">
            {formValues?.images?.length > 0 &&
              formValues.images?.map((m, i) => (
                <div class="relative w-[20%] h-[10%]" key={i}>
                  <img
                    className="object-contain w-full h-full"
                    src={m.url}
                    alt=""
                  />
                  <div
                    onClick={() => removeImage(m.public_id)}
                    class="absolute inline-flex items-center cursor-pointer justify-center w-6 h-6 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900"
                  >
                    ❌
                  </div>
                </div>
              ))}
          </div>
          {/* img end */}
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Product Form</h2>
            {/* Title Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formValues.title}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
            {/* Description Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formValues.description}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
            {/* Price Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formValues.price}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
            {/* Category Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formValues.category?._id}
                onChange={handleCategory}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {extrafield.categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>{" "}
            {/* sub Category Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >
                sub Category
              </label>
              <select
                name="category"
                id="category"
                value={formValues.subs?._id}
                multiple
                onChange={handleSelectChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500 "
              >
                <option value="" disabled>
                  Select a multiple subcategory
                </option>
                {extrafield?.subcategory?.length > 0
                  ? extrafield?.subcategory.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))
                  : formValues?.subs?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
              </select>
            </div>
            {/* {ending of sub category 😂} */}
            {/* Shipping Options */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="shipping"
              >
                Shipping
              </label>
              <select
                name="shipping"
                id="shipping"
                value={formValues.shipping}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select shipping option
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {/* Quantity Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={formValues.quantity}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
            {/* file upload field */}
            <div className="mb-4">
              <FileUpload values={formValues} setValues={setFormValues} />
            </div>
            {/* Color Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="color"
              >
                Color
              </label>
              <select
                name="color"
                id="color"
                value={formValues.color}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select a color
                </option>
                {extrafield.colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            {/* Brand Field */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="brand"
              >
                Brand
              </label>
              <select
                name="brand"
                id="brand"
                value={formValues.brand}
                onChange={handleChange}
                required
                className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select a brand
                </option>
                {extrafield.brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-6 block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default Updateproduct;
