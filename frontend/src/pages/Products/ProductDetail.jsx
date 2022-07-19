import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { Container, Form, InputWrapper, Option, Select, TextArea, Wrapper } from "../../global/GlobalStyle.styled";
import "./ProductDetail.css";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import React, { useEffect, useState } from "react";
import { getProduct, reset } from "../../feature/Product/ProductSlice";
import { priceFormat } from "../../utils";
import { toast } from 'react-toastify'
import Rating from '@mui/material/Rating';
import { createRating, resetRating } from "../../feature/Rating/RatingSlice";
import { addCart, removeCart } from "../../feature/Cart/CartSlice";

const ProductDetail = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, isLoading } = useSelector(state => state.product)
  const { isSuccess } = useSelector(state => state.rating)
  const { cart } = useSelector(state => state.cart)

  const [value, setValue] = useState(1);
  const [comment, setComment] = useState("");

  const { ratings } = singleProduct;


  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(reset());
    dispatch(resetRating());
    setComment("");
  }, [dispatch, id, isSuccess])

  const handleSubmitRating = (e) => {
    e.preventDefault();
    if (!comment || comment === "") {
      toast.warning("Vui nhập vào nội dung")
    }
    else {
      const ratingInput = {
        productId: singleProduct._id,
        comment,
        point: value,
        customer: {
          customerId: user._id,
          name: user.name,
        }
      }
      dispatch(createRating(ratingInput))
    }
  }

  const handleAddCart = () => {
    const { name, price, img, _id } = singleProduct;
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
    const { _id, price } = singleProduct;
    dispatch(removeCart({ _id, price }));
  }

  if (isLoading) {
    return <Spinner />
  }


  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <div className="product-detail">
            <div className="productDetail-wrapper">
              <div className="productDetail-img-wrapper">
                <img
                  className="productDetail-img"
                  src={singleProduct.img}
                  alt="No img"
                />
              </div>

              <div className="productDetail-content">
                <h3 className="productDetail-title">
                  {singleProduct.name}
                </h3>
                <p>Số lượng hàng: {singleProduct.stockNo}</p>
                <p className="productDetail-price">{priceFormat(singleProduct.price)} VNĐ</p>
                <p>Loại sản phẩm: {singleProduct.type}</p>
                <p>Mô tả: {singleProduct.desc}</p>


                {cart.some(c => c._id === singleProduct._id) ? <button onClick={() => handleRemoveCart()} className="product-removeFromCart-btn">XÓA kHỎI GIỎ HÀNG</button> : <button onClick={handleAddCart} className="productDetail-addToCart-btn">
                  CHỌN MUA
                </button>}
              </div>
            </div>

            <div className="container comment-wrapper">
              <p className="fs-5 fw-bold text-secondary mb-2">
                Đánh giá sản phẩm
              </p>
              <Form onSubmit={handleSubmitRating} className="container">
                <InputWrapper aItems="center" gap="2rem">
                  <img style={{ width: "80px" }} src={process.env.PUBLIC_URL + "/assets/images/feedback.png"} alt="" />
                  <Rating
                    name="simple-controlled"
                    value={value}
                    size="large"
                    onChange={(event, newValue) => {
                      setValue(newValue);
                    }}
                  />
                </InputWrapper>
                <InputWrapper>
                  <TextArea onChange={e => setComment(e.target.value)} value={comment} placeholder="Nội dung..." cols="50" rows="5"></TextArea>
                  <button className="btn">Đánh giá</button>
                </InputWrapper>
              </Form>
            </div>
            <div className="container comment-wrapper">
              {ratings && ratings.map((rating) => (
                <div key={rating._id} className="container d-flex border py-3 my-2">
                  <div className="container comment-user-img-wrapper">
                    <img
                      className="comment-user-img"
                      src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                      alt=""
                    />
                  </div>
                  <div className="container">
                    <p className="fs-6 mb-3">{rating.customer.name}</p>
                    {/* <p className="fs-6 mb-3">5 star</p> */}
                    <Rating
                      name="simple-controlled"
                      value={rating.point}
                      size="large"
                      readOnly={true}
                    />
                    <p className="fs-6 mb-3">
                      {rating.createdAt} | Phân loại hàng: {singleProduct.type}
                    </p>
                    <p className="fs-6 mb-3">
                      {rating.comment}
                    </p>
                    <div className="container d-flex">
                      <img
                        className="comment-review-img"
                        src=""
                        alt="No img"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Wrapper>
      </Container>

      <Footer />
    </>
  );
};

export default ProductDetail;
