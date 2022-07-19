import { Container, Wrapper } from "../../global/GlobalStyle.styled";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Text = styled.h1`
  width: 100%;
  text-align: center;
`;
const Icon = styled.i`
  color: green;
  font-size: 12rem;
  text-align: center;
`;

const Button = styled.button`
  padding: 1rem 0;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Success = ({ text }) => {
  // const { isSuccess, isLoading, isError, registration } = useSelector(
  //   (state) => state.registration
  // );

  // const navigate = useNavigate();

  // useEffect(() => {}, []);

  return (
    <>
      {/* <Navbar /> */}
      <Container>
        <Wrapper
          bShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          mg="2rem"
          gap="1.5rem"
          dflex="flex"
          fDirection="column"
          pd="2rem"
          bgColor="white"
          bRadius="10px"
          mWidth="800px"
          color="#041656"
        >
          <Text>{text ? text : "ĐẶT HÀNG THÀNH CÔNG"}</Text>
          <Icon className="fa-solid fa-circle-check"></Icon>
          <ButtonGroup>
            {/* <a href="https://www.google.com/" rel="noreferrer" target="_blank">
              <Button className="btn">Đăng nhập</Button>
            </a> */}
            <Link to="/orders">
              <Button className="btn">Kiểm tra đơn hàng</Button>
            </Link>
            <Link to="/">
              <Button className="btn">Trang chủ</Button>
            </Link>
          </ButtonGroup>
        </Wrapper>
      </Container>
      <Footer />
    </>
  );
};

export default Success;
