import axios from "axios";

export const createitem = async (formdata) =>
  axios.post(`${import.meta.env.VITE_API_URL}/product`, formdata);

export const readitems = async () =>
  axios.get(`${import.meta.env.VITE_API_URL}/product/40`);


export const removeitem = async (id)=> axios.delete(`${import.meta.env.VITE_API_URL}/product/${id}`)