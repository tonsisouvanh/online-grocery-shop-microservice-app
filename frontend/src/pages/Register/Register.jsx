import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

import {
  Container,
  Input,
  InputWrapper,
  Option,
  Select,
  Wrapper,
} from "../../global/GlobalStyle.styled";
import "./Register.css";
import { cities, districts } from "../../data/addresses";
import { toast } from "react-toastify";

import { reset, register } from "../../feature/User/UserSlice";
import Spinner from "../../components/Spinner/Spinner";

const Register = () => {
  const [userData, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    sex: "",
    number: "",
    street: "",
    sub_district: "",
    district: "",
    city: "",
  });

  const { name, email, password, phone, dob, sex } = userData;
  const { number, street, sub_district, district, city } = userData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);

    }
    if (isSuccess) {
      toast.success("Đăng ký thành công!");
    }
    if (user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setUserdata((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !phone) {
      toast.warning("Vùi lòng điền thông tin cần thiết");
    } else {
      const userInput = {
        name,
        email,
        password,
        phone,
        dob,
        sex,
        address: {
          number, street, sub_district, district, city
        }
      };
      dispatch(register(userInput));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper
          bShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          mg="2rem"
          gap="1.5rem"
          fDirection="column"
          pd="2rem"
          bgColor="white"
          bRadius="10px"
          mWidth="700px"
          width="100%"
          color="#041656"
        >
          <h3 className="register-header">ĐĂNG KÝ THÀNH VIÊN</h3>
          <form
            onSubmit={handleSubmit}
            className="register-form-container"
            action=""
          >
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Họ và tên
                </label>
                <Input name="name" onChange={handleChange} type="text" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Giới tính
                </label>
                <Select name="sex" onChange={handleChange}>
                  <Option value=""></Option>
                  <Option value="female">Nam</Option>
                  <Option value="male">Nữ</Option>
                </Select>
              </InputWrapper>
            </InputWrapper>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Điện thoại
                </label>
                <Input name="phone" onChange={handleChange} type="text" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Ngày sinh
                </label>
                <Input name="dob" onChange={handleChange} type="date" />
              </InputWrapper>
            </InputWrapper>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Địa chỉ email
                </label>
                <Input name="email" onChange={handleChange} type="email" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Mật khẩu
                </label>
                <Input
                  name="password"
                  onChange={handleChange}
                  type="password"
                />
              </InputWrapper>
            </InputWrapper>
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Số nhà
                </label>
                <Input name="number" onChange={handleChange} type="text" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Tên đường
                </label>
                <Input name="street" onChange={handleChange} type="text" />
              </InputWrapper>
            </InputWrapper>

            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Phường/Xã
                </label>
                <Input name="sub_district" onChange={handleChange} type="text" />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Quận/Huyện
                </label>
                <Select onChange={handleChange} name="district">
                  <Option value=""></Option>
                  {districts.map((district, index) => (
                    <Option key={index} value={district}>
                      {district}
                    </Option>
                  ))}
                </Select>
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Thành phố/Tỉnh
                </label>
                <Select onChange={handleChange} name="city">
                  <Option value=""></Option>
                  {cities.map((city, index) => (
                    <Option key={index} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </InputWrapper>
            </InputWrapper>

            <div className="register-btn-grp">
              <button type="submit" className="btn register-btn">
                Đăng ký
              </button>
              <Link className="link" to="/">
                <button className="btn btn-back-home">Trang chủ</button>
              </Link>
            </div>
          </form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
