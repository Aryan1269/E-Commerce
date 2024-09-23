import axios from "axios";

export const createproduct = async (formData) =>
  await axios.post(`http://localhost:8080/api/category`, formData, {
    withCredentials: true,
  });

export const readproduct = async () =>
  await axios.get(`http://localhost:8080/api/category`, {
    withCredentials: true,
  });

export const getsubproduct = async (id) => {
  console.log(`http://localhost:8080/api/category/sub/${id}`, {
    withCredentials: true,
  });

  return await axios.get(`http://localhost:8080/api/category/sub/${id}`, {
    withCredentials: true,
  });
};

export const singleproduct = async (name) => {
  return await axios.get(`http://localhost:8080/api/category/${name}`, {
    withCredentials: true,
  });
};

export const updateproduct = async (slug, formData) =>
  await axios.put(`http://localhost:8080/api/category/${slug}`, formData, {
    withCredentials: true,
  });

export const deleteproduct = async (slug) =>
  await axios.delete(`http://localhost:8080/api/category/${slug}`, {
    withCredentials: true,
  });
