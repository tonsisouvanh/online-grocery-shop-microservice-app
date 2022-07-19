import "./Slider.css";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";
import { Container, Wrapper } from "../../global/GlobalStyle.styled";

const Slider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <Container bgColor="#ecf0f1">
        <Wrapper mg="1rem" width="100%">
          <Carousel
            className="slider-container"
            activeIndex={index}
            onSelect={handleSelect}
          >
            <Carousel.Item className="carousel-item-container">
              <img
                className="d-block w-100 slide-img"
                src="https://cdn.tgdd.vn/Files/2022/03/14/1420201/tu-ngay-15-3-20-3-2022-giam-gia-den-50-khi-mua-hang-online-tai-bach-hoa-xanh-202203141116562044.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 slide-img"
                src="http://cdn.tgdd.vn/Files/2019/05/21/1168179/avata_760x367-600x400.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 slide-img"
                src="http://cdn.tgdd.vn/Files/2020/05/30/1259392/bach-hoa-xanh-online-sap-co-mat-tai-binh-duong-dat-mua-online-giam-den-50-202005300956393269.png"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Wrapper>
      </Container>
    </>
  );
};

export default Slider;
