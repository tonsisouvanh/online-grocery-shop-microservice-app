import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import {
  Container,
  Input,
  InputWrapper,
  Option,
  Select,
  Wrapper,
} from "../../../global/GlobalStyle.styled";
import "./MerchantRegister.css";
import { cities, districts } from "../../../data/addresses";
import { toast } from "react-toastify";
import { reset, register } from "../../../feature/Merchant/MerchantSlice";
import Spinner from "../../../components/Spinner/Spinner";

const MerchantRegister = () => {
  const [merchantData, setMerchantData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    // productType: [],
    logo: "",
    open_date: "",
    // business_doc: [],

    businessdoc_one: "",
    businessdoc_two: "",

    number: "",
    street: "",
    sub_district: "",
    district: "",
    city: "",
  });

  const { name, email, username, password, phone, open_date, businessdoc_one, businessdoc_two,
    number,
    street,
    sub_district,
    district,
    city } = merchantData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const user = JSON.parse(localStorage.getItem("user"));
  const { isError, isSuccess, isLoading, message, merchant } = useSelector(
    (state) => state.merchant
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || merchant) {
      toast.success("Đăng ký thành công!");
      // navigate("admin url"), target to a page that show admin url
    }

    dispatch(reset());
  }, [merchant, isError, isSuccess, message, navigate, dispatch]);

  const handleChange = (e) => {
    setMerchantData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const business_doc = [businessdoc_one, businessdoc_two];
    const address = {
      number,
      street,
      sub_district,
      district,
      city
    }
    const merchantInput = {
      name,
      email,
      username,
      password,
      phone,
      business_doc,
      address,
      open_date
    }

    if (!name || !email || !password || !phone) {
      toast.warning("Vùi lòng điền thông tin cần thiết");
    } else {
      dispatch(register(merchantInput));
      setMerchantData({})
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
          <h3 className="register-header">ĐĂNG KÝ TRỞ THÀNH NGƯỜI BÁN</h3>
          <form
            onSubmit={handleSubmit}
            className="register-form-container"
            action=""
          >
            {/* <h2>Thông tin người dùng</h2> */}
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Tên cửa hàng
                </label>
                <Input name="name" onChange={handleChange} type="text" />
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
                  Tên đăng nhập
                </label>
                <Input name="username" onChange={handleChange} type="text" />
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
            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Logo
                </label>
                <Input
                  name="logo"
                  placeholder="https://<đường link hình>"
                  onChange={handleChange}
                  type="text"
                />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Ngày mở cửa
                </label>
                <Input name="open_date" onChange={handleChange} type="date" />
              </InputWrapper>
            </InputWrapper>

            <InputWrapper gap="1rem">
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Giấy phép kinh doanh
                </label>
                <Input
                  name="businessdoc_one"
                  placeholder="https://<đường link hình>"
                  onChange={handleChange}
                  type="text"
                />
              </InputWrapper>
              <InputWrapper fDirection="column">
                <label className="register-label" htmlFor="">
                  Chứng nhận an toàn thực phẩm
                </label>
                <Input
                  name="businessdoc_two"
                  placeholder="https://<đường link hình>"
                  onChange={handleChange}
                  type="text"
                />
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

export default MerchantRegister;
