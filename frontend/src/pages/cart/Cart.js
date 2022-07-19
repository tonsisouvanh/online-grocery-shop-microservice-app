import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import { addCartWithQty, removeCart, reset } from '../../feature/Cart/CartSlice'
import { Option, Select } from '../../global/GlobalStyle.styled'
import { priceFormat } from '../../utils'
import './Cart.css'

const Cart = () => {

  const dispatch = useDispatch();

  const [productQty, setproductQty] = useState(0);

  const { cart, total, qty } = useSelector(state => state.cart);

  const handleRemoveCart = (product) => {

    const { price, _id } = product;

    dispatch(removeCart({ _id, price, productQty }));
  }


  const handleAddCartWithQty = (product) => {
    const { price, _id } = product;

    dispatch(addCartWithQty({ price, _id, productQty }))
    setproductQty(0)
  }

  const handleClearCart = () => {
    dispatch(reset());
  }

  return (
    <>
      <Navbar />
      <div className="cart">

        <h3 className="cart-header-text">Giở hàng của bạn</h3>

        <div className="cart-items-info">
          {cart.length > 0 ? cart.map((item) =>
          (
            <div className="cart-item-wrapper">

              <div className="cart-col-left">
                <img className="cart-item-img" src={item.img} alt="" />
                <div className="cart-item-detail">
                  <p className="cart-item-title">{item.name}</p>
                  <div className="cart-item-action">
                    <div className="cart-item-addQty">
                      <Select
                        onChange={(e) => setproductQty(e.target.value)}
                        pd="unset"
                      >
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={4}>4</Option>
                        <Option value={6}>6</Option>
                        <Option value={8}>8</Option>
                        <Option value={10}>10</Option>
                        <Option value={12}>12</Option>
                        <Option value={14}>14</Option>
                      </Select>
                    </div>
                    <button onClick={() => handleAddCartWithQty(item)}>Thêm</button>
                    <button onClick={() => handleRemoveCart(item)}>Xóa</button>
                  </div>
                </div>
              </div>

              <div className="cart-col-right">
                <p className="cart-item-price">{priceFormat(item.price)} VNĐ</p>
              </div>

            </div>
          )) : <h3 style={{ fontWeight: '200' }}>Không có sản phẩm trong giỏ hàng</h3>}

        </div>

        <div className="cart-summary">
          <div className="cart-summary-price">
            <p>Tiền hàng:<span className="cart-total">{priceFormat(total)} VNĐ</span></p>
            <p>Phí giao hàng: <span>Miễn phí</span> </p>
          </div>
          {/* <button className="btn cart-checkout-btn"> */}
          {/* <Link to="/checkout" style={{ textDecoration: "none", color: "white" }}> */}
          {cart.length > 0 ? (<button style={{ backgroundColor: "transparent", border: "none", color: "white" }} className="btn cart-checkout-btn">
            <Link to="/checkout" style={{ textDecoration: "none", color: "white" }}>

              ĐẶT HÀNG
            </Link>

          </button>) : (<button disabled style={{ backgroundColor: "transparent", border: "none", color: "white", opacity: "50%" }} className="btn cart-checkout-btn">
            <Link to="/checkout" style={{ textDecoration: "none", color: "white" }}>

              ĐẶT HÀNG
            </Link>

          </button>)}
          {/* </Link> */}
          {/* </button> */}
          <button onClick={handleClearCart} className="btn bg-danger cart-deleteCart-btn">
            XÓA GIỎ HÀNG
          </button>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Cart