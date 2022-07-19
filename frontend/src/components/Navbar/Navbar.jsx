import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Navbar as Navbars } from "react-bootstrap";
import "./Navbar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { DropdownItem, DropdownLink, DropdownLinks, DropdownTitle } from "../../global/GlobalStyle.styled";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../../feature/User/UserSlice";
const Navbar = () => {

  const { qty, cart } = useSelector(state => state.cart)

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const { products } = useSelector(state => state.product)

  const types = products.map(product => product.type)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
    window.location.reload();
  }

  console.log(cart);

  return (
    <>
      <Navbars sticky="top" className="navbar-bg-color" expand="lg">
        <Container fluid>
          <Link to="/">
            <Navbars.Brand className="navbar-logo-container">
              <img
                className="navbar-logo"
                src={process.env.PUBLIC_URL + "/assets/images/g-logo.png"}
                alt=""
              />
            </Navbars.Brand>
          </Link>
          <Navbars.Toggle aria-controls="navbarScroll" />
          <Navbars.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 gap-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >

              <Link className="link link-hover" to="/">
                <i className="fa fa-home navbar-icon"></i>Trang chủ
              </Link>

              <Link className="link link-hover" to="/products/all">
                <i className="fas fa-utensils navbar-icon"></i>
                Tất cả sản phẩm
              </Link>

              <DropdownLinks>
                <i className="fas fa-bars navbar-icon"></i>
                <DropdownTitle>
                  Danh mục sản phẩm
                </DropdownTitle>
                <DropdownLink dflex="flex" fDirection="column" gap="0.5rem">
                  {types && types.filter((item, i, ar) => ar.indexOf(item) === i).map((item, index) => (
                    <Link key={index} className="link" to={`/products/${item}`}>
                      <DropdownItem>{item}</DropdownItem>
                    </Link>
                  ))}
                </DropdownLink>
              </DropdownLinks>

            </Nav>

            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <button className="navbar-btn-search" placeholder="Bạn tìm gì">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </Form> */}
            {!user && <>
              <button className="link-login">
                <Link className="link link-hover" to="/login">
                  Đăng nhập
                </Link>
              </button>
              <button className="link-register">
                <Link className="link link-hover" to="/register">
                  Đăng ký
                </Link>
              </button></>}

            {/* <Nav.Link> */}
            {user && <Link style={{ margin: "0 1rem" }} className="link link-hover" to="/cart">
              <i className="fa-solid fa-cart-shopping navbar-icon shopping-icon">
                <span className="badget">{qty}</span>
              </i>
              Giỏ hàng
            </Link>}
            {/* </Nav.Link> */}

            {user && (<DropdownLinks>
              <i className="fa-solid fa-user navbar-icon"></i>
              <DropdownTitle fontSize="13px">
                {user?.name}
              </DropdownTitle>
              <DropdownLink dflex="flex" fDirection="column" gap="0.5rem">
                <Link className="link" to="/orders">
                  <DropdownItem>Theo dõi đơn hàng</DropdownItem>
                </Link>
                <Link className="link" to="/#">
                  <DropdownItem>Tài khoản</DropdownItem>
                </Link>
                <Link style={{ display: 'flex', alignItems: 'center' }} className="link" to="/#">
                  <DropdownItem onClick={handleLogout}>Đăng xuất</DropdownItem>
                  <i style={{ color: 'red', marginLeft: "0.2rem" }} className="fa-solid fa-right-from-bracket navbar-icon"></i>
                </Link>
              </DropdownLink>
            </DropdownLinks>)}


            <Link style={{ marginLeft: "0.5rem", textDecoration: "underline" }} className="link link-hover" to="/merchant-register">
              Trở thành người bán?
            </Link>
          </Navbars.Collapse>
        </Container>
      </Navbars>
    </>
  );
};

export default Navbar;
