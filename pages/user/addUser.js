import React from "react";
import axios from "axios";
import { useState } from "react";
function Form() {
  const [formStatus, setFormStatus] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");

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
    }
  };

  const handleSubmit = () => {
    axios
      .post(
        "http://localhost:5035/users/register",
        { name, email, password, role },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="container-md">
      <h2>Thêm mới tài khoản</h2>
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
          <label htmlFor="password">Mật khẩu tài khoản</label>
          <input
            type="Password"
            className="form-control"
            id="password"
            placeholder="Vui lòng nhập mật khẩu"
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

        <hr />

        <button type="submit" className="btn btn-primary">
          Tạo tài khoản
        </button>
      </form>
    </div>
  );
}
export default Form;
