import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Wrapper } from "../../global/GlobalStyle.styled";
import { useDispatch, useSelector } from "react-redux";
import "./Products.css";
import { getProducts, reset } from "../../feature/Product/ProductSlice";
import Spinner from "../Spinner/Spinner";
import { priceFormat } from "../../utils";
import Product from "./Product";


const Products = ({ sortOption, keyword }) => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);
  const [filteredProducts, setFilteredProducts] = useState();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(reset());
  }, [isLoading, dispatch]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        if (keyword === "") {
          return product;
        } else {
          return product.name.toLowerCase().includes(keyword.toLowerCase());
        }
      })
    );
  }, [keyword, products]);

  useEffect(() => {
    let data = [...products];
    if (type !== "all") {
      type.replace("%20", " ");
      setFilteredProducts(products.filter((product) => (product.type === type)))
    }
    else {
      switch (sortOption) {
        case "asc":
          setFilteredProducts(data?.sort((a, b) => (a.price > b.price ? 1 : -1)));
          break;
        case "desc":
          setFilteredProducts(data?.sort((a, b) => (a.price > b.price ? -1 : 1)));
          break;
        case "az":
          setFilteredProducts(data?.sort((a, b) => a.name.localeCompare(b.name)));
          break;
        case "za":
          setFilteredProducts(data?.sort((a, b) => b.name.localeCompare(a.name)));
          break;
        case "newest":
          setFilteredProducts(data?.sort((a, b) => a.createdAt - b.createdAt));
          break;
        default:
          setFilteredProducts(data?.sort((a, b) => (0.5 - Math.random())));
          break;
      }
    }

  }, [sortOption, products, type]);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  console.log(filteredProducts)

  return (
    <>
      <Container bgColor="#ecf0f1">
        <Wrapper mg="1rem">
          <div className="products">
            <div className="product-list">

              {filteredProducts && filteredProducts.map((product) => (
                <Product key={product._id} product={product} />
              ))}


             
            </div>
          </div>
        </Wrapper>
      </Container>
    </>
  );
};

export default Products;
