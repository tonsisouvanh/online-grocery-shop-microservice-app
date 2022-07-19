import axios from "axios";

const API_URL = "http://localhost:8000/order-gate/api/orders/";

// vaccines
const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// vaccines
const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};


const vaccineService = {
  getProducts,
  getProduct
};

export default vaccineService;
