import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {
  Container,
  Input,
  InputWrapper,
  Option,
  Select,
  Wrapper,
} from "../../global/GlobalStyle.styled";
import { useSelector, useDispatch } from "react-redux";
import "./Checkout.css";
import { priceFormat } from "../../utils";
import { toast } from "react-toastify";
import axios from "axios";
import { reset } from "../../feature/Cart/CartSlice";

const Checkout = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userData = {
    userId: user?._id,
    token: user?.token,
  };

  // const { products } = useSelector((state) => state.cart);
  const { total, cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [peyment, setPayment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (peyment === "") {
      toast.warning("Vui lòng chọn phương thức thanh toán");
    } else {
      const orderInput = {
        customerId: user._id,
        total: total,
        payment: peyment,
        products: cart,
      };
      console.log(orderInput)

      if (orderInput) {
        const createOrder = () => {
          axios
            .post("http://localhost:8000/order-gate/api/orders/create", orderInput)
            .then((res) => {
              if (res) {
                navigate("/success");
                dispatch(reset())
              }
            })
            .catch((err) => {
              toast.error(err.message);
            });
        };

        createOrder();
      }
    }
  };

  // useEffect(() => {
  //   // dispatch(getCart(userData));

  //   // dispatch(resetCart());
  // }, [dispatch]);

  return (
    <>
      <Container>
        <Wrapper
          bShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          mg="2rem"
          gap="1.5rem"
          fDirection="column"
          pd="2rem"
          bgColor="white"
          bRadius="10px"
          width="100%"
          mWidth="1024px"
          color="#041656"
        >
          <h3 className="register-header">TIẾN HÀNH THANH TOÁN</h3>
          <form
            onSubmit={handleSubmit}
            className="register-form-container"
            action=""
          >
            <h3>Thông tin đơn hàng</h3>
            <h4>Khách hàng: {user.name}</h4>
            <h4>Địa chỉ nhận hàng: <span style={{ fontWeight: '400' }}>{user.address.number}, {user.address.street}, {user.address.sub_district},
              {user.address.district}, {user.address.city}</span></h4>
            <p style={{ textDecoration: 'underline', color: "blue" }}>Thay đổi địa chỉ?</p>
            <Wrapper fDirection="column">
              {cart &&
                cart.map((cart, index) => (
                  <Wrapper key={index}>
                    <img
                      className="checkout-vaccine-img"
                      src={cart.img}
                      alt=""
                    />
                    <Wrapper
                      mg="0 0 0 1rem"
                      fDirection="column"
                      jContent="center"
                      gap="10px"
                    >
                      <p>Sản phẩm: {cart.name}</p>
                      <p>Gía: {priceFormat(cart.price)} VND * {cart.qty}</p>
                      <p>Số lượng: {cart.qty}</p>
                    </Wrapper>
                  </Wrapper>
                ))}
            </Wrapper>
            <h3 style={{ color: "var(--red)" }}>Tổng: {priceFormat(total)} VND</h3>

            <InputWrapper fDirection="column">
              <label className="register-label" htmlFor="">
                Chọn phương thức thanh toán
              </label>
              <Select
                name="payment"
                onChange={(e) => setPayment(e.target.value)}
              >
                <Option value=""></Option>
                <Option value="cash">Tiền mặt</Option>
                <Option value="credit">Thẻ</Option>
                <Option value="credit">Momo</Option>
              </Select>
            </InputWrapper>
            <div className="register-btn-grp">
              {/* <Link to="/success"> */}
              <button type="submit" className="btn register-btn">
                Đặt hàng
              </button>
              {/* </Link> */}
              <Link className="link" to="/cart">
                <button className="btn btn-back-home">Trở về giở hàng</button>
              </Link>
            </div>
          </form>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
