import axios from "axios";

const API_URL = "http://localhost:8000/user-gate/api/merchant/";


// Create new user
const register = async (merchantData) => {
  const response = await axios.post(API_URL + "register", merchantData);
  return response.data;
};

// Login user
const login = async (merchantData) => {
  const response = await axios.post(API_URL + "login", merchantData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};



const UserServices = {
  register,
  login,
  // logout,
  // getUsers,
  // getUser,
  // deleteUser,
};

export default UserServices;
