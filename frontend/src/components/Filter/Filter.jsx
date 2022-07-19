import {
  Container,
  Option,
  Select,
  Wrapper,
} from "../../global/GlobalStyle.styled";
import "./Filter.css";

const Filter = ({ setSortOption, setKeyword }) => {
  return (
    <>
      <Container bgColor="#ecf0f1">
        <Wrapper
          gap="1rem"
          bgColor="white"
          dflex="flex"
          alItems="center"
          jContent="space-between"
          pd="1rem"
          width="100%"
          bRadius="0.5rem"
          mg="1rem 1rem 0 1rem"
        >
          <h3 style={{ color: "var(--green)" }}>SẢN PHẨM</h3>
          <Wrapper dflex="flex" gap="1rem" jContent="flex-end">
            <div className="sort-bar-wrapper">
              <input
                className="search-input"
                placeholder="Nhập vào tên sản phẩm"
                type="text"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <span className="search-icon-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
            <Select
              onChange={(e) => setSortOption(e.target.value)}
              maxWidth="10rem"
              bRadius="0"
              bgColor="white"
              filter="true"
            >
              <Option value="all">Tất cả</Option>
              <Option value="newest">Mới</Option>
              <Option value="asc">Giá tăng dần</Option>
              <Option value="desc">Giá Giảm dần</Option>
              <Option value="az">A-Z</Option>
              <Option value="za">Z-A</Option>
              <Option value="mostsell">Mua nhiều nhất</Option>
            </Select>
          </Wrapper>
        </Wrapper>
      </Container>
    </>
  );
};

export default Filter;
