import Footer from "../../components/Footer/Footer";
import HorizonProductsList from "../../components/HorizonProductsList/HorizonProductsList";
import Navbar from "../../components/Navbar/Navbar";
import Slider from "../../components/Slider/Slider";

const Home = () => {
  return (
    <>
      <Navbar />
      <Slider />
      <HorizonProductsList header={"SẢN PHẨM MỚI"} renderOption="newest"/>
      <HorizonProductsList header={"SẢN PHẨM BÁN CHẠY"} />
      <HorizonProductsList header={"SẢN PHẨM GIẢM GIÁ"} />
      <Footer />
    </>
  );
};

export default Home;
