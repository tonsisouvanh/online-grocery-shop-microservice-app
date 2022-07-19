import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addCart, removeCart } from '../../feature/Cart/CartSlice'
import { priceFormat } from '../../utils'
import './Products.css'

const Product = ({ product }) => {
  const { cart } = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleAddCart = () => {
    const { name, price, img, _id } = product;
    const productInput = {
      name,
      price,
      qty: 1,
      img,
      _id
    }

    dispatch(addCart(productInput));
  }

  const handleRemoveCart = () => {
    const { _id, price } = product;
    dispatch(removeCart({ _id, price }));
  }

  return (
    <div key={product._id} className="product-wrapper">
      <img
        src={product.img}
        alt=""
        className="product-img"
      ></img>
      <p className="product-title">
        {product.name}
      </p>
      <div className="product-price">{priceFormat(product.price)} VNĐ</div>
      <Link to={`/product-detail/${product._id}`}>Xem san pham</Link>
      {cart.some(c => c._id === product._id) ? <button onClick={() => handleRemoveCart()} className="product-removeFromCart-btn">XÓA kHỎI GIỎ HÀNG</button> : <button onClick={() => handleAddCart()} className="product-addToCart-btn">CHỌN MUA</button>}
    </div>
  )
}

export default Product