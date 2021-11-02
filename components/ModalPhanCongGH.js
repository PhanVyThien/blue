import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";

const Modal = ({ show, onClose, children, title, item }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [shippers, setShippers] = useState([]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };

  const getShippers = () => {
    axios
      .get("http://localhost:5035/users/shippers", {
        params: { area: item.Area },
      })
      .then((res) => {
        setShippers(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setBillForShipper = (shipper) => {
    axios
      .put("http://localhost:5035/bills/" + item._id, {
        idShipper: shipper._id,
        shipperName: shipper.name,
        Status: "Đang giao hàng",
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>
          <h2>
            Phân công hóa đơn id = {item._id} tại khu vực: {item.Province}
          </h2>
          <button onClick={getShippers}>Phân công</button>
          <div class="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Khu vực đăng kí</th>
                  <th>Số lượng đơn đang giao</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {shippers.map((shipper) => (
                  <tr>
                    <td>{shipper.name}</td>
                    <td>{shipper.shipperArea}</td>
                    <td>{shipper.currentBillQuantity}</td>
                    <td>
                      <a href="/bill">
                        <button onClick={() => setBillForShipper(shipper)}>
                          Phân công
                        </button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;
