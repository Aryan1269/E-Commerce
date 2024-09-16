import axios from "axios";

export const createproduct = async (formData) =>
  await axios.post(`http://localhost:8080/api/category`, formData);

export const readproduct = async () =>
  await axios.get(`http://localhost:8080/api/category`);

export const singleproduct = async (slug) =>
  await axios.get(`http://localhost:8080/api/category/${slug}`);

export const updateproduct = async (slug, formData) =>
  await axios.put(`http://localhost:8080/api/category/${slug}`, formData);

export const deleteproduct = async (slug) =>
  await axios.delete(`http://localhost:8080/api/category/${slug}`);
