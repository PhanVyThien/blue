import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import SideBar from "../../../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFax,
  faPhone,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DeleteNotificationModal from "../../../components/DeleteNotificationModal";
import ModalPhanCongGH from "../../../components/ModalPhanCongGH";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5035/bills");
  const data = await res.json();

  const paths = data.map((item) => {
    return {
      params: {
        id: item._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:5035/bills/" + id);
  const data = await res.json();

  return {
    props: {
      item: data,
    },
  };
};

const ContentContainer = styled.div`
  padding-left: 250px;
`;
const Content = styled.div`
  margin: 20px;
  background-color: white;
  height: auto;
  width: auto;
  padding: 12px;
  border-radius: 12px;
  justify-content: center;
`;
const Button = styled.button`
  border-radius: 8px;
  background-color: lightskyblue;
  color: black;
  padding: 12px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  border: none;
  margin: 4px;
  transition: transform 0.2s ease;
  &:hover {
    background-color: #e38b06;
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
`;

const Item = styled.div`
  padding-left: 16px;
  width: auto;
  flex-wrap: nowrap;
`;

const Home = ({ item }) => {
  const [showPhanCongModal, setShowPhanCongModal] = useState(false);
  const [relativeTable, setRelativeTable] = useState([]);
  const productId = item.Products.map((a) => a._id);
  const getRelativeData = () => {
    axios
      .get("http://localhost:5035/courses")
      .then(function (response) {
        console.log(response);
        let getAll = response.data;
        let res = getAll.filter((it) => productId.includes(it._id));
        setRelativeTable(res);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <div>
      <ModalPhanCongGH
        onClose={() => setShowPhanCongModal(false)}
        show={showPhanCongModal}
        item={item}
      >
        Phan Cong Modal
      </ModalPhanCongGH>
      <SideBar></SideBar>
      <ContentContainer>
        <Content>
          <div>
            <h3>C??c s???n ph???m c???n ki???m tra</h3>
            <Button onClick={getRelativeData}>Nh???ng s???n ph???m li??n quan</Button>
            {relativeTable.map((relativeItem) => (
              <h4>{relativeItem.Name}</h4>
            ))}
            <div className="row">
              <div className="col">
                <h5>S???n ph???m ph??t tri???n b???i BUG</h5>
              </div>
              <div className="col">
                <h5>M???i th???c m???c xin li??n h???</h5>
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{ marginRight: "12px" }}
                />
                <FontAwesomeIcon icon={faFax} style={{ marginRight: "12px" }} />
              </div>
            </div>
          </div>
        </Content>
      </ContentContainer>
    </div>
  );
};
export default Home;
