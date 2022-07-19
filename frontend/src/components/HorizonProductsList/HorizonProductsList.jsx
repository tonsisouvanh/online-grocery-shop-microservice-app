import { Container, Wrapper } from "../../global/GlobalStyle.styled";
import "./HorizonProductsList.css";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import Spinner from "../../components/Spinner/Spinner";
import { getProducts, reset } from '../../feature/Product/ProductSlice'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getRandomObject } from "../../utils";

const HorizonProductsList = ({ header, renderOption }) => {
  const dispatch = useDispatch();
  const { isError, isSuccess, isLoading, message, products } = useSelector(
    (state) => state.product
  );

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(reset());
  }, [dispatch]);


  useEffect(() => {
    let data = [...products];
    switch (renderOption) {
      case "newest":
        setFilteredProducts(data?.sort((a, b) => a.createdAt - b.createdAt));
        break;
      default:
        setFilteredProducts(data?.sort((a, b) => (0.5 - Math.random())));
        break;
    }
  }, [products, renderOption]);


  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <Container bgColor="#ecf0f1">
        <Wrapper mg="1rem">
          <div className="horizon-items">
            <h2 className="horizon-items-title">{header}</h2>
            <div className="horizon-items-container">
              {filteredProducts && filteredProducts.map((item, i) => (
                <Link key={item._id} className="link" to={`/product-detail/${item._id}`}>
                  <div className="horizonItem-wrapper">
                    <img
                      src={item.img}
                      alt=""
                      className="horizonItem-img"
                    ></img>
                    <div className="horizonItem-title">{item.name}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Wrapper>
      </Container>
    </>
  );
};

export default HorizonProductsList;
