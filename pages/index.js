import React, { useEffect, useState } from "react";
import styled from "styled-components";

import HeaderTop from "./header";
import cookieCutter from "cookie-cutter";
import SideBar from "../components/SideBar";
import { useRouter } from "next/router";

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
const LoginBtn = styled.input`
  padding: 13px 20px 12px;
  background-color: lightblue;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #000;
  margin-bottom: 24px;
  :hover {
    border: 1px solid #000;
    background-color: transparent;
    color: #000;
  }
`;
const LoginForm = styled.form`
  max-width: 326px;
`;

function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  };
  useEffect(() => {
    const Acc = cookieCutter.get("Acc");
    if (Acc) {
      const fetchUser = async () => {
        const res31 = await fetch("http://localhost:5035/users/" + Acc);
        const data = await res31.json();
        setUser(data);
      };
      fetchUser();
    }
  }, []);
  const handleLogin = () => {};
  return (
    <div>
      <SideBar></SideBar>
      <ContentContainer>
        <Content>
          <HeaderTop />
          <h4>Sign into your account</h4>
          <LoginForm action="#!">
            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Email address"
                onChange={handleChange()}
              />
            </div>
            <div className="form-group mb-4">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                placeholder="***********"
                onChange={handleChange()}
              />
            </div>
            <LoginBtn
              name="login"
              id="login"
              className="btn btn-block mb-4"
              type="button"
              value="Login"
            />
          </LoginForm>
          <a href="#!">Forgot password?</a>
        </Content>
      </ContentContainer>
    </div>
  );
}

export default Home;
