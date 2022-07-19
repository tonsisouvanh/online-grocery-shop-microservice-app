import axios from "axios";

const API_URL = "http://localhost:8000/product-gate/api/ratings/";
const user = JSON.parse(localStorage.getItem("user"));

// create ratings
const createRating = async (ratingData) => {

  // const config = {
  //   headers: {
  //     Authorization: `Bearer ${user.token}`,
  //   },
  // };
  const response = await axios.post(API_URL + "create", ratingData);
  return response.data;
};



const vaccineService = {
  createRating,
};

export default vaccineService;
