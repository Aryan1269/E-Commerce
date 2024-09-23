import axios from "axios";

export const createitem = async (formdata) =>
  axios.post(`${import.meta.env.VITE_API_URL}/product`, formdata);

export const readitems = async () =>
  axios.get(`${import.meta.env.VITE_API_URL}/product/40`);

export const pageditems = async (page) =>
  axios.get(`${import.meta.env.VITE_API_URL}/product?page=${page}`);

export const removeitem = async (id) =>
  axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`);

export const singleitem = async (id) =>
  axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
