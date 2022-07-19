import { Container, Wrapper } from "../../global/GlobalStyle.styled";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <Container bgColor="#ecf0f1">
        {/* <Wrapper> */}
        <footer className="footer">
          <div className="footer-content-container">
            <div className="footer-content-wrapper">
              <div className="col about-store">
                <h2>VỀ CHÚNG TÔI</h2>
                <p className="paragraph">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                  erat ut tur
                </p>
              </div>
              <div className="col about-product">
                <h2>HÀNG HÓA</h2>
                <ul>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                  <li>Cras ornare tristique elit.</li>
                  <li>Nunc dignissim risus id metus.</li>
                  <li>Vestibulum auctor dapibus neque.</li>
                  <li>Lorem ipsum dolor sit amet, consectetuer elit.</li>
                </ul>
              </div>
              <div className="col contact">
                <h2>LIÊN HỆ</h2>
                <div className="contact-row">
                  <i className="fas fa-home"></i>
                  <p>Lô A, Khu Dân Cư Cityland, 99 Nguyễn Thị Thập</p>
                </div>
                <div className="contact-row">
                  <i className="fas fa-envelope"></i>
                  <p>example@gmail.com</p>
                </div>
                <div className="contact-row">
                  <i className="fas fa-phone-alt"></i>
                  <p>028 6298 9757</p>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>All &copy; copy rights are reserved to Group-4 UDPT-CQ18 2022</p>
          </div>
        </footer>
        {/* </Wrapper> */}
      </Container>
    </>
  );
};

export default Footer;
