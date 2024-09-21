import axios from "axios";

export const createsubproduct = async (formData) =>
  await axios.post(`${import.meta.env.VITE_API_URL}/Subcategory`, formData);

export const readsubproduct = async () =>
  await axios.get(`${import.meta.env.VITE_API_URL}/Subcategory`);

export const singlesubproduct = async (name) => {
  
  return await axios.get(`${import.meta.env.VITE_API_URL}/Subcategory/${name}`);
};

export const updatesubproduct = async (slug, formData) =>
  await axios.put(`${import.meta.env.VITE_API_URL}/Subcategory/${slug}`, formData);

export const deletesubproduct = async (slug) =>
  await axios.delete(`${import.meta.env.VITE_API_URL}/Subcategory/${slug}`);
