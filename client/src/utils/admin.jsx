import axios from "axios";

export const createproduct = async (formData) =>
  await axios.post(`http://localhost:8080/api/category`, formData);

export const readproduct = async () =>
  await axios.get(`http://localhost:8080/api/category`);

export const singleproduct = async (name) => {
  console.log(name);
  return await axios.get(`http://localhost:8080/api/category/${name}`);
};

export const updateproduct = async (slug, formData) =>
  await axios.put(`http://localhost:8080/api/category/${slug}`, formData);

export const deleteproduct = async (slug) =>
  await axios.delete(`http://localhost:8080/api/category/${slug}`);
