import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from '../../global/GlobalStyle.styled'
import './Orders.css'


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { priceFormat } from '../../utils';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      const fetchData = () => {
        axios
          .get("http://localhost:8000/order-gate/api/orders/customer-orders", {
            params: { customerId: user._id },
          })
          .then((res) => {
            setOrders(res.data);
          });
      };

      fetchData();
    }
  }, []);


  return (
    <>
      <Navbar />
      <Container>
        <Wrapper
          bShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
          mg="2rem"
          gap="1.5rem"
          fDirection="column"
          pd="2rem"
          bgColor="white"
          bRadius="10px"
          mWidth="800px"
          color="#041656"
        >


          <h3 className="vaccHistory-header">THEO DÕI ĐƠN HÀNG</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Sản phẩm</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Địa chỉ nhận hàng
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Tổng tiền
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Trạng thái
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <ul className="history-vaccine-list">
                          {row.products &&
                            row.products.map((item) => (
                              <li key={item._id} className="history-list-item">
                                {item.name}
                              </li>
                            ))}
                        </ul>
                      </TableCell>
                      <TableCell align="right">
                        {user.address.number}, {user.address.street}, {user.address.sub_district},
                        {user.address.district}, {user.address.city}
                      </TableCell>
                      <TableCell sx={{ minWidth: 100 }} align="right">
                        {/* {dateFormat(row.vaccination_date)} */}
                        {priceFormat(row.total)} VNĐ
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: 100,
                          color: row.status === "pending" ? "gray" : "green",
                        }}
                        align="right"
                      >
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Wrapper>
      </Container>
      <Footer />
    </>
  )
}

export default Orders