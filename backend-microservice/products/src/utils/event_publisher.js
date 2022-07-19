const axios = require("axios");

const PublishCustomerEvent = async (payload) => {
  axios.post("http://localhost:8000/user-gate/app-events", {
    payload,
  });
};

const GetCustomerDataEvent = async (payload) => {
  const res = await axios.get("http://localhost:8000/user-gate/app-events", {
    payload,
  });

  return res.data;
};

// const PublishCustomerEvent = async (payload) => {
//   axios.post('http://localhost:8000/customer/app-events',{
//     payload
//   })
// }
module.exports = {
  PublishCustomerEvent,
};
