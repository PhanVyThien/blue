import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import DeleteNotificationModal from "../../../components/DeleteNotificationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Button = styled.button`
  border-radius: 12px;
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
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5035/users");
  const data = await res.json();

  const paths = data.tutorials.map((item) => {
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
  const res = await fetch("http://localhost:5035/users/" + id);
  const data = await res.json();
  return {
    props: {
      item: data,
    },
  };
};

function Form({ item }) {
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState("false");
  const [name, setName] = useState(item.name);
  const [email, setEmail] = useState(item.email);
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(item.role);
  const [avatar, setAvatar] = useState(item.avatar);
  const [detailTable, setDetailTable] = useState([]);

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      setName(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    } else if (name == "role") {
      setRole(value);
    } else if (name == "avatar") {
      setAvatar(value);
    }
  };

  const handleSubmit = async () => {
    const res = await axios.put("http://localhost:5035/users/" + item._id, {
      name: name,
      email: email,
      password: password,
      role: role,
      avatar: avatar,
    });
    console.log(res);
  };
  const handleDetail = async () => {
    const res = await axios.get(
      "http://localhost:5035/users/" + item._id + "/bills"
    );
    setDetailTable(res.data);
    console.log(res);
  };
  return (
    <div className="container-md">
      <DeleteNotificationModal
        onClose={() => setShowModal(false)}
        show={showModal}
        id={itemId}
        prefix="bill"
      >
        Hello from the modal!
      </DeleteNotificationModal>
      <h2>Thông tin tài khoản</h2>
      <form method="POST" onSubmit={handleSubmit} action="/user">
        <div className="form-group mb-2">
          <label htmlFor="name">Tên người dùng</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nhập tên người dùng"
            required
            name="name"
            value={name}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email">Email cá nhân</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Nhập email"
            required
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="password">Email cá nhân</label>
          <input
            type="text"
            className="form-control"
            id="password"
            placeholder="Nhập password"
            required
            name="password"
            value={password}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Vai trò</label>
          <select
            className="form-control"
            id="role"
            required
            name="role"
            value={role}
            onChange={handleChange()}
          >
            <option>Manager</option>
            <option>Shipper</option>
            <option>Customer</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="avatar">Ảnh đại diện</label>
          <input
            type="text"
            className="form-control"
            id="avatar"
            placeholder="Nhập tên người dùng"
            required
            name="avatar"
            value={avatar}
            onChange={handleChange()}
          />
        </div>
        <hr />
        <button type="submit" className="btn btn-primary">
          Cập nhật tài khoản
        </button>
      </form>
      <hr />
      {role == "Customer" && (
        <div>
          <Button onClick={handleDetail}>Lịch sử mua hàng</Button>
          <div class="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Ngày hóa đơn</th>
                  <th>Trị giá</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {detailTable.length > 0 ? (
                  detailTable.map((item) => (
                    <tr>
                      <td>{item.BillDate}</td>
                      <td>{item.TotalPrice}</td>
                      <td>{item.Status}</td>
                      <td>
                        <a
                          onClick={() => {
                            setShowModal(true), setItemId(item._id);
                          }}
                        >
                          <Button>
                            {" "}
                            <FontAwesomeIcon icon={faTrash} />{" "}
                          </Button>
                        </a>
                        <Link href={"/bill/" + item._id}>
                          <Button> Chi tiết </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <h4>Không có lịch sử giao dịch</h4>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {role == "Shipper" && (
        <Button onClick={handleDetail}>Lịch sử giao hàng</Button>
      )}
    </div>
  );
}
export default Form;
