import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProductDetail from "./pages/Products/ProductDetail";
import ProductsList from "./pages/Products/ProductsList";
import Register from "./pages/Register/Register";
import MerchantRegister from "./pages/Merchant/Register/MerchantRegister";
import Test from "./pages/Test";
import { ToastContainer } from "react-toastify";
import Success from "./pages/Success/Success";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import Orders from "./pages/Orders/Orders";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:type" element={<ProductsList />}></Route>
          <Route path="/product-detail/:id" element={<ProductDetail />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/merchant-register"
            element={<MerchantRegister />}
          ></Route>
          <Route
            path="/success"
            element={<Success />}
          ></Route>
          <Route
            path="/cart"
            element={<Cart />}
          ></Route>
          <Route
            path="/checkout"
            element={<Checkout />}
          ></Route>
          <Route
            path="/orders"
            element={<Orders />}
          ></Route>
          <Route path="/test" element={<Test />}></Route>
          {/* <Route path="/vaccines-list" element={<VaccinesList />}></Route>
        <Route path="/vaccine-detail/:id" element={<VaccineDetail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route
          path="/vaccine-registration"
          element={<VaccineRegistration />}
        ></Route>
        <Route path="/vaccine-history" element={<VaccineHistory />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/test" element={<Test />}></Route> */}
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
    </Router>
  );
}

export default App;
