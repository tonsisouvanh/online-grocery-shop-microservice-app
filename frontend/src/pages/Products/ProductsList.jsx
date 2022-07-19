import "./ProductsList.css";
import Products from "../../components/Products/Products";
import { Container, Wrapper } from "../../global/GlobalStyle.styled";
import Filter from "../../components/Filter/Filter";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";

const ProductsList = () => {
  const [sortOption, setSortOption] = useState("");
  const [keyword, setKeyword] = useState("");
  return (
    <>
      <Navbar />
      <Filter
        setSortOption={setSortOption}
        setKeyword={setKeyword} />
      <Products keyword={keyword} sortOption={sortOption} setSortOption={setSortOption} />
      <Footer />
    </>
  );
};

export default ProductsList;
